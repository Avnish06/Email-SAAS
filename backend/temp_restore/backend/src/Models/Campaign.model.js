
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    campaignName: {
      type: String,
      required: true
    },
    campaignType: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temp",
      required: true
    },

    subject: {
      type: String,
      default: ""
    },

    variables: {
      type: Object,
      default: {}
    },

    renderedHtml: {
      type: String
    },
    inbuiltTemplate: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "sent"],
      default: "draft"
    },

    // Analytics tracking fields
    totalSent: {
      type: Number,
      default: 0
    },
    totalOpened: {
      type: Number,
      default: 0
    },
    totalClicked: {
      type: Number,
      default: 0
    },
    totalBounced: {
      type: Number,
      default: 0
    },
    recipients: [{
      email: String,
      sentAt: Date,
      openedAt: Date,
      clickedAt: Date,
      bounced: Boolean
    }]
  },
  { timestamps: true }
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
