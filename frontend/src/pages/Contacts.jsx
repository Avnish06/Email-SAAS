import React, { useState } from "react";
import { useCampaign } from "../Context/CampaignContext";
import axios from "axios";
import * as XLSX from "xlsx";
import { AppUrl } from "../App";
import { toast } from "react-toastify";
import { 
  UserPlus, 
  FileSpreadsheet, 
  Building2, 
  Factory, 
  History, 
  Trash2, 
  Mail, 
  UploadCloud, 
  Info,
  CheckCircle,
  Plus,
  ArrowRight
} from "lucide-react";

const Contacts = () => {
  const { campaign, setCampaign } = useCampaign();
  const [method, setMethod] = useState("manual");
  const [manualEmail, setManualEmail] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isStoring, setIsStoring] = useState(false);
  
  const storeContact = async () => {
    try {
      if (campaign.contacts.length === 0) {
        toast.error("No contacts to save.");
        return;
      }
      setIsStoring(true);
      const response = await axios.post(
        AppUrl + "/contactinfo/contactdetails",
        { contact: campaign.contacts },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to store contacts.");
    } finally {
      setIsStoring(false);
    }
  };

  const addManual = () => {
    if (!manualEmail) return;
    if (!manualEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (campaign.contacts.includes(manualEmail)) {
      toast.error("This email is already in your list.");
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
        .map((row) => row.Email || row.email || row.E-mail)
        .filter(Boolean);
      if (!emails.length) {
        toast.error("No email columns found in file.");
        return;
      }
      const merged = [...new Set([...campaign.contacts, ...emails])];
      setCampaign({ ...campaign, contacts: merged });
      toast.success(`Imported ${emails.length} contacts!`);
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
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20 shadow-xl shadow-primary/5">
            <UserPlus size={28} />
          </div>
          <h1 className="text-5xl font-black text-foreground tracking-tighter">
            Build your <span className="text-gradient">audience</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Import contacts via multiple methods to start your marketing campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Import Methods */}
          <div className="lg:col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <MethodCard
                title="Manual Entry"
                icon={UserPlus}
                active={method === "manual"}
                onClick={() => setMethod("manual")}
                color="text-primary"
              />
              <MethodCard
                title="Excel / CSV"
                icon={FileSpreadsheet}
                active={method === "excel"}
                onClick={() => setMethod("excel")}
                color="text-accent"
              />
              <MethodCard icon={Building2} title="CRM Sync" disabled />
              <MethodCard icon={Factory} title="ERP Import" disabled />
              <MethodCard icon={History} title="Previous List" disabled />
            </div>

            {/* Dynamic Content Card */}
            <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px]">
              {method === "manual" && (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 max-w-2xl">
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black text-foreground tracking-tight">Manual Import</h3>
                     <p className="text-muted-foreground font-medium">Add individual contacts by entering their email address below.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 p-2 bg-secondary/30 rounded-[28px] border border-border">
                    <input
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1 bg-transparent border-none px-6 py-4 rounded-2xl text-foreground text-lg font-bold outline-none focus:ring-0 placeholder:text-muted-foreground/30"
                      onKeyPress={(e) => e.key === 'Enter' && addManual()}
                    />
                    <button
                      onClick={addManual}
                      className="px-10 h-14 bg-primary text-primary-foreground rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add Contact
                    </button>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
                    <Info size={18} className="text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      Emails are automatically deduplicated. You can also press <span className="text-foreground font-bold">Enter</span> to add quickly.
                    </p>
                  </div>
                </div>
              )}

              {method === "excel" && (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto text-center">
                   <div className="space-y-4">
                     <h3 className="text-2xl font-black text-foreground tracking-tight">Bulk Upload</h3>
                     <p className="text-muted-foreground font-medium">Upload an Excel or CSV file containing your contact list.</p>
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`group relative border-4 border-dashed rounded-[40px] py-20 px-10 transition-all duration-500 flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden ${
                      dragging
                        ? "border-primary bg-primary/10 scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-secondary/20"
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <UploadCloud size={48} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-foreground">Drop your file here</p>
                      <p className="text-sm text-muted-foreground font-medium">Supports .XLSX, .XLS, and .CSV</p>
                    </div>
                    
                    <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} hidden id="bulk-upload" />
                    <label htmlFor="bulk-upload" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:brightness-110 shadow-xl shadow-primary/20 transition-all">
                      Browse Files
                    </label>

                    {dragging && <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] pointer-events-none" />}
                  </div>
                </div>
              )}

              {/* Success Badge fixed in bottom right if contacts added */}
              {campaign.contacts.length > 0 && (
                <div className="absolute bottom-8 right-8 animate-in slide-in-from-right-8 duration-500">
                   <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl shadow-primary/20 border border-primary/50">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">Contacts Loaded</p>
                        <p className="text-xl font-black leading-none">{campaign.contacts.length}</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Contact List Table */}
          {campaign.contacts.length > 0 && (
            <div className="lg:col-span-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary border border-border"><Mail size={20} /></span>
                    Review Recipients
                  </h3>
                  <button 
                    disabled={isStoring}
                    onClick={storeContact}
                    className="px-10 h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-3"
                  >
                    {isStoring ? "Storing..." : "Add to Database"} <ArrowRight size={18} />
                  </button>
               </div>

               <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-xl">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-secondary/30 border-b border-border">
                         <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground w-20 text-center">#</th>
                         <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Email Address</th>
                         <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                         <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground w-40">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50">
                        {campaign.contacts.map((email, i) => (
                           <tr key={email} className="group hover:bg-secondary/20 transition-colors">
                              <td className="py-4 px-8 text-center font-black text-muted-foreground/30">{String(i + 1).padStart(2, '0')}</td>
                              <td className="py-4 px-4 font-black text-foreground">{email}</td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Ready</span>
                              </td>
                              <td className="py-4 px-8 text-right">
                                <button 
                                  onClick={() => removeEmail(email)}
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all ml-auto"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MethodCard = ({ title, icon: Icon, onClick, active, disabled, color }) => (
  <button
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    className={`relative group border-[3px] rounded-[32px] p-6 text-center transition-all duration-500 overflow-hidden flex flex-col items-center gap-3 ${
      active
        ? `border-primary bg-primary/5 shadow-2xl shadow-primary/10 scale-[1.02]`
        : `border-border hover:border-primary/40 hover:bg-secondary bg-card`
    } ${disabled ? "opacity-30 cursor-not-allowed grayscale" : ""}`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-1 transition-all duration-500 shadow-xl ${active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground group-hover:text-primary group-hover:scale-110 border border-border group-hover:border-primary/20"}`}>
       <Icon size={28} />
    </div>
    <span className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
      {title}
    </span>
    {disabled && (
      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-auto">Soon</span>
    )}
    {active && (
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse" />
    )}
  </button>
);

export default Contacts;
