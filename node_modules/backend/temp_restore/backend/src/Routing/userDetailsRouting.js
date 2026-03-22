import express from "express"
import { userDetails } from "../controllers/userDetailsController.js"
export const DetailsRouter = express()

DetailsRouter.post("/userdetails", userDetails)