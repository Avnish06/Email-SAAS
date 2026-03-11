import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../Context/CampaignContext";
import { v4 as uuid } from "uuid";
import CampaignLayout from "../layouts/CampaignLayout";
import React from "react";
import axios from "axios";
import { 
  Sparkles, 
  Loader2, 
  Type, 
  Image as ImageIcon, 
  Columns, 
  Minus, 
  Trash2, 
  GripVertical,
  ChevronRight,
  Settings,
  Smartphone,
  MousePointer2,
  Save,
  Wand2
} from "lucide-react";

const Editor = () => {
  const { campaign, setCampaign } = useCampaign();
  const navigate = useNavigate();

  const createFirstBlock = () => {
    if (campaign.content) {
      return [
        {
          id: uuid(),
          type: "text",
          data: {
            text: campaign.content,
            size: 16,
            color: "var(--foreground)",
            align: "left",
            bold: false,
            italic: false,
            underline: false,
          },
        },
      ];
    }
    return [
      {
        id: uuid(),
        type: "text",
        data: {
          text: "Start writing your email here...",
          size: 16,
          color: "var(--foreground)",
          align: "left",
          bold: false,
          italic: false,
          underline: false,
        },
      },
    ];
  };

  const [blocks, setBlocks] = useState([]);
  const [dragId, setDragId] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (campaign.blocks && campaign.blocks.length > 0) {
      setBlocks(campaign.blocks);
    } else {
      setBlocks(createFirstBlock());
    }
  }, []);

  useEffect(() => {
    setCampaign({ ...campaign, blocks });
  }, [blocks]);

  const addBlock = (type) => {
    const block = { id: uuid(), type, data: getDefault(type) };
    setBlocks((prev) => [...prev, block]);
  };

  const getDefault = (type) => {
    switch (type) {
      case "text": return { text: "Write something...", size: 16, color: "var(--foreground)", align: "left", bold: false, italic: false, underline: false };
      case "image": return { url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809", width: 100, radius: 16 };
      case "button": return { text: "Get Started", link: "#", bg: "var(--primary)", color: "#ffffff", radius: 12 };
      case "divider": return { height: 1, color: "var(--border)" };
      default: return {};
    }
  };

  const update = (id, data) => setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, data } : b)));
  const remove = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));
  const onDragStart = (id) => setDragId(id);
  const onDrop = (id) => {
    if (!dragId) return;
    const from = blocks.findIndex((b) => b.id === dragId);
    const to = blocks.findIndex((b) => b.id === id);
    if (from === -1 || to === -1) return;
    const arr = [...blocks];
    const temp = arr[from];
    arr.splice(from, 1);
    arr.splice(to, 0, temp);
    setBlocks(arr);
    setDragId(null);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const { data } = await axios.post("http://localhost:8001/api/v1/ai/generate", { prompt: aiPrompt });
      if (data.success) {
        setBlocks(data.blocks);
        setIsAIModalOpen(false);
        setAiPrompt("");
      }
    } catch (error) {
      console.error("AI Generation failed", error);
      toast.error("Failed to generate template.");
    } finally { setIsGenerating(false); }
  };

  return (
    <CampaignLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Top Header */}
        <div className="flex items-center justify-between py-6 animate-in slide-in-from-top-4 duration-500">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">
              Designer
            </h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              Visual Email Builder
            </p>
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={() => setIsAIModalOpen(true)}
              className="px-6 py-3 bg-accent/10 text-accent border border-accent/20 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-accent/20 transition-all"
            >
              <Wand2 size={16} /> Magic AI
            </button>
            <button
              onClick={() => navigate("/campaign/preview")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all"
            >
              Preview & Send <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
          {/* Left: Designer Tools */}
          <div className="lg:col-span-7 flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar animate-in fade-in slide-in-from-left-8 duration-700">
            {/* Toolbar */}
            <div className="bg-card border border-border p-4 rounded-[28px] sticky top-0 z-20 backdrop-blur-xl shadow-xl flex flex-wrap gap-2">
              <Tool icon={Type} label="Text" onClick={() => addBlock("text")} />
              <Tool icon={ImageIcon} label="Image" onClick={() => addBlock("image")} />
              <Tool icon={MousePointer2} label="Button" onClick={() => addBlock("button")} />
              <Tool icon={Minus} label="Divider" onClick={() => addBlock("divider")} />
            </div>

            {/* Subject Input */}
            <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">
                Campaign Subject Line
              </label>
              <input
                value={campaign.subject}
                onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
                className="w-full bg-transparent text-xl font-black text-foreground border-b-2 border-border focus:border-primary outline-none py-2 transition-all"
                placeholder="Enter Subject..."
              />
            </div>

            {/* Designer Canvas */}
            <div className="space-y-4">
              {blocks.map((b) => (
                <div
                  key={b.id}
                  draggable
                  onDragStart={() => onDragStart(b.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(b.id)}
                  className="group relative"
                >
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all cursor-grab active:cursor-grabbing text-muted-foreground">
                    <GripVertical size={20} />
                  </div>
                  <Block block={b} update={update} remove={remove} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Real-time Preview */}
          <div className="lg:col-span-5 flex items-start justify-center animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="sticky top-0 w-full max-w-[400px]">
               <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/50 rounded-full w-fit mx-auto border border-border">
                <Smartphone size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Mobile Preview</span>
              </div>
              <MobilePreview blocks={blocks} />
            </div>
          </div>
        </div>

        {/* AI Modal */}
        {isAIModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setIsAIModalOpen(false)} />
            <div className="bg-card w-full max-w-xl rounded-[40px] border border-border shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[32px] bg-accent/20 text-accent flex items-center justify-center shadow-2xl shadow-accent/20">
                    <Sparkles size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-foreground tracking-tighter">AI Magic Designer</h3>
                    <p className="text-muted-foreground text-sm font-medium">Describe your email goal and let AI build the template.</p>
                  </div>
                </div>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., A sleek black-friday newsletter with a big discount banner and a countdown vibe..."
                  className="w-full h-40 bg-background border-2 border-border p-6 rounded-[24px] focus:border-accent outline-none transition-all resize-none text-foreground font-bold"
                />
                <div className="flex gap-4">
                  <button onClick={() => setIsAIModalOpen(false)} className="flex-1 h-16 rounded-[24px] border-2 border-border font-black text-sm uppercase tracking-widest hover:bg-secondary transition-all">Cancel</button>
                  <button onClick={handleAIGenerate} disabled={isGenerating || !aiPrompt} className="flex-[2] h-16 rounded-[24px] bg-accent text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-accent/20">
                    {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
                    {isGenerating ? "Working Magic..." : "Generate Template"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CampaignLayout>
  );
};

const Tool = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/50 text-foreground border border-border hover:border-primary hover:bg-primary/10 transition-all font-black text-[10px] uppercase tracking-widest">
    <Icon size={16} className="text-primary" />
    {label}
  </button>
);

const Block = ({ block, update, remove }) => {
  const d = block.data;
  return (
    <div className="bg-card border border-border rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary border border-border">
            {block.type === 'text' && <Type size={14} />}
            {block.type === 'image' && <ImageIcon size={14} />}
            {block.type === 'button' && <MousePointer2 size={14} />}
            {block.type === 'divider' && <Minus size={14} />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{block.type} Block</span>
        </div>
        <button onClick={() => remove(block.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
          <Trash2 size={16} />
        </button>
      </div>

      {block.type === "text" && (
        <div className="space-y-4">
          <textarea
            value={d.text}
            onChange={(e) => update(block.id, { ...d, text: e.target.value })}
            className="w-full bg-background border border-border p-4 rounded-xl text-foreground focus:border-primary outline-none font-bold text-lg resize-none min-h-[100px]"
          />
          <div className="flex flex-wrap gap-4 items-center bg-secondary/30 p-3 rounded-2xl border border-border">
            <input type="number" value={d.size} onChange={(e) => update(block.id, { ...d, size: +e.target.value })} className="w-14 bg-transparent font-black text-xs text-center border-r border-border outline-none" />
            <input type="color" value={d.color} onChange={(e) => update(block.id, { ...d, color: e.target.value })} className="w-6 h-6 rounded-full overflow-hidden border-none pointer-events-auto cursor-pointer" />
            <select value={d.align} onChange={(e) => update(block.id, { ...d, align: e.target.value })} className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none">
              <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
            </select>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <FormatBtn active={d.bold} label="B" onClick={() => update(block.id, { ...d, bold: !d.bold })} />
            <FormatBtn active={d.italic} label="I" onClick={() => update(block.id, { ...d, italic: !d.italic })} italic />
            <FormatBtn active={d.underline} label="U" onClick={() => update(block.id, { ...d, underline: !d.underline })} underline />
          </div>
        </div>
      )}

      {block.type === "image" && (
        <div className="space-y-4">
          <div className="relative">
            <input value={d.url} onChange={(e) => update(block.id, { ...d, url: e.target.value })} className="w-full bg-background border border-border p-4 pr-12 rounded-xl text-foreground font-bold outline-none focus:border-primary" placeholder="Image URL..." />
            <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 p-4 rounded-xl border border-border space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Width: {d.width}%</label>
              <input type="range" min="20" max="100" value={d.width} onChange={(e) => update(block.id, { ...d, width: +e.target.value })} className="w-full accent-primary" />
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl border border-border space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Radius: {d.radius}px</label>
              <input type="range" min="0" max="40" value={d.radius} onChange={(e) => update(block.id, { ...d, radius: +e.target.value })} className="w-full accent-primary" />
            </div>
          </div>
        </div>
      )}

      {block.type === "button" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input value={d.text} onChange={(e) => update(block.id, { ...d, text: e.target.value })} className="flex-1 bg-background border border-border p-4 rounded-xl text-foreground font-bold outline-none focus:border-primary" placeholder="Label..." />
            <input value={d.link} onChange={(e) => update(block.id, { ...d, link: e.target.value })} className="flex-1 bg-background border border-border p-4 rounded-xl text-foreground font-bold outline-none focus:border-primary" placeholder="URL..." />
          </div>
          <div className="flex gap-4 items-center bg-secondary/30 p-4 rounded-xl border border-border">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Colors</span>
            <input type="color" value={d.bg} onChange={(e) => update(block.id, { ...d, bg: e.target.value })} className="w-8 h-8 rounded-lg overflow-hidden border-none cursor-pointer" />
            <input type="color" value={d.color} onChange={(e) => update(block.id, { ...d, color: e.target.value })} className="w-8 h-8 rounded-lg overflow-hidden border-none cursor-pointer" />
            <div className="h-6 w-[1px] bg-border mx-2" />
             <div className="flex-1 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Radius: {d.radius}px</label>
              <input type="range" min="0" max="32" value={d.radius} onChange={(e) => update(block.id, { ...d, radius: +e.target.value })} className="w-full accent-primary" />
            </div>
          </div>
        </div>
      )}

      {block.type === "divider" && (
        <div className="flex gap-4 items-center bg-secondary/30 p-4 rounded-xl border border-border w-full max-w-sm">
           <div className="flex-1 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Thickness: {d.height}px</label>
              <input type="range" min="1" max="10" value={d.height} onChange={(e) => update(block.id, { ...d, height: +e.target.value })} className="w-full accent-primary" />
            </div>
            <input type="color" value={d.color} onChange={(e) => update(block.id, { ...d, color: e.target.value })} className="w-10 h-10 rounded-xl overflow-hidden border-none cursor-pointer" />
        </div>
      )}
    </div>
  );
};

const FormatBtn = ({ active, label, onClick, italic, underline }) => (
  <button onClick={onClick} className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center transition-all ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"} ${italic ? "italic" : ""} ${underline ? "underline" : ""}`}>
    {label}
  </button>
);

const MobilePreview = ({ blocks }) => (
  <div className="relative w-[340px] h-[680px] bg-[#111111] rounded-[60px] border-[10px] border-[#222222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden scale-90 sm:scale-100">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-[#222222] rounded-b-3xl z-40" />
    <div className="absolute top-0 left-0 w-full h-full p-4 pt-12 overflow-y-auto bg-white custom-scrollbar-thin">
      <div className="space-y-6">
        {blocks.map((b) => {
          const d = b.data;
          return (
            <div key={b.id}>
              {b.type === "text" && (
                <p style={{ fontSize: d.size, color: d.color, fontWeight: d.bold ? "700" : "400", fontStyle: d.italic ? "italic" : "normal", textDecoration: d.underline ? "underline" : "none", textAlign: d.align, lineHeight: "1.6" }}>
                  {d.text}
                </p>
              )}
              {b.type === "image" && <img src={d.url} style={{ width: `${d.width}%`, borderRadius: d.radius }} className="mx-auto" alt="" />}
              {b.type === "button" && (
                <div className="text-center">
                  <a href={d.link} style={{ backgroundColor: d.bg, color: d.color, borderRadius: d.radius }} className="inline-block px-8 py-3 text-sm font-bold shadow-md hover:brightness-110 transition-all">
                    {d.text}
                  </a>
                </div>
              )}
              {b.type === "divider" && <hr style={{ height: d.height, backgroundColor: d.color, border: "none" }} />}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Editor;
