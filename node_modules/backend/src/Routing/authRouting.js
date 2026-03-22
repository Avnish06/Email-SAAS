import { signup, login, getCurrentUser, updateProfile, googleAuth } from "../controllers/authControllers.js";
import { accessController } from "../middleware/accessController.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.get("/user", accessController, getCurrentUser);
authRouter.put("/profile", accessController, updateProfile);
