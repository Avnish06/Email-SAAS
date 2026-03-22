import { signup, login, getCurrentUser, updateProfile } from "../controllers/authControllers.js";
import { isAuth } from "../middleware/isAuth.js";
import express from "express"

export const authRouter = express.Router()


authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/user", getCurrentUser)
authRouter.put("/profile", isAuth, updateProfile)