import { useState, useEffect } from "react";
import { useCampaign } from "../Context/CampaignContext";
import axios from "axios";
import * as XLSX from "xlsx";
import { AppUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CampaignLayout from "../layouts/CampaignLayout";
import { 
  Users, 
  UserPlus, 
  FileSpreadsheet, 
  Building2, 
  Factory, 
  History, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  Trash2,
  ChevronRight,
  Plus
} from "lucide-react";

const ImportContacts = () => {
  const { campaign, setCampaign } = useCampaign();
  const [method, setMethod] = useState("manual");
  const [manualEmail, setManualEmail] = useState("");
  const [dragging, setDragging] = useState(false);
  const [savedContacts, setSavedContacts] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const navigate = useNavigate();

  const fetchPrevious = async () => {
    setLoadingSaved(true);
    try {
      const response = await axios.get(
        AppUrl + "/contactinfo/fetchcontactdetails",
        { withCredentials: true }
      );
      setSavedContacts(response.data.contacts || []);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400 || error.response?.status === 401) {
        toast.error("Please login to fetch saved contacts");
        navigate("/login");
      } else {
        toast.error("Failed to fetch saved contacts");
      }
    } finally {
      setLoadingSaved(false);
    }
  };

  const addFromSaved = (email) => {
    if (campaign.contacts.includes(email)) return;
    setCampaign({
      ...campaign,
      contacts: [...campaign.contacts, email],
    });
  };

  const addAllSaved = () => {
    const merged = [...new Set([...campaign.contacts, ...savedContacts])];
    setCampaign({
      ...campaign,
      contacts: merged,
    });
  };

  const storeContact = async () => {
    try {
      const response = await axios.post(
        AppUrl + "/contactinfo/contactdetails",
        { contact: campaign.contacts },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addManual = () => {
    if (!manualEmail) return;
    if (!manualEmail.includes("@")) {
      toast.error("Invalid Email Address");
      return;
    }
    if (campaign.contacts.includes(manualEmail)) {
      toast.info("This email is already in your list");
      return;
    }
    setCampaign({
      ...campaign,
      contacts: [...campaign.contacts, manualEmail],
    });
    setManualEmail("");
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      const emails = json
        .map((row) => {
          const emailKey = Object.keys(row).find(key => 
            key.toLowerCase().includes("email")
          );
          return emailKey ? row[emailKey] : null;
        })
        .filter(Boolean);
      
      if (!emails.length) {
        toast.warning("No emails found in the uploaded file");
        return;
      }
      const merged = [...new Set([...campaign.contacts, ...emails])];
      setCampaign({
        ...campaign,
        contacts: merged,
      });
      toast.success(`Successfully imported ${emails.length} contacts`);
    };
    reader.readAsBinaryString(file);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const removeEmail = (email) => {
    setCampaign({
      ...campaign,
      contacts: campaign.contacts.filter((e) => e !== email),
    });
  };

  return (
    <CampaignLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20 shadow-xl shadow-primary/5">
            <Users size={28} />
          </div>
          <h2 className="text-4xl font-black text-foreground tracking-tighter">
            Step 2: <span className="text-gradient">Build your audience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Import the contacts you want to reach. You can add them manually, upload a file, or choose from previous campaigns.
          </p>
        </div>

        {/* Method Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MethodCard
            title="Manual"
            icon={UserPlus}
            active={method === "manual"}
            onClick={() => setMethod("manual")}
          />
          <MethodCard
            title="Excel / CSV"
            icon={FileSpreadsheet}
            active={method === "excel"}
            onClick={() => setMethod("excel")}
          />
          <MethodCard title="CRM" icon={Building2} disabled />
          <MethodCard title="ERP" icon={Factory} disabled />
          <MethodCard 
            title="Previous" 
            icon={History} 
            active={method === "previous"}
            onClick={() => {
              setMethod("previous");
              fetchPrevious();
            }}
          />
        </div>

        {/* Action Area */}
        <div className="bg-card border border-border rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            {method === "manual" && <UserPlus size={120} />}
            {method === "excel" && <FileSpreadsheet size={120} />}
            {method === "previous" && <History size={120} />}
          </div>

          <div className="relative z-10 space-y-8">
            {method === "manual" && (
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Add Contacts Manually</h3>
                  <p className="text-sm text-muted-foreground">Type or paste an email address to add it to your list.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="e.g. hello@example.com"
                      className="w-full h-14 bg-background border-2 border-border px-6 rounded-2xl text-foreground font-bold focus:outline-none focus:border-primary transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && addManual()}
                    />
                  </div>
                  <button
                    onClick={addManual}
                    className="h-14 px-8 bg-primary text-primary-foreground rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Add Email
                  </button>
                </div>
              </div>
            )}

            {method === "excel" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Upload Spreadsheet</h3>
                  <p className="text-sm text-muted-foreground">Upload an .xlsx or .csv file. Make sure it contains an "Email" column.</p>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className={`border-4 border-dashed rounded-[32px] p-16 text-center transition-all duration-500 group/drop
                    ${dragging ? "border-primary bg-primary/5 scale-102" : "border-border hover:border-primary/30 hover:bg-secondary/30"}
                  `}
                >
                  <div className={`w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-primary mx-auto mb-6 transition-transform duration-500 ${dragging ? "scale-110 rotate-12" : "group-hover/drop:scale-110"}`}>
                    <UploadCloud size={40} />
                  </div>
                  <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} hidden id="file-upload" />
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-foreground">Drag and drop your file here</p>
                    <p className="text-muted-foreground tracking-wide font-medium">Supported formats: XLSX, CSV, XLS</p>
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="mt-8 cursor-pointer inline-flex items-center px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            )}

            {method === "previous" && (
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Previously Saved Contacts</h3>
                    <p className="text-sm text-muted-foreground">Re-use contacts from your database.</p>
                  </div>
                  {savedContacts.length > 0 && (
                    <button onClick={addAllSaved} className="px-4 py-2 bg-accent/10 text-accent rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent/20 transition-all">
                      Add All ({savedContacts.length})
                    </button>
                  )}
                </div>

                {loadingSaved ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Fetching data...</p>
                  </div>
                ) : savedContacts.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
                    <History size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="text-muted-foreground font-medium italic">No previous contacts found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {savedContacts.map((email) => {
                      const isAdded = campaign.contacts.includes(email);
                      return (
                        <div key={email} className={`p-4 rounded-2xl border transition-all flex items-center justify-between group/item
                          ${isAdded ? "bg-primary/5 border-primary/20" : "bg-secondary/50 border-border hover:border-primary/30"}
                        `}>
                          <span className="text-sm font-bold truncate pr-2">{email}</span>
                          <button
                            disabled={isAdded}
                            onClick={() => addFromSaved(email)}
                            className={`p-2 rounded-lg transition-all ${isAdded ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
                          >
                            {isAdded ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Contacts Table */}
        {campaign.contacts.length > 0 && (
          <div className="space-y-6 animate-in fade-in duration-1000">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-foreground tracking-tighter">Selected Audience</h3>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                  {campaign.contacts.length} Unique {campaign.contacts.length === 1 ? 'Contact' : 'Contacts'}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={storeContact}
                  className="px-6 py-3 bg-secondary text-foreground rounded-2xl font-bold text-sm border border-border hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2"
                >
                  Save to Database
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-muted-foreground">Index</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {campaign.contacts.map((email, i) => (
                      <tr key={email} className="group hover:bg-primary/[0.02] transition-colors">
                        <td className="px-8 py-5 text-sm font-bold text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{email}</span>
                        </td>
                        <td className="px-8 py-5 text-right font-medium">
                          <button
                            onClick={() => removeEmail(email)}
                            className="p-3 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/5 rounded-xl"
                            title="Remove contact"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center pt-10 pb-20">
              <button 
                onClick={() => navigate("/campaign/type")}
                className="group px-12 py-5 bg-primary text-primary-foreground rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-4"
              >
                Proceed to Campaign Type
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </CampaignLayout>
  );
};

export default ImportContacts;

const MethodCard = ({ title, icon: Icon, onClick, active, disabled }) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`relative group p-6 rounded-[24px] text-center cursor-pointer transition-all duration-500 border-2 overflow-hidden
        ${active 
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-105 active-method" 
          : "border-border bg-card/50 hover:border-primary/30 hover:bg-secondary/50 hover:scale-102"}
        ${disabled ? "opacity-20 cursor-not-allowed filter grayscale" : ""}
      `}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500
        ${active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 rotate-12" : "bg-secondary text-muted-foreground group-hover:text-primary border border-border"}
      `}>
        <Icon size={22} />
      </div>
      <p className={`text-sm font-black uppercase tracking-widest transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
        {title}
      </p>
      
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
          <span className="bg-background/80 px-2 py-0.5 rounded-full text-[8px] font-black border border-border uppercase tracking-widest">Locked</span>
        </div>
      )}
    </div>
  );
};
