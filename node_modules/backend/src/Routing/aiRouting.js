import express from "express";
import { generateAITemplate } from "../controllers/ai.controller.js";
import { accessController } from "../middleware/accessController.js";

const aiRouter = express.Router();

aiRouter.post("/generate", accessController, generateAITemplate);

export { aiRouter };
