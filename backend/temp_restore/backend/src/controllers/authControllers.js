import { User } from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEmail from "../config/sendEmail.js";

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
const cookieOptions = {
  httpOnly: true,
  secure: false,
};
export const signup = async (req, res) => {
  try {
    let { name, email, password, phonenumber } = req.body;

    console.log("REQ BODY ", req.body);

    if (!name || !email || !password || !phonenumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phonenumber: phonenumber }
      ]
    });

    console.log("EXISTING USER", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HASHED PASSWORD OK");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phonenumber
    });
    console.log("USER CREATED", user._id);

    console.log("JWT_SECRET", process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found. Please signup first.",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
export const getCurrentUser = async (req, res) => {
  let user = await User.findById(req.userId)
  return res.status(200).json({ message: "User data fetching Successfully", user })
}
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" })
    }
    let otp = ""
    for (let i = 0; i < 4; i++) {
      otp += Math.floor((Math.random() * 10))
    }
    user.Otp = otp
    await user.save()
    sendEmail(email, "Your otp is", user.Otp)
    res.status(200).json({ message: "Otp sended successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong whike sending the otp" })
  }
}
export const confirmOtp = async (req, res) => {
  try {
    const { Otp } = req.body
    if (!Otp) {
      return res.status(400).json({ message: "please fill the otp there" })
    }
    const user = await User.findOne({ Otp })

    if (!user) {
      return res.status(400).json({ message: "User doesn't found" })
    }
    user.Otp = ""
    await user.save()
    return res.status(200).json({ message: "Otp verified successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Something went erong while verifying your otp" })
  }
}
export const confirmPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "password is not matching" })
    }
    const user = await User.findOne({ email })
    user.password = newPassword;
    user.save()
    return res.status(200).json({ message: "Password reset successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while resetting your password" })
  }
}

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phonenumber, password } = req.body;
    const userId = req.userId; // Changed from req.user._id

    // Find the current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    // Check if phone number is being changed and if it's already taken
    if (phonenumber && phonenumber !== user.phonenumber) {
      const existingPhone = await User.findOne({ phonenumber });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
      user.phonenumber = phonenumber;
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(userId).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
