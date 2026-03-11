import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true
  },
  planDescription: {
    type: String,
    required: true,
    trim: true
  },
  Cost: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "INR"
  },
  duration: {
    type: String,
    required: true  // e.g. "3 days", "month", "year"
  },
  features: {
    type: [String],
    default: []
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Plan = mongoose.model("Plan", planSchema);