import { sendEmailto } from "../controllers/emailControllers.js";
import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { accessController } from "../middleware/accessController.js";

export const sendEmailroute = express.Router();
sendEmailroute.post("/sendemail", accessController, sendEmailto);
