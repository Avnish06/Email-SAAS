import { useNavigate } from "react-router-dom";
import React from "react";
import { 
  Inbox, 
  Plus, 
  BarChart2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

import CampaignLayout from "../layouts/CampaignLayout";

const CampaignDashboard = () => {
  const navigate = useNavigate();

  return (
    <CampaignLayout>
      <div className="relative z-10 flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header / Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scale Your Impact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">
            Elevate Your <span className="text-gradient">Reach</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Unleash the power of high-converting email sequences. Design, automate, and track your growth in one seamless interface.
          </p>
        </div>

        {/* Central Hub Card */}
        <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[48px] p-10 md:p-16 w-full max-w-[720px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
          
          <div className="flex flex-col items-center text-center gap-10">
            <div className="w-20 h-20 rounded-[28px] bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl border border-primary/20">
              <Inbox size={40} />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                Campaign Operations
              </h2>
              <p className="text-sm text-muted-foreground max-w-[440px] font-medium leading-relaxed">
                Connect with your audience using our state-of-the-art designer. Monitor real-time performance and refine your strategy.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-md">
              <button
                onClick={() => navigate("/campaign/new")}
                className="flex-1 min-w-[200px] h-14 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-3"
              >
                <Plus size={18} />
                New Campaign
              </button>
              <button
                onClick={() => navigate("/campaigns")}
                className="flex-1 min-w-[200px] h-14 rounded-2xl bg-background border border-border text-foreground font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-3 group/btn"
              >
                <BarChart2 size={18} />
                Analytics <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-6 border-t border-border/50 w-full flex items-center justify-center gap-3 text-muted-foreground/40 font-black text-[10px] uppercase tracking-[0.2em]">
              <ShieldCheck size={14} className="text-primary/40" />
              Enterprise Grade Infrastructure
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default CampaignDashboard;
