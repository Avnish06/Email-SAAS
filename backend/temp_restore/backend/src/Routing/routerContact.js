import { contactDetails } from "../controllers/contact.js";
import { isAuth } from "../middleware/isAuth.js";
import express from "express"
import { sendContactdetails } from "../controllers/contact.js";

export const contactRouter = express.Router()

contactRouter.post("/contactdetails",isAuth , contactDetails)
contactRouter.get("/fetchcontactdetails",sendContactdetails)



