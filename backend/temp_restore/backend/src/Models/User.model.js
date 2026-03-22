import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
name:{
   type:String,
    required: true
},
email:{
   type: String,
   unique: true,
   required: true
},
password: {
    type: String,
    required: true
},
phonenumber:{
     type: Number,
     required:true
},
userDetails:{
 type:mongoose.Schema.Types.ObjectId,
 ref:'Userdetail'
},
Otp:{
   type: Number
},
contacts:[{
   type: String
}]
},{timestamps: true})
export const User= mongoose.model("User", userSchema)
