import React from "react";
import { useCampaign } from "../Context/CampaignContext";
import { useNavigate } from "react-router-dom";
import CampaignLayout from "../layouts/CampaignLayout.jsx";
import { useState } from "react";
import { Edit3, ArrowRight, Info } from "lucide-react";

const CampaignName = () => {
  const { campaign, setCampaign, setSteps } = useCampaign();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const next = () => {
    if (!campaign.name.trim()) {
      setError("Please enter a campaign name");
      return;
    }
    setError("");
    setSteps((prev) => ({
      ...prev,
      name: true,
    }));
    navigate("/campaign/contacts");
  };

  return (
    <CampaignLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Header Area */}
          <div className="mb-10 text-center">
            <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
              <Edit3 size={28} />
            </div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter mb-4">
              Step 1: <span className="text-gradient">Name your campaign</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Choose a clear name to help you identify and track this campaign in your dashboard.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border p-10 rounded-[32px] shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                Campaign Identifier
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="e.g. Summer Flash Sale 2026"
                  value={campaign.name}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      name: e.target.value,
                    })
                  }
                  className="w-full h-16 bg-background border-2 border-border p-6 rounded-2xl text-foreground text-lg font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-muted-foreground/30"
                />
                <Edit3 className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm font-bold animate-pulse px-2">
                  <Info size={14} />
                  {error}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={next}
                className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                Save and Continue
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Hint Box */}
            <div className="p-4 rounded-xl bg-secondary/50 border border-border flex gap-3">
              <Info size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Pro Tip:</span> Include the date or season in your campaign name to make archiving more organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default CampaignName;
