import { useEffect, useState } from "react";
import axios from "axios";
import { AppUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { 
  Rocket, 
  History, 
  Plus, 
  BarChart2, 
  Users, 
  Mail, 
  Calendar,
  ChevronRight,
  Search,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";

const Campaign = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeTab === "history") {
      fetchCampaigns();
    }
  }, [activeTab]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${AppUrl}/campaign`);
      setCampaigns(data);
    } catch (err) {
      console.error("Fetch campaign error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CampaignLayout>
      <div className="relative z-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary italic">Campaign Center</h2>
            <h1 className="text-5xl font-black text-foreground tracking-tighter">
              Manage your <span className="text-gradient">outreach</span>
            </h1>
          </div>

          <div className="flex p-1.5 bg-secondary/50 backdrop-blur-md rounded-2xl border border-border w-fit">
            <TabBtn 
              active={activeTab === "create"} 
              onClick={() => setActiveTab("create")}
              icon={Plus}
              label="Launch New"
            />
            <TabBtn 
              active={activeTab === "history"} 
              onClick={() => setActiveTab("history")}
              icon={History}
              label="Campaign History"
            />
          </div>
        </div>

        {/* Create Section */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="md:col-span-12">
               <div className="bg-card border border-border rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <Rocket size={320} />
                  </div>
                  
                  <div className="max-w-2xl relative z-10 space-y-8">
                     <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xl">
                        <Rocket size={32} />
                     </div>
                     <h2 className="text-4xl font-black text-foreground tracking-tighter leading-none">
                        Ready to engage your <br />
                        <span className="text-primary">audience?</span>
                     </h2>
                     <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                        Create, personalize, and launch high-impact email campaigns in minutes. Use our visual builder or AI magic to craft the perfect message.
                     </p>
                     
                     <div className="flex flex-wrap gap-4 pt-4">
                        <button
                          onClick={() => navigate("/campaign/new")}
                          className="px-10 h-16 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-3"
                        >
                          Start Campaign <ChevronRight size={18} />
                        </button>
                        <button
                          onClick={() => navigate("/analytics")}
                          className="px-10 h-16 bg-secondary text-foreground border border-border rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-border transition-all flex items-center gap-3"
                        >
                          View Analytics <BarChart2 size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {activeTab === "history" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
             {/* Search and Filters */}
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search campaigns..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 bg-card border border-border pl-12 pr-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-foreground font-bold"
                  />
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border">
                  Total: {filteredCampaigns.length} Campaigns
                </div>
             </div>

             <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-xl">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-secondary/30 border-b border-border">
                       <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Campaign Details</th>
                       <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Subject</th>
                       <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recipients</th>
                       <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Date</th>
                       <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                       <th className="py-6 px-8 text-right"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/50">
                     {loading ? (
                        <tr><td colSpan="6" className="py-20 text-center"><Loader /></td></tr>
                     ) : filteredCampaigns.length === 0 ? (
                        <tr><td colSpan="6" className="py-20 text-center text-muted-foreground font-bold">No campaigns found.</td></tr>
                     ) : (
                       filteredCampaigns.map((c) => (
                         <tr key={c._id} className="group hover:bg-secondary/20 transition-colors">
                           <td className="py-6 px-8">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                 <Mail size={18} />
                               </div>
                               <div>
                                 <h4 className="font-black text-foreground">{c.name || "Untitled"}</h4>
                                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ID: {c._id.slice(-6)}</p>
                               </div>
                             </div>
                           </td>
                           <td className="py-6 px-4 text-sm font-bold text-muted-foreground max-w-xs truncate">{c.subject}</td>
                           <td className="py-6 px-4">
                             <div className="flex items-center gap-2 text-foreground font-black">
                               <Users size={14} className="text-primary" />
                               {c.emails?.length || 0}
                             </div>
                           </td>
                           <td className="py-6 px-4 font-bold text-muted-foreground text-sm">
                             <div className="flex items-center gap-2">
                               <Clock size={14} />
                               {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                             </div>
                           </td>
                           <td className="py-6 px-4">
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                               <CheckCircle size={10} />
                               Sent
                             </span>
                           </td>
                           <td className="py-6 px-8 text-right">
                             <button className="p-3 text-muted-foreground hover:text-primary transition-colors">
                               <ExternalLink size={18} />
                             </button>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        )}
      </div>
    </CampaignLayout>
  );
};

const TabBtn = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-8 h-12 rounded-xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${
      active 
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
        : "text-muted-foreground hover:bg-border/50"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const Loader = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Fetching Campaigns...</span>
  </div>
);

export default Campaign;
