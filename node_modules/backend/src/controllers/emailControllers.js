import sendEmail from "../config/sendEmail.js";
import { Campaign } from "../Models/Campaign.model.js";
import mongoose from "mongoose";

export const sendEmailto = async (req, res) => {
  try {
    const { email, name, content, subject, campaignId: providedCampaignId } = req.body;

    // Determine the backend base URL for tracking
    const protocol = req.protocol;
    const host = req.get("host");
    const baseUrl = process.env.BACKEND_URL || `${protocol}://${host}`;

    // If no campaignId provided, auto-create a campaign record for tracking
    let campaignId = providedCampaignId;
    if (!campaignId) {
      try {
        const userId = req.userId;
        if (userId) {
          const newCampaign = await Campaign.create({
            campaignName: name || subject || "Untitled Campaign",
            campaignType: "email",
            inbuiltTemplate: false,
            userId,
            templateId: new mongoose.Types.ObjectId(),
            status: "draft",
          });
          campaignId = newCampaign._id.toString();
        }
      } catch (createErr) {
        console.error("Auto-create campaign failed:", createErr.message);
      }
    }

    // Send emails with tracking
    const results = await sendEmail(
      email,
      subject,
      content,
      campaignId,
      baseUrl
    );

    // If we have a campaignId, update the campaign record with analytics
    if (campaignId) {
      try {
        const campaign = await Campaign.findById(campaignId);
        if (campaign) {
          const now = new Date();
          const recipientRecords = results.sent.map((e) => ({
            email: e,
            sentAt: now,
          }));
          const bouncedRecords = results.failed.map((e) => ({
            email: e,
            sentAt: now,
            bounced: true,
          }));

          campaign.recipients = [...recipientRecords, ...bouncedRecords];
          campaign.totalSent = results.sent.length;
          campaign.totalBounced = results.failed.length;
          campaign.totalOpened = 0;
          campaign.totalClicked = 0;
          campaign.status = "sent";

          await campaign.save();
        }
      } catch (dbErr) {
        console.error("Failed to update campaign analytics:", dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Emails sent",
      sent: results.sent.length,
      failed: results.failed.length,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending emails",
    });
  }
};