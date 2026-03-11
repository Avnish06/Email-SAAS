import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Edit3, CreditCard, Layout, BarChart2, Shield } from "lucide-react";

const features = [
  {
    icon: <Users size={32} />,
    title: "All Users",
    description: "View, search and manage every registered user in the system.",
    path: "/admin/users",
    color: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-blue-500/10 text-blue-500",
    badge: "Users",
  },
  {
    icon: <Edit3 size={32} />,
    title: "Edit User Details",
    description: "Update user information, statuses and privileges directly.",
    path: "/admin/users",
    color: "from-violet-500/20 to-violet-600/10",
    iconBg: "bg-violet-500/10 text-violet-500",
    badge: "Editing",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Plans & Pricing",
    description: "Create, update or remove subscription plans and pricing tiers.",
    path: "/admin/plans",
    color: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    badge: "Billing",
  },
  {
    icon: <Layout size={32} />,
    title: "Template Handling",
    description: "Manage email templates and use AI to generate fresh designs.",
    path: "/admin/templates",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 text-primary",
    badge: "AI Powered",
  },
  {
    icon: <BarChart2 size={32} />,
    title: "User Info & Stats",
    description: "Deep-dive analytics into individual user activity and metrics.",
    path: "/admin/userinfo",
    color: "from-orange-500/20 to-orange-600/10",
    iconBg: "bg-orange-500/10 text-orange-500",
    badge: "Analytics",
  },
];

export const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-8 pt-24">
      <div className="max-w-6xl mx-auto">

        {/* Hero Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <Shield size={28} className="text-primary" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Admin Control Center</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground mb-3">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl font-medium">
            Your central hub to manage users, subscriptions, templates, and platform analytics.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              onClick={() => navigate(f.path)}
              className={`group relative cursor-pointer rounded-[32px] border border-border bg-gradient-to-br ${f.color} p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
            >
              {/* Subtle shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${f.iconBg}`}>
                  {f.icon}
                </div>
                <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest rounded-full border border-border">
                  {f.badge}
                </span>
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {f.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                <span>Open Section</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
