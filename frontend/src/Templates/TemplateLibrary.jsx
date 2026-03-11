import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../Context/CampaignContext";
import { frontendTemplates } from "../data/templateData";
import { Zap, Sparkles, Search } from "lucide-react";
import logo from "../assets/logo.png";

export default function TemplateLibrary() {
  const navigate = useNavigate();
  const { setCampaign } = useCampaign();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= FILTER TEMPLATES ================= */

  const categories = [
    { name: "All", count: frontendTemplates.length },
    { name: "Modern", count: frontendTemplates.filter(t => t.category === "Modern").length },
    { name: "Marketing", count: frontendTemplates.filter(t => t.category === "Marketing").length },
    { name: "Newsletter", count: frontendTemplates.filter(t => t.category === "Newsletter").length },
    { name: "Announcement", count: frontendTemplates.filter(t => t.category === "Announcement").length },
    { name: "Onboarding", count: frontendTemplates.filter(t => t.category === "Onboarding").length },
    { name: "Transactional", count: frontendTemplates.filter(t => t.category === "Transactional").length },
    { name: "Event", count: frontendTemplates.filter(t => t.category === "Event").length },
  ];

  const filteredTemplates = frontendTemplates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ================= HANDLERS ================= */

  const handleSelectTemplate = (template) => {
    setCampaign((prev) => ({
      ...prev,
      templateId: template.id,
      templateName: template.name,
      subject: template.name,
      blocks: template.blocks,
    }));
    navigate("/campaign/editor");
  };

  const handleStartFromScratch = () => {
    setCampaign((prev) => ({
      ...prev,
      templateId: null,
      templateName: "Blank Template",
      subject: "",
      blocks: [],
    }));
    navigate("/campaign/editor");
  };

  /* ================= UI ================= */

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-black font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border flex flex-col shadow-sm">
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all group-hover:scale-105 group-hover:rotate-3 overflow-hidden shadow-sm border border-border/50">
              <img src={logo} alt="Colvo" className="w-8 h-8 object-contain rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Colvo</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-4">
            <h3 className="px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-4">
              Explore Templates
            </h3>
          </div>
          <nav className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                  selectedCategory === cat.name
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${selectedCategory === cat.name ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all"
          >
            <span className="text-lg">←</span> Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content Area — Floating Island Design */}
      <main className="flex-1 flex flex-col overflow-hidden m-4 ml-0 bg-white dark:bg-card border border-border rounded-[40px] shadow-2xl relative">
        {/* Top Bar — Rounded Top */}
        <header className="h-20 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 rounded-t-[40px]">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Template Gallery</h1>
            <p className="text-sm text-muted-foreground font-medium">Select a premium starting point</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search premium templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 w-72 bg-secondary border border-border rounded-xl text-sm text-foreground focus:ring-2 focus:ring-primary focus:bg-background transition-all outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button 
              onClick={handleStartFromScratch} 
              className="h-11 px-6 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>+</span> Blank Canvas
            </button>
          </div>
        </header>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Featured AI Section */}
          <div className="mb-12 relative rounded-3xl overflow-hidden p-8 flex items-center justify-between bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider">New AI Integration</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Generate custom templates with Magic AI</h2>
              <p className="opacity-80 text-base mb-8 leading-relaxed">
                Describe your campaign goal and our AI will craft a high-converting layout in seconds. 
                Save time and launch faster.
              </p>
              <button 
                onClick={() => navigate("/campaign/editor")}
                className="h-12 px-8 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all active:scale-95 shadow-xl"
              >
                Try Magic AI →
              </button>
            </div>
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-full animate-pulse group-hover:bg-white/20 transition-all"></div>
              <img src={logo} alt="Colvo" className="w-40 h-40 object-contain opacity-20 group-hover:opacity-40 transition-opacity rounded-full bg-white/5 overflow-hidden" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground">
              {selectedCategory === "All" ? "All Premium Templates" : `${selectedCategory} Templates`}
            </h3>
            <div className="h-[2px] flex-1 mx-6 bg-border"></div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group relative flex flex-col bg-card rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Preview Container — Real Content */}
                <div className="aspect-[4/5] overflow-hidden relative border-b border-border bg-white">
                  {/* Actual scaled-down email preview */}
                  <div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
                    <div className="origin-top-left scale-[0.32] w-[312.5%]">
                      <div className="p-8 space-y-4">
                        {template.blocks.slice(0, 6).map((block, idx) => (
                          <div key={idx}>
                            {block.type === "text" && (
                              <p style={{
                                fontSize: block.data.size,
                                color: block.data.color,
                                fontWeight: block.data.bold ? "700" : "400",
                                fontStyle: block.data.italic ? "italic" : "normal",
                                textDecoration: block.data.underline ? "underline" : "none",
                                textAlign: block.data.align,
                                lineHeight: "1.4",
                                margin: 0,
                                whiteSpace: "pre-line",
                              }}>
                                {block.data.text}
                              </p>
                            )}
                            {block.type === "image" && (
                              <img
                                src={block.data.url}
                                alt=""
                                loading="lazy"
                                style={{
                                  width: `${block.data.width}%`,
                                  borderRadius: block.data.radius,
                                  display: "block",
                                  margin: "0 auto",
                                  objectFit: "cover",
                                  maxHeight: 320,
                                }}
                              />
                            )}
                            {block.type === "button" && (
                              <div style={{ textAlign: "center" }}>
                                <span style={{
                                  display: "inline-block",
                                  padding: "14px 32px",
                                  backgroundColor: block.data.bg,
                                  color: block.data.color,
                                  borderRadius: block.data.radius,
                                  fontWeight: 700,
                                  fontSize: 15,
                                }}>
                                  {block.data.text}
                                </span>
                              </div>
                            )}
                            {block.type === "divider" && (
                              <hr style={{
                                height: block.data.height,
                                backgroundColor: block.data.color,
                                border: "none",
                              }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fade overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent"></div>

                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm shadow-md flex items-center justify-center group-hover:scale-110 transition-all border border-border z-10 p-2 overflow-hidden">
                    <img src={logo} alt="Colvo" className="w-full h-full object-contain rounded-full" />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg">
                      {template.category}
                    </span>
                    {template.category === "Modern" && (
                      <span className="flex items-center gap-1 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                         <Sparkles size={10} /> Hot
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                   <div className="bg-foreground text-background px-6 py-3 rounded-xl font-bold shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                      Use Template
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-32 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No templates found</h3>
              <p className="text-muted-foreground font-medium">
                Try adjusting your search or filter criteria. We're adding new designs weekly!
              </p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-8 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
