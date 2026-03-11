import { loginAdmin } from "../controllers/admin.controller.js";
import { LogoutAdmin } from "../controllers/admin.controller.js";
import { getUserData, getSingleUser } from "../controllers/admin.controller.js";
import { EditUser } from "../controllers/admin.controller.js";
import express from "express"

export const Adminroute = express.Router()


Adminroute.post("/loginadmin", loginAdmin)
Adminroute.get("/logout", LogoutAdmin)
Adminroute.get("/getUserdetails", getUserData)
Adminroute.get("/getuser/:id", getSingleUser)
Adminroute.put("/edituserdetails/:id", EditUser)

