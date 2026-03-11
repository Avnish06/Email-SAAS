import { Admin } from "../Models/admin.model.js";
import { User } from "../Models/User.model.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt";

const createToken = async (AdminId) => {
  let token = await jwt.sign(AdminId, process.env.JWT_SECRET, { expiresIn: "7d" })
  return token;
}
const email = "avnishkr.mbd@gmail.com"
let password = "1234567890"
const createAdmin = async () => {
  if (!email || !password) {
    console.error("Admin credentials missing in env or module level");
    return;
  }
  password = await bcrypt.hash(password, 10)

  const admin = await Admin.create({
    email,
    password
  })
}
export const loginAdmin = async (req, res) => {

  const { email, password } = req.body
  try {
    const count = await Admin.countDocuments()
    if (count == 0) {
      await createAdmin()
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = await createToken(admin._id)

    res.cookie("AdminToken", token, {
      samesite: "false",
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: "Admin logged in Successfully" })
  } catch (error) {

  }
}
export const LogoutAdmin = async (req, res) => {
  return res.clearCookie("AdminToken").json({ message: "Admin Logges Out Successfully" })
}
export const getUserData = async (req, res) => {
  try {
    const user = await User.find()
    console.log("Fetched users count:", user.length);
    if (user.length > 0) {
      console.log("First user ID:", user[0]._id);
    }
    return res.status(200).json({ user })
  } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json({ message: error.message })
  }
}
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    console.log("Fetching user with ID:", id);
    const user = await User.findById(id)
    if (!user) {
      console.log("User not found for ID:", id);
      return res.status(404).json({ message: "User not found" })
    }
    console.log("User found:", user.email);
    return res.status(200).json({ user })
  } catch (error) {
    console.error("Error in getSingleUser:", error);
    return res.status(500).json({ message: "Error while fetching user details" })
  }
}
export const EditUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, phonenumber, status } = req.body

    const updateData = { name, email, phonenumber, status };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true })
    return res.status(200).json({ message: "User Data has been Updated", user })
  } catch (error) {
    return res.status(500).json({ message: "Error while Editing the user Details" })
  }
}





















