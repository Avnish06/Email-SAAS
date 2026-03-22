import { Campaign } from "../Models/Campaign.model.js";

// Get analytics overview
export const getAnalyticsOverview = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all campaigns for the user
        const campaigns = await Campaign.find({ userId });

        // Calculate overall metrics
        let totalSent = 0;
        let totalOpened = 0;
        let totalClicked = 0;
        let totalBounced = 0;

        campaigns.forEach((campaign) => {
            totalSent += campaign.totalSent || 0;
            totalOpened += campaign.totalOpened || 0;
            totalClicked += campaign.totalClicked || 0;
            totalBounced += campaign.totalBounced || 0;
        });

        // Calculate rates
        const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0;
        const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : 0;
        const bounceRate = totalSent > 0 ? ((totalBounced / totalSent) * 100).toFixed(1) : 0;

        // Get top performing campaigns
        const topCampaigns = campaigns
            .filter((c) => c.status === "sent" && c.totalSent > 0)
            .map((campaign) => ({
                name: campaign.campaignName,
                sentDate: campaign.updatedAt,
                openRate: ((campaign.totalOpened / campaign.totalSent) * 100).toFixed(1),
                clickRate: ((campaign.totalClicked / campaign.totalSent) * 100).toFixed(1),
                totalSent: campaign.totalSent,
            }))
            .sort((a, b) => parseFloat(b.openRate) - parseFloat(a.openRate))
            .slice(0, 4);

        // Get performance trends for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentCampaigns = campaigns.filter(
            (c) => c.updatedAt >= sevenDaysAgo && c.status === "sent"
        );

        // Group by day of week
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const chartData = Array(7)
            .fill(null)
            .map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                return {
                    day: dayNames[date.getDay()],
                    openRate: 0,
                    clickRate: 0,
                    count: 0,
                };
            });

        recentCampaigns.forEach((campaign) => {
            const dayIndex = new Date(campaign.updatedAt).getDay();
            const chartIndex = chartData.findIndex((d) => d.day === dayNames[dayIndex]);
            if (chartIndex !== -1 && campaign.totalSent > 0) {
                chartData[chartIndex].openRate += (campaign.totalOpened / campaign.totalSent) * 100;
                chartData[chartIndex].clickRate += (campaign.totalClicked / campaign.totalSent) * 100;
                chartData[chartIndex].count += 1;
            }
        });

        // Average the rates
        chartData.forEach((data) => {
            if (data.count > 0) {
                data.openRate = Math.round(data.openRate / data.count);
                data.clickRate = Math.round(data.clickRate / data.count);
            }
            delete data.count;
        });

        return res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalSent,
                    openRate: parseFloat(openRate),
                    clickRate: parseFloat(clickRate),
                    bounceRate: parseFloat(bounceRate),
                },
                topCampaigns,
                chartData,
            },
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch analytics data",
        });
    }
};
