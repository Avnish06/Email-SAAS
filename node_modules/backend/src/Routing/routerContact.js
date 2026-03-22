import { contactDetails } from "../controllers/contact.js";
import { accessController } from "../middleware/accessController.js";
import express from "express";
import { sendContactdetails } from "../controllers/contact.js";

export const contactRouter = express.Router();

contactRouter.post("/contactdetails", accessController, contactDetails);
contactRouter.get("/fetchcontactdetails", accessController, sendContactdetails);



