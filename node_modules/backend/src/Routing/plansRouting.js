import express from "express";
import {
    getAllPlans,
    getAllPlansAdmin,
    createPlan,
    updatePlan,
    deletePlan,
    seedDefaultPlans
} from "../controllers/plansController.js";
import { accessController } from "../middleware/accessController.js";

export const plansRouter = express.Router();

// Public route – used by frontend pricing page
plansRouter.get("/all", getAllPlans);

// Admin-only routes
plansRouter.get("/admin/all", getAllPlansAdmin);

plansRouter.post("/admin/seed", accessController, seedDefaultPlans);
plansRouter.post("/admin/create", accessController, createPlan);
plansRouter.put("/admin/update/:id", accessController, updatePlan);
plansRouter.delete("/admin/delete/:id", accessController, deletePlan);
