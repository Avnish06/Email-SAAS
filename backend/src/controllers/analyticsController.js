import { Campaign } from "../Models/Campaign.model.js";

// Get analytics overview with real data
export const getAnalyticsOverview = async (req, res) => {
    try {
        // Support both cookie-auth (req.userId from accessController) and query-param userId
        const userId = req.userId || req.query.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const { range = "30d" } = req.query;

        // Determine date range
        const rangeMap = { "7d": 7, "30d": 30, "90d": 90 };
        const days = rangeMap[range] || 30;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const previousStartDate = new Date();
        previousStartDate.setDate(previousStartDate.getDate() - days * 2);

        // Current period campaigns
        const currentCampaigns = await Campaign.find({
            userId,
            updatedAt: { $gte: startDate },
        });

        // Previous period campaigns (for trend comparison)
        const previousCampaigns = await Campaign.find({
            userId,
            updatedAt: { $gte: previousStartDate, $lt: startDate },
        });

        // Calculate current period metrics
        const currentMetrics = calculateMetrics(currentCampaigns);
        const previousMetrics = calculateMetrics(previousCampaigns);

        // Calculate trends (percentage change)
        const trends = {
            totalSentTrend: calculateTrend(currentMetrics.totalSent, previousMetrics.totalSent),
            openRateTrend: calculateTrend(currentMetrics.openRate, previousMetrics.openRate),
            clickRateTrend: calculateTrend(currentMetrics.clickRate, previousMetrics.clickRate),
            bounceRateTrend: calculateTrend(currentMetrics.bounceRate, previousMetrics.bounceRate),
        };

        // Get top performing campaigns (sent campaigns with highest open rates)
        const allSentCampaigns = await Campaign.find({
            userId,
            status: "sent",
            totalSent: { $gt: 0 },
        }).sort({ updatedAt: -1 });

        const topCampaigns = allSentCampaigns
            .map((campaign) => ({
                name: campaign.campaignName,
                sentDate: campaign.updatedAt,
                openRate: parseFloat(
                    ((campaign.totalOpened / campaign.totalSent) * 100).toFixed(1)
                ),
                clickRate: parseFloat(
                    ((campaign.totalClicked / campaign.totalSent) * 100).toFixed(1)
                ),
                totalSent: campaign.totalSent,
            }))
            .sort((a, b) => b.openRate - a.openRate)
            .slice(0, 5);

        // Performance trends chart — last 7 days
        const chartData = buildChartData(allSentCampaigns);

        return res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalSent: currentMetrics.totalSent,
                    openRate: currentMetrics.openRate,
                    clickRate: currentMetrics.clickRate,
                    bounceRate: currentMetrics.bounceRate,
                    totalCampaigns: currentCampaigns.filter(
                        (c) => c.status === "sent"
                    ).length,
                },
                trends,
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

/**
 * Calculate aggregate metrics from a list of campaigns
 */
function calculateMetrics(campaigns) {
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

    const openRate =
        totalSent > 0
            ? parseFloat(((totalOpened / totalSent) * 100).toFixed(1))
            : 0;
    const clickRate =
        totalSent > 0
            ? parseFloat(((totalClicked / totalSent) * 100).toFixed(1))
            : 0;
    const bounceRate =
        totalSent > 0
            ? parseFloat(((totalBounced / totalSent) * 100).toFixed(1))
            : 0;

    return { totalSent, totalOpened, totalClicked, totalBounced, openRate, clickRate, bounceRate };
}

/**
 * Calculate percentage trend between current and previous values
 */
function calculateTrend(current, previous) {
    if (previous === 0 && current === 0) return "0.0";
    if (previous === 0) return "+100.0";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}`;
}

/**
 * Build 7-day chart data from sent campaigns
 */
function buildChartData(campaigns) {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Initialize 7 days
    const chartData = Array(7)
        .fill(null)
        .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
                day: dayNames[date.getDay()],
                date: date.toISOString().split("T")[0],
                openRate: 0,
                clickRate: 0,
                count: 0,
            };
        });

    // Only include recent sent campaigns
    const recentCampaigns = campaigns.filter(
        (c) => new Date(c.updatedAt) >= sevenDaysAgo && c.totalSent > 0
    );

    recentCampaigns.forEach((campaign) => {
        const campaignDate = new Date(campaign.updatedAt)
            .toISOString()
            .split("T")[0];
        const chartIndex = chartData.findIndex((d) => d.date === campaignDate);
        if (chartIndex !== -1) {
            chartData[chartIndex].openRate +=
                (campaign.totalOpened / campaign.totalSent) * 100;
            chartData[chartIndex].clickRate +=
                (campaign.totalClicked / campaign.totalSent) * 100;
            chartData[chartIndex].count += 1;
        }
    });

    // Average the rates and clean up
    return chartData.map((data) => {
        if (data.count > 0) {
            data.openRate = Math.round(data.openRate / data.count);
            data.clickRate = Math.round(data.clickRate / data.count);
        }
        delete data.count;
        delete data.date;
        return data;
    });
}
