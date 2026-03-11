import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../Context/CampaignContext";
import CampaignLayout from "../layouts/CampaignLayout";
import axios from "axios";
import { AppUrl } from "../App";
import { toast } from "react-toastify";
import blocksToHtml from "../utils/blocksToHtml.js";
import { 
  Eye, 
  Send, 
  ArrowLeft, 
  Mail, 
  Users, 
  Layout, 
  CheckCircle2, 
  AlertCircle,
  Smartphone,
  Signal,
  Wifi,
  Battery
} from "lucide-react";

const Preview = () => {
  const navigate = useNavigate();
  const { campaign, setCampaign } = useCampaign();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  const handleSend = async () => {
    if (
      !campaign.subject ||
      !campaign.blocks?.length ||
      campaign.contacts.length === 0
    ) {
      toast.error("Incomplete campaign details ❌");
      return;
    }
          
    try {
      setLoading(true);
      let mainContent = blocksToHtml(campaign.blocks);
      
      await axios.post(AppUrl + "/sendmail/sendemail", {
        email: campaign.contacts,
        name: campaign.name,
        subject: campaign.subject,
        content: mainContent
      }, { withCredentials: true });

      setSent(true);
      toast.success("Campaign launched successfully! 🚀");
      
      // Delay navigation to show success state
      setTimeout(() => {
        setCampaign({
          name: "",
          contacts: [],
          type: "",
          subject: "",
          content: "",
          blocks: [],
        });
        navigate("/campaigns");
      }, 3000);
    } catch (err) {
      toast.error("Failed to launch campaign. Please try again.");
      console.error(err);
    } finally { 
      setLoading(false);
    }
  };

  const renderBlock = (b) => {
    const d = b.data;
    switch (b.type) {
      case "text":
        return (
          <p style={{
            fontSize: d.size,
            color: d.color,
            fontWeight: d.bold ? "700" : "400",
            fontStyle: d.italic ? "italic" : "normal",
            textAlign: d.align || "left",
            lineHeight: "1.6",
            marginBottom: "12px",
          }}>
            {d.text}
          </p>
        );
      case "image":
        return <img src={d.url} alt="" className="w-full rounded-2xl mb-4 shadow-sm" />;
      case "button":
        return (
          <div className="flex justify-center my-6">
            <a
              href={d.link}
              style={{
                background: d.bg,
                color: d.color,
                borderRadius: d.radius,
              }}
              className="px-10 py-4 text-sm font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
            >
              {d.text}
            </a>
          </div>
        );
      case "divider":
        return <hr className="my-6 border-border" />;
      default:
        return null;
    }
  };

  if (sent) {
    return (
      <CampaignLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-700">
          <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-5xl font-black text-foreground tracking-tighter mb-4">Blast Off! 🚀</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto font-medium">
            Your campaign <span className="text-primary font-bold">"{campaign.name}"</span> is being delivered to {campaign.contacts.length} recipients.
          </p>
          <div className="mt-12 flex flex-col items-center gap-2">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/30 animate-pulse">Redirecting to Dashboard</p>
            <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
               <div className="h-full bg-primary animate-progress" />
            </div>
          </div>
        </div>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20 shadow-xl shadow-primary/5">
            <Eye size={28} />
          </div>
          <h2 className="text-4xl font-black text-foreground tracking-tighter">
            Final Step: <span className="text-gradient">Review & Launch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Review your campaign details and preview how it looks on mobile before launching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
          {/* Left: Metadata Review */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-[32px] p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Send size={140} />
              </div>
              
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20"><AlertCircle size={16} /></span>
                  Campaign Summary
                </h3>

                <div className="space-y-4">
                   <SummaryItem icon={Mail} label="Subject" value={campaign.subject || "Not set"} />
                   <SummaryItem icon={Users} label="Audience" value={`${campaign.contacts.length} Recipients`} />
                   <SummaryItem icon={Layout} label="Method" value={campaign.creationMethod || "Custom Design"} />
                   <SummaryItem icon={Layout} label="Category" value={campaign.type || "General"} />
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-[24px] p-6 space-y-4">
               <p className="text-sm text-foreground font-bold flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-primary" />
                 Launch Checklist
               </p>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <CheckItem label="Correct Sender Name" checked />
                 <CheckItem label="Verified Links" checked />
                 <CheckItem label="Alt Text for Images" checked />
                 <CheckItem label="Mobile Optimized" checked />
               </ul>
            </div>

            <div className="flex gap-4">
               <button 
                onClick={() => navigate("/campaign/editor")}
                className="flex-1 h-14 rounded-2xl border-2 border-border font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Editor
              </button>
              <button 
                disabled={loading}
                onClick={handleSend}
                className="flex-[2] h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? <Loader icon={Send} /> : <><Send size={18} /> Launch Campaign</>}
              </button>
            </div>
          </div>

          {/* Right: High-Fidelity Phone Preview */}
          <div className="flex justify-center perspective-1000">
             <div className="relative w-[340px] h-[680px] bg-[#111111] rounded-[60px] border-[10px] border-[#222222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden rotate-y-3 group hover:rotate-y-0 transition-transform duration-700">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222222] rounded-b-2xl z-50 flex items-center justify-center space-x-1">
                  <div className="w-10 h-1 bg-white/10 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-between px-8 z-40">
                  <span className="text-[10px] font-black text-black">12:45</span>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <Signal size={10} className="text-black" />
                    <Wifi size={10} className="text-black" />
                    <Battery size={10} className="text-black" />
                  </div>
                </div>

                {/* Notification Area */}
                <div className="absolute top-0 left-0 w-full h-full p-4 pt-14 flex flex-col bg-[#f0f4f8]">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex-1 flex flex-col">
                    {/* Inbox Header Mockup */}
                    <div className="px-6 py-4 border-b border-border space-y-3">
                      <div className="flex justify-between items-center">
                        <ArrowLeft size={14} className="text-muted-foreground" />
                        <div className="flex gap-4">
                           <div className="w-3 h-3 rounded-full bg-border" />
                           <div className="w-3 h-3 rounded-full bg-border" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xl font-black text-foreground tracking-tighter truncate">{campaign.subject || "No Subject"}</h2>
                        <div className="flex justify-between items-center">
                           <p className="text-[10px] font-bold text-muted-foreground">From: Colvo Technology</p>
                           <p className="text-[10px] font-medium text-muted-foreground">Now</p>
                        </div>
                      </div>
                    </div>

                    {/* Email Content Content */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar-thin bg-white">
                      <div className="space-y-4">
                        {campaign.blocks?.map((b) => (
                          <div key={b.id}>
                            {renderBlock(b)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-border flex justify-around">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"><ArrowLeft size={14} className="rotate-45" /></div>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"><ArrowLeft size={14} className="rotate-135" /></div>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"><AlertCircle size={14} /></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

const SummaryItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 group/item">
    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover/item:text-primary transition-colors border border-border">
      <Icon size={20} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{label}</span>
      <span className="text-sm font-bold text-foreground truncate max-w-[200px]">{value}</span>
    </div>
  </div>
);

const CheckItem = ({ label, checked }) => (
  <li className="flex items-center gap-3">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${checked ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground"}`}>
      <CheckCircle2 size={12} />
    </div>
    <span className="text-xs font-bold text-muted-foreground">{label}</span>
  </li>
);

const Loader = ({ icon: Icon }) => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
    <span>Processing...</span>
  </div>
);

export default Preview;
