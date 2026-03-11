import { Campaign } from "../Models/Campaign.model.js";

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64"
);

/**
 * Email open tracking via 1x1 pixel
 * GET /api/v1/track/open/:campaignId/:email
 */
export const trackOpen = async (req, res) => {
    try {
        const { campaignId, email } = req.params;
        const decodedEmail = decodeURIComponent(email);

        // Find campaign and update the recipient's openedAt (only first open counts)
        const campaign = await Campaign.findById(campaignId);
        if (campaign) {
            const recipient = campaign.recipients.find(
                (r) => r.email === decodedEmail && !r.openedAt
            );
            if (recipient) {
                recipient.openedAt = new Date();
                campaign.totalOpened = campaign.recipients.filter(
                    (r) => r.openedAt
                ).length;
                await campaign.save();
            }
        }
    } catch (err) {
        console.error("Open tracking error:", err.message);
    }

    // Always return the pixel regardless of errors
    res.set({
        "Content-Type": "image/gif",
        "Content-Length": TRACKING_PIXEL.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
    });
    return res.status(200).end(TRACKING_PIXEL);
};

/**
 * Click tracking via redirect
 * GET /api/v1/track/click/:campaignId/:email?url=<actualUrl>
 */
export const trackClick = async (req, res) => {
    const { campaignId, email } = req.params;
    const { url } = req.query;

    try {
        const decodedEmail = decodeURIComponent(email);

        const campaign = await Campaign.findById(campaignId);
        if (campaign) {
            const recipient = campaign.recipients.find(
                (r) => r.email === decodedEmail && !r.clickedAt
            );
            if (recipient) {
                recipient.clickedAt = new Date();
                campaign.totalClicked = campaign.recipients.filter(
                    (r) => r.clickedAt
                ).length;
                await campaign.save();
            }
        }
    } catch (err) {
        console.error("Click tracking error:", err.message);
    }

    // Always redirect to the actual URL
    const redirectUrl = url || "/";
    return res.redirect(redirectUrl);
};
