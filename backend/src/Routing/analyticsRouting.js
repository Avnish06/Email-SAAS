import express from "express";
import { getAnalyticsOverview } from "../controllers/analyticsController.js";
import { accessController } from "../middleware/accessController.js";

const router = express.Router();

router.get("/overview", accessController, getAnalyticsOverview);

export default router;
