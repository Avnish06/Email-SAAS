import { useCampaign } from "../Context/CampaignContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CampaignLayout from "../layouts/CampaignLayout";
import { PenTool, Type, FileText, Sparkles, ChevronRight, Info } from "lucide-react";

const WriteMail = () => {
  const navigate = useNavigate();
  const { campaign, setCampaign } = useCampaign();

  const goToEditor = () => {
    if (!campaign.subject.trim()) {
      toast.error("Please enter a subject line");
      return;
    }

    if (!campaign.content.trim()) {
      toast.error("Please write some message content");
      return;
    }

    // Save content before moving
    setCampaign({
      ...campaign,
      subject: campaign.subject,
      content: campaign.content,
    });

    navigate("/campaign/editor");
  };

  return (
    <CampaignLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
              <PenTool size={28} />
            </div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter mb-4">
              Step 4: <span className="text-gradient">Compose your message</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Draft your email subject and core message. You'll refine the design in the next step.
            </p>
          </div>

          {/* Composition Card */}
          <div className="bg-card border border-border rounded-[32px] p-8 md:p-12 shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Sparkles size={160} />
            </div>

            <div className="space-y-8 relative z-10">
              {/* SUBJECT */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <Type size={14} className="text-primary" />
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Subject Line
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Exclusive Offer: 50% Off Everything!"
                  value={campaign.subject}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      subject: e.target.value,
                    })
                  }
                  className="w-full h-16 bg-background border-2 border-border p-6 rounded-2xl text-foreground text-lg font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-muted-foreground/30"
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <FileText size={14} className="text-primary" />
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Email Content
                  </label>
                </div>
                <textarea
                  placeholder="Start writing your amazing email here..."
                  value={campaign.content}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      content: e.target.value,
                    })
                  }
                  rows={10}
                  className="w-full bg-background border-2 border-border p-6 rounded-2xl text-foreground text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none custom-scrollbar leading-relaxed"
                />
              </div>

              {/* HINT */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3">
                <Info size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">Tip:</span> Keep your subject line under 60 characters for best visibility on mobile devices.
                </p>
              </div>

              {/* BUTTON */}
              <div className="pt-4">
                <button
                  onClick={goToEditor}
                  className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  Confirm and Design
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default WriteMail;
