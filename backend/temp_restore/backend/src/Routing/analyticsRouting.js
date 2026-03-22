import express from "express";
import { getAnalyticsOverview } from "../controllers/analyticsController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/overview", isAuth, getAnalyticsOverview);

export default router;
