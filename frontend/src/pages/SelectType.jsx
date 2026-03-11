import React from "react";
import { useCampaign } from "../Context/CampaignContext";
import { useNavigate } from "react-router-dom";
import CampaignLayout from "../layouts/CampaignLayout";
import { Layout, BookOpen, PenTool, ChevronDown, CheckCircle2 } from "lucide-react";

const SelectType = () => {
  const navigate = useNavigate();
  const { campaign, setCampaign } = useCampaign();

  const handleMethodSelect = (method) => {
    if (!campaign.type) {
      alert("Please select email type first");
      return;
    }

    setCampaign({
      ...campaign,
      creationMethod: method,
    });

    if (method === "template") {
      navigate("/campaign/templates");
    } else {
      navigate("/campaign/write");
    }
  };

  return (
    <CampaignLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
              <Layout size={28} />
            </div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter mb-4">
              Step 3: <span className="text-gradient">Choose your path</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Select the purpose of your email and how you want to build it.
            </p>
          </div>

          <div className="space-y-10">
            {/* EMAIL TYPE SELECTION */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                Campaign Category
              </label>
              <div className="relative">
                <select
                  value={campaign.type || ""}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      type: e.target.value,
                    })
                  }
                  className="w-full h-16 bg-card border-2 border-border p-6 rounded-2xl text-foreground font-bold focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer pr-12 shadow-sm"
                >
                  <option value="">-- Select Email Type --</option>
                  <option value="Marketing">Marketing Campaign</option>
                  <option value="Newsletter">Weekly/Monthly Newsletter</option>
                  <option value="Promotional Emails">Promotional Blast</option>
                  <option value="Welcome Emails">Onboarding/Welcome</option>
                  <option value="Transactional Emails">Transactional Notification</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
              </div>
            </div>

            {/* CREATION METHODS */}
            {campaign.type && (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* TEMPLATE LIBRARY */}
                <div
                  onClick={() => handleMethodSelect("template")}
                  className="group relative bg-card border-2 border-border rounded-[32px] p-10 text-center cursor-pointer hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    <BookOpen size={100} className="text-primary" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform border border-border">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
                    Professional Templates
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Choose from our collection of high-converting, mobile-ready designs.
                  </p>
                </div>

                {/* BUILD OWN */}
                <div
                  onClick={() => handleMethodSelect("custom")}
                  className="group relative bg-card border-2 border-border rounded-[32px] p-10 text-center cursor-pointer hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    <PenTool size={100} className="text-primary" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform border border-border">
                    <PenTool size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
                    Custom Builder
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Start with a blank canvas and build your unique design from scratch.
                  </p>
                </div>
              </div>
            )}

            {!campaign.type && (
              <div className="p-8 border-2 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center text-muted-foreground">
                <CheckCircle2 size={32} className="opacity-10 mb-4" />
                <p className="font-bold uppercase tracking-widest text-xs">Awaiting Category Selection</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default SelectType;
