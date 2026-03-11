import express from "express";
import { createOrder, verifyPayment, getMyOrders } from "../controllers/orderController.js";
import { accessController } from "../middleware/accessController.js";

export const orderRouter = express.Router();

// All order routes require authentication
orderRouter.post("/create", accessController, createOrder);
orderRouter.post("/verify", accessController, verifyPayment);
orderRouter.get("/my", accessController, getMyOrders);
