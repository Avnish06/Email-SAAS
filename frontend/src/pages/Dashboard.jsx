import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppUrl } from "../App";
import { 
  BarChart2, 
  Users, 
  Send, 
  PlusCircle, 
  History, 
  PieChart, 
  ArrowUpRight 
} from "lucide-react";


const Dashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    campaigns: 0,
    contacts: 0,
    sent: 0,
  });

  const [loading, setLoading] = useState(false);

  /* ================= LOAD STATS ================= */

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {
      setLoading(true);

      // You can replace these later with real analytics API
      const campaignRes = await axios.get(`${AppUrl}/campaign`);
      const contactRes = await axios.get(`${AppUrl}/contacts`);

      setStats({
        campaigns: campaignRes.data.length,
        contacts: contactRes.data.length,
        sent: campaignRes.data.reduce(
          (sum, c) => sum + (c.emails?.length || 0),
          0
        ),
      });

    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor and manage your email marketing performance.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8">
          <StatCard
            title="Total Campaigns"
            value={stats.campaigns}
            icon={Send}
            loading={loading}
            color="primary"
          />
          <StatCard
            title="Total Contacts"
            value={stats.contacts}
            icon={Users}
            loading={loading}
            color="accent"
          />
          <StatCard
            title="Emails Sent"
            value={stats.sent}
            icon={BarChart2}
            loading={loading}
            color="primary"
          />
        </div>

        {/* ACTIONS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ActionCard
              title="Create Campaign"
              desc="Design and launch a new email blast to your subscribers."
              icon={PlusCircle}
              btn="Launch Campaign"
              onClick={() => navigate("/campaign/new")}
            />
            <ActionCard
              title="Manage Contacts"
              desc="Import, segment, and organize your audience database."
              icon={Users}
              btn="Open Contacts"
              onClick={() => navigate("/contacts")}
            />
            <ActionCard
              title="Campaign History"
              desc="Review performance of your past sent emails."
              icon={History}
              btn="View History"
              onClick={() => navigate("/campaigns")}
            />
            <ActionCard
              title="Analytics"
              desc="Deep dive into open rates, clicks, and conversion data."
              icon={PieChart}
              btn="Analyze Stats"
              onClick={() => navigate("/analytics")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, icon: Icon, loading, color }) => {
  return (
    <div className={`bg-card p-8 rounded-3xl border border-border group hover:border-${color}/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
        <Icon size={100} className={`text-${color}`} />
      </div>
      <div className="relative z-10 space-y-4">
        <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}`}>
          <Icon size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.1em] font-bold">
            {title}
          </h3>
          <p className="text-4xl font-black text-foreground">
            {loading ? <span className="animate-pulse">...</span> : value}
          </p>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, desc, icon: Icon, btn, onClick }) => {
  return (
    <div className="bg-card p-8 rounded-[32px] border border-border group hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary border border-border group-hover:scale-110 transition-transform">
            <Icon size={24} />
          </div>
          <ArrowUpRight className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            {desc}
          </p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="mt-8 px-6 py-3 bg-secondary text-foreground rounded-2xl font-bold text-sm border border-border hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        {btn}
      </button>
    </div>
  );
};
