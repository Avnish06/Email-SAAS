import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { openRazorpay } from "../utils/useRazorpay";
import { useDetails } from "../Context/userContext";
import { AppUrl } from "../App";
import { Zap, CheckCircle2, Loader2, Crown, Rocket, Gift } from "lucide-react";

/* Plan icon mapping */
const planIcons = {
  "Free Trial": Gift,
  Starter: Rocket,
  Pro: Crown,
};

/* Plan accent colors */
const planColors = {
  "Free Trial": "from-emerald-400 to-teal-500",
  Starter: "from-blue-400 to-indigo-500",
  Pro: "from-amber-400 to-orange-500",
};

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingPlanId, setPayingPlanId] = useState(null);
  const { user } = useDetails();
  const navigate = useNavigate();

  /* Fetch plans from backend */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(`${AppUrl}/plans/all`);
        if (data.success) setPlans(data.plans);
      } catch (err) {
        toast.error("Failed to load plans. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  /* Handle plan selection */
  const handleSelectPlan = async (plan) => {
    /* Not logged in → redirect to login */
    if (!user) {
      toast.info("Please log in to subscribe to a plan.");
      navigate("/login");
      return;
    }

    /* Free Trial */
    if (plan.Cost === 0) {
      localStorage.setItem("trialStartDate", new Date().toISOString());
      toast.success("Free trial started! Let's create your first campaign.");
      navigate("/campaign/new");
      return;
    }

    /* Paid plan → create order on backend → open Razorpay */
    try {
      setPayingPlanId(plan._id);

      const { data } = await axios.post(
        `${AppUrl}/orders/create`,
        { planId: plan._id },
        { withCredentials: true }
      );

      if (!data.success) {
        toast.error(data.message || "Could not create order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,         // in paise
        currency: data.order.currency,
        name: "EmailMarketingPro",
        description: plan.planName + " Plan",
        order_id: data.order.id,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#0f9d8e" },
      };

      /* Open Razorpay checkout modal */
      const paymentResponse = await openRazorpay(options);

      /* Verify payment on backend */
      const verifyRes = await axios.post(
        `${AppUrl}/orders/verify`,
        {
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpaySignature: paymentResponse.razorpay_signature,
          planId: plan._id,
        },
        { withCredentials: true }
      );

      if (verifyRes.data.success) {
        toast.success("🎉 Payment successful! Your plan is now active.");
        navigate("/payment-success", {
          state: {
            planName: plan.planName,
            amount: plan.Cost,
            currency: plan.currency,
          },
        });
      } else {
        toast.error("Payment verification failed. Contact support.");
      }
    } catch (err) {
      if (err?.message === "Payment cancelled by user.") {
        toast.info("Payment cancelled.");
      } else {
        console.error(err);
        toast.error(err?.message || "Something went wrong with the payment.");
      }
    } finally {
      setPayingPlanId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6">
      {/* Header */}
      <div className="max-w-[700px] mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Pricing
        </span>
        <h1 className="text-[48px] md:text-[56px] font-bold leading-tight tracking-tight mb-5">
          Simple,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            transparent
          </span>{" "}
          pricing
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Lock in founding member rates during early access. No hidden fees,
          cancel anytime.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = planIcons[plan.planName] || Rocket;
          const gradient = planColors[plan.planName] || "from-primary to-accent";
          const isPopular = plan.isPopular;
          const isFree = plan.Cost === 0;
          const isPaying = payingPlanId === plan._id;

          return (
            <div
              key={plan._id}
              className={`relative flex flex-col rounded-[28px] border p-8 transition-all duration-300 ${
                isPopular
                  ? "border-primary shadow-[0_0_60px_rgba(15,157,142,0.2)] bg-card scale-[1.02]"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-[0_0_30px_rgba(15,157,142,0.08)]"
              }`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[11px] font-black uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  <Zap size={11} fill="currentColor" />
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
              >
                <Icon size={26} className="text-white" />
              </div>

              {/* Plan name & description */}
              <h2 className="text-2xl font-bold mb-1 text-foreground">
                {plan.planName}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {plan.planDescription}
              </p>

              {/* Price */}
              <div className="mb-8">
                {isFree ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-foreground">Free</span>
                    <span className="text-muted-foreground text-sm">/ {plan.duration}</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-foreground">
                      ₹{plan.Cost.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-sm">/ {plan.duration}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-foreground/80 leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isPaying}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  isPaying
                    ? "opacity-60 cursor-not-allowed"
                    : isPopular
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:opacity-90 active:scale-95"
                    : isFree
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95"
                    : "bg-foreground text-background hover:opacity-80 active:scale-95"
                }`}
              >
                {isPaying ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing…
                  </>
                ) : isFree ? (
                  "Start Free Trial"
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust badges */}
      <div className="max-w-[700px] mx-auto mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" />
          Secured by Razorpay
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" />
          Cancel anytime
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" />
          No hidden charges
        </div>
      </div>
    </div>
  );
};

export default Pricing;
