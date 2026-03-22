import { sendEmailto } from "../controllers/emailControllers.js";
import express from "express";
import { upload } from "../middleware/multer.middleware.js";

export const sendEmailroute =  express.Router()
sendEmailroute.post("/sendemail", sendEmailto);