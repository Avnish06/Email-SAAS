import mongoose from "mongoose"

const userDetailsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India",
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    app_password: {
        type: String,
        required: false
    },
    contactsize: {
        type: Number
    },
    industrytype: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Userdetail = mongoose.model("Userdetail", userDetailsSchema)