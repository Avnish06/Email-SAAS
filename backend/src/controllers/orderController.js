import Razorpay from "razorpay";
import crypto from "crypto";
import { Plan } from "../Models/plans.model.js";
import { Payment } from "../Models/payment.model.js";
import { User } from "../Models/User.model.js";

/* ── Razorpay instance (created fresh each time so env changes are picked up) ── */
function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
}

/* ─────────────────────────────────────────────────────────────
   CREATE ORDER
   POST /api/v1/orders/create
   Body: { planId }
   Returns: { order, key }
───────────────────────────────────────────────────────────── */
export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userId;

    if (!planId) {
      return res.status(400).json({ success: false, message: "planId is required." });
    }

    /* Fetch plan from DB */
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found." });
    }

    /* Free trial — no payment needed */
    if (plan.Cost === 0) {
      return res.status(200).json({
        success: true,
        freeTrial: true,
        message: "Free trial activated. No payment required.",
      });
    }

    /* Amount in paise */
    const amountInPaise = plan.Cost * 100;

    /* Create Razorpay order */
    // receipt must be ≤ 40 chars (Razorpay limit)
    const shortUserId = userId.toString().slice(-6);
    const shortTs = Date.now().toString().slice(-8);
    const receipt = `rcpt_${shortUserId}_${shortTs}`; // e.g. "rcpt_a1b2c3_12345678" = 21 chars

    const razorpayOrder = await getRazorpay().orders.create({
      amount: amountInPaise,
      currency: plan.currency || "INR",
      receipt,
      notes: {
        planId: planId.toString(),
        userId: userId.toString(),
        planName: plan.planName,
      },
    });

    /* Save pending payment record */
    const payment = await Payment.create({
      userId,
      planId,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: plan.currency || "INR",
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      paymentRecord: payment._id,
      plan: {
        name: plan.planName,
        description: plan.planDescription,
        amount: plan.Cost,
        currency: plan.currency,
        duration: plan.duration,
      },
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ─────────────────────────────────────────────────────────────
   VERIFY PAYMENT
   POST /api/v1/orders/verify
   Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature, planId }
───────────────────────────────────────────────────────────── */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planId } = req.body;
    const userId = req.userId;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ success: false, message: "Missing payment details." });
    }

    /* Verify HMAC-SHA256 signature */
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      /* Mark payment as failed */
      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        { status: "failed", razorpayPaymentId, razorpaySignature }
      );
      return res.status(400).json({ success: false, message: "Payment verification failed. Invalid signature." });
    }

    /* Mark payment as paid */
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: "paid",
        razorpayPaymentId,
        razorpaySignature,
      },
      { new: true }
    );

    /* Associate plan to user */
    await User.findByIdAndUpdate(userId, { plan: planId });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully! Your plan has been activated.",
      payment,
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ─────────────────────────────────────────────────────────────
   GET MY ORDERS
   GET /api/v1/orders/my
   Returns all payment records for the logged-in user
───────────────────────────────────────────────────────────── */
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Payment.find({ userId })
      .populate("planId", "planName Cost currency duration")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
