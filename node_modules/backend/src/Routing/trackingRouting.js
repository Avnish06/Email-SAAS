import express from "express";
import { trackOpen, trackClick } from "../controllers/trackingController.js";

const router = express.Router();

// These endpoints are unauthenticated (called from emails)
router.get("/open/:campaignId/:email", trackOpen);
router.get("/click/:campaignId/:email", trackClick);

export default router;
