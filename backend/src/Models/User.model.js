import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      default: ""
   },
   phonenumber: {
      type: String,
      default: ""
   },
   googleId: {
      type: String,
      default: null
   },
   photoURL: {
      type: String,
      default: null
   },
   userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userdetail'
   },
   Otp: {
      type: Number
   },
   plan:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Plan"
   },
   status:{
       type:String,
       enum:["Active", "Block"]
   },
   contacts: [String]
}, { timestamps: true })
export const User = mongoose.model("User", userSchema)

