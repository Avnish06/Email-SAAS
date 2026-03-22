dotenv.config()
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { authRouter } from "./src/Routing/authRouting.js"
import { DetailsRouter } from "./src/Routing/userDetailsRouting.js"
import { connnectdb } from "./src/config/db.js"
import { contactRouter } from "./src/Routing/routerContact.js"
import { sendEmailroute } from "./src/Routing/emailRouting.js"
import { templateRouting } from "./src/Routing/templateRouting.js"
import analyticsRouting from "./src/Routing/analyticsRouting.js"


dotenv.config()
const app = express()
connnectdb()
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"))
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome")
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/userinfo", DetailsRouter)
app.use("/api/v1/contactinfo", contactRouter)
app.use("/api/v1/sendmail", sendEmailroute)
app.use("/api/v1/template", templateRouting)
app.use("/api/v1/analytics", analyticsRouting)
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening on the ${process.env.PORT}`)
})


