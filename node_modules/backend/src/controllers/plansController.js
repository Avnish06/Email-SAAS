import { Plan } from "../Models/plans.model.js";

/* ─── Seed Data (matches frontend hardcoded plans) ─── */
const seedPlans = [
    {
        planName: "Free Trial",
        planDescription: "Try the full platform free for 3 days — no credit card required.",
        Cost: 0,
        currency: "INR",
        duration: "3 days",
        isPopular: false,
        features: [
            "3-day full access trial",
            "Create up to 5 campaigns",
            "Import up to 100 contacts",
            "Basic AI template generation",
            "Standard support",
            "No credit card required"
        ]
    },
    {
        planName: "Starter",
        planDescription: "Perfect for small businesses or solo creators getting started with email marketing.",
        Cost: 499,
        currency: "INR",
        duration: "month",
        isPopular: false,
        features: [
            "Up to 5,000 emails/month",
            "All email templates",
            "Priority support",
            "Advanced analytics",
            "Unlimited contacts"
        ]
    },
    {
        planName: "Pro",
        planDescription: "For power users who need the best tools, AI features, and no limits.",
        Cost: 1499,
        currency: "INR",
        duration: "month",
        isPopular: true,
        features: [
            "Unlimited emails",
            "AI template generation",
            "Dedicated support",
            "Custom domains",
            "White-label branding",
            "Priority onboarding"
        ]
    }
];

/* ─── GET ALL PLANS ─── */
export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ Cost: 1 });
        return res.status(200).json({ success: true, plans });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* ─── GET ALL PLANS (Admin – includes inactive) ─── */
export const getAllPlansAdmin = async (req, res) => {
    try {
        const plans = await Plan.find().sort({ Cost: 1 });
        return res.status(200).json({ success: true, plans });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* ─── CREATE PLAN ─── */
export const createPlan = async (req, res) => {
    try {
        const { planName, planDescription, Cost, currency, duration, features, isPopular } = req.body;

        if (!planName || Cost === undefined || !duration) {
            return res.status(400).json({ success: false, message: "planName, Cost and duration are required." });
        }

        const plan = await Plan.create({
            planName,
            planDescription: planDescription || "",
            Cost,
            currency: currency || "INR",
            duration,
            features: features || [],
            isPopular: isPopular || false
        });

        return res.status(201).json({ success: true, message: "Plan created successfully", plan });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* ─── UPDATE PLAN ─── */
export const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const plan = await Plan.findByIdAndUpdate(id, updates, { new: true });

        if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

        return res.status(200).json({ success: true, message: "Plan updated", plan });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* ─── DELETE PLAN ─── */
export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await Plan.findByIdAndDelete(id);
        if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

        return res.status(200).json({ success: true, message: "Plan deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* ─── SEED PLANS (Admin – run once to populate DB from hardcoded data) ─── */
export const seedDefaultPlans = async (req, res) => {
    try {
        const existingCount = await Plan.countDocuments();
        if (existingCount > 0) {
            return res.status(200).json({ success: true, message: "Plans already seeded", count: existingCount });
        }

        const inserted = await Plan.insertMany(seedPlans);
        return res.status(201).json({ success: true, message: `Seeded ${inserted.length} default plans`, plans: inserted });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};