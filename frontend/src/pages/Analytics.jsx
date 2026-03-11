import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../Context/userContext";
import axios from "axios";
import { AppUrl } from "../App";
import {
  Calendar,
  ChevronDown,
  Download,
  Send,
  MailOpen,
  MousePointer2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Loader2,
  BarChart3,
  Inbox,
} from "lucide-react";

const DATE_RANGE_OPTIONS = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

const Analytics = () => {
  const navigate = useNavigate();
  const { user } = useDetails();
  const [dateRange, setDateRange] = useState("30d");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${AppUrl}/analytics/overview?range=${dateRange}&userId=${user._id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setAnalyticsData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data.");
        setAnalyticsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  };

  // Get data or defaults
  const overview = analyticsData?.overview || {
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    totalCampaigns: 0,
  };

  const trends = analyticsData?.trends || {
    totalSentTrend: "0.0",
    openRateTrend: "0.0",
    clickRateTrend: "0.0",
    bounceRateTrend: "0.0",
  };

  const topCampaigns = analyticsData?.topCampaigns || [];
  const chartData = analyticsData?.chartData || [];

  const dateLabel =
    DATE_RANGE_OPTIONS.find((o) => o.value === dateRange)?.label ||
    "Last 30 Days";

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Campaign Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your message performance and audience engagement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Dropdown */}
            <div className="relative">
              <div
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="flex items-center gap-2 h-11 px-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-all shadow-sm select-none"
              >
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">
                  {dateLabel}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${
                    dateDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {dateDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden min-w-[160px] animate-in fade-in slide-in-from-top-2 duration-200">
                  {DATE_RANGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateRange(option.value);
                        setDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-secondary ${
                        dateRange === option.value
                          ? "text-primary bg-primary/5"
                          : "text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="h-11 px-6 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-96 bg-card/30 backdrop-blur-sm border border-border rounded-[32px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">
                Crunching your data...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-destructive flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Empty State — no error, but no campaigns */}
        {!loading &&
          !error &&
          analyticsData &&
          overview.totalSent === 0 &&
          overview.totalCampaigns === 0 && (
            <div className="flex flex-col items-center justify-center h-96 bg-card/30 backdrop-blur-sm border border-border rounded-[32px] gap-6">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <Inbox size={36} className="text-muted-foreground/40" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">
                  No analytics data yet
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Send your first campaign to start seeing real-time analytics
                  here.
                </p>
              </div>
              <button
                onClick={() => navigate("/campaign/new")}
                className="h-11 px-6 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send size={16} />
                Create Campaign
              </button>
            </div>
          )}

        {/* Analytics Content — only show when we have real data */}
        {!loading && analyticsData && (overview.totalSent > 0 || overview.totalCampaigns > 0) && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Sent"
                value={overview.totalSent.toLocaleString()}
                icon={Send}
                trend={`${trends.totalSentTrend}%`}
                trendUp={parseFloat(trends.totalSentTrend) >= 0}
              />
              <KPICard
                title="Open Rate"
                value={`${overview.openRate}%`}
                icon={MailOpen}
                trend={`${trends.openRateTrend}%`}
                trendUp={parseFloat(trends.openRateTrend) >= 0}
                color="primary"
              />
              <KPICard
                title="Click Rate"
                value={`${overview.clickRate}%`}
                icon={MousePointer2}
                trend={`${trends.clickRateTrend}%`}
                trendUp={parseFloat(trends.clickRateTrend) >= 0}
                color="accent"
              />
              <KPICard
                title="Bounce Rate"
                value={`${overview.bounceRate}%`}
                icon={AlertCircle}
                trend={`${trends.bounceRateTrend}%`}
                trendUp={parseFloat(trends.bounceRateTrend) <= 0}
                color="destructive"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Performance Trends Chart */}
              <div className="lg:col-span-2 bg-card border border-border rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold text-foreground">
                    Performance Trends
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      Open Rate
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      Click Rate
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-3 md:gap-6 h-[280px] border-b border-border pb-6 relative">
                  {chartData.length > 0 &&
                  chartData.some(
                    (d) => d.openRate > 0 || d.clickRate > 0
                  ) ? (
                    chartData.map((data, idx) => (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col justify-end gap-1.5 h-full group"
                      >
                        <div
                          className="w-full bg-primary/20 rounded-xl hover:bg-primary/40 transition-all duration-300 relative"
                          style={{
                            height: `${Math.max(data.openRate, 2)}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-primary rounded-xl opacity-60"></div>
                        </div>
                        <div
                          className="w-full bg-accent/20 rounded-xl hover:bg-accent/40 transition-all duration-300 relative"
                          style={{
                            height: `${Math.max(data.clickRate, 2)}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-accent rounded-xl opacity-60"></div>
                        </div>
                        <div className="text-[10px] md:text-xs font-bold text-muted-foreground text-center mt-3 uppercase tracking-tighter">
                          {data.day}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground gap-3">
                      <BarChart3 size={36} className="opacity-20" />
                      <p className="text-sm italic">
                        No trend data for this period yet
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Campaigns Table Card */}
              <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-foreground">
                    Top Campaigns
                  </h3>
                  <button
                    onClick={() => navigate("/campaigns")}
                    className="text-primary text-sm font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
                  {topCampaigns.length > 0 ? (
                    topCampaigns.map((campaign, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-border transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              {campaign.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                              {formatDate(campaign.sentDate)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-foreground">
                              {campaign.openRate}%
                            </p>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-tight">
                              Open Rate
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${campaign.openRate}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic gap-4 py-12">
                      <TrendingUp size={40} className="opacity-10" />
                      <p>No sent campaigns yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= HELPER COMPONENTS ================= */

const KPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "primary",
}) => {
  const trendColor = trendUp ? "text-primary" : "text-destructive";
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <div className="bg-card p-8 rounded-[32px] border border-border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
      <div
        className={`absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
      >
        <Icon size={120} className={`text-${color}`} />
      </div>
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-[18px] bg-secondary flex items-center justify-center text-primary shadow-sm">
            <Icon size={22} />
          </div>
          <div
            className={`flex items-center gap-1 font-black text-xs ${trendColor} bg-secondary/50 px-3 py-1.5 rounded-full`}
          >
            <TrendIcon size={12} />
            {trend}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground">
            {title}
          </p>
          <p className="text-4xl font-black text-foreground tracking-tighter">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
