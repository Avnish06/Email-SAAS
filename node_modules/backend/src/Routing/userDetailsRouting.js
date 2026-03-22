import express from "express"
import { userDetails } from "../controllers/userDetailsController.js"
import { accessController } from "../middleware/accessController.js";
export const DetailsRouter = express.Router()

DetailsRouter.post("/userdetails", accessController, userDetails)
