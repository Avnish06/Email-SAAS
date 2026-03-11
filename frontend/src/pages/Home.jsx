import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  Users,
  BarChart2,
  Mail,
  Send,
  Layout,
  PenTool,
  Shield,
  Sparkles,
  GitBranch,
  Play,
  Palette,
  Hexagon,
  ChevronRight,
  MousePointerClick,
  Plug,
  Triangle,
  Circle,
  Box,
  Layers,
  Tag,
  MessageSquare,
} from "lucide-react";
import { frontendTemplates } from "../data/templateData";
import brightPathImg from "../assets/templates/brightpath.png";
import colabImg from "../assets/templates/colab.png";
import finbankImg from "../assets/templates/finbank.png";
const brandLogo = "/Modern tech logo on blue background.png";

const features = [
  {
    title: "Visual Builder",
    icon: Sparkles,
    desc: "Drag and drop components to create stunning emails in minutes without writing code.",
  },
  {
    title: "Automation",
    icon: GitBranch,
    desc: "Set up complex workflows triggered by user behavior to send the right message at the right time.",
  },
  {
    title: "Segmentation",
    icon: Users,
    desc: "Target specific groups of users based on their attributes, activity, and purchase history.",
  },
  {
    title: "Analytics",
    icon: BarChart2,
    desc: "Track opens, clicks, and revenue attribution in real-time with our advanced dashboard.",
  },
  {
    title: "Delivery",
    icon: Zap,
    desc: "Ensure your emails land in the inbox, not the spam folder, with our optimized infrastructure.",
  },
  {
    title: "Integrations",
    icon: Plug,
    desc: "Connect with your favorite tools including CRM, CMS, and e-commerce platforms seamlessly.",
  },
];

const logos = [
  { icon: Hexagon, name: "Acme" },
  { icon: Triangle, name: "Vercel" },
  { icon: Circle, name: "Circle" },
  { icon: Box, name: "Dropbox" },
  { icon: Layers, name: "Layers" },
];

const workflowSteps = [
  {
    step: "Step 01",
    title: "Campaign Name",
    desc: "Start by defining your campaign identity. Set internal names and goals to keep your marketing efforts organized.",
    icon: Tag,
  },
  {
    step: "Step 02",
    title: "Import Contacts",
    desc: "Upload your audience list seamlessly. Support for CSV imports or direct integration with your existing CRM tools.",
    icon: Users,
  },
  {
    step: "Step 03",
    title: "Select Type",
    desc: "Choose the perfect format for your message. From regular newsletters to automated drip sequences or A/B tests.",
    icon: MousePointerClick,
  },
  {
    step: "Step 04",
    title: "Write Mail",
    desc: "Draft compelling subject lines and preview text. Ensure your message grabs attention right from the inbox.",
    icon: Mail,
  },
  {
    step: "Step 05",
    title: "Editor",
    desc: "Drag and drop components to create stunning emails in minutes without writing a single line of code.",
    icon: Sparkles,
  },
  {
    step: "Step 06",
    title: "Preview & Send",
    desc: "Test across devices, review your checklist, and schedule your campaign for the perfect delivery time.",
    icon: Send,
  },
];

const FeatureCard = ({ icon: Icon, title, desc }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="feature-card-modern group"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary/20 text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(15,157,142,0.3)] transition-all duration-300">
          <Icon size={24} className="animate-float" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 bg-background dark:bg-background">
      {/* ===== NAVBAR ===== */}


      {/* ===== HERO ===== */}
      <section className="relative pt-[160px] pb-24 overflow-hidden hero-horizontal-gradient">
        <div className="grid-bg opacity-[0.3] lg:opacity-[0.45]"></div>
        {/* Purged background blobs for clean look */}

        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          {/* Integrated Colvo Logo & Meta Badge */}
          <div className="inline-flex flex-col items-center gap-6 mb-12 group">
            {/* Highlighted Logo Section */}
            <div className="p-1.5 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/10 shadow-[0_0_35px_rgba(15,157,142,0.5)] ring-[3px] ring-primary/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(15,157,142,0.8)] group-hover:ring-primary/60 group-hover:scale-105">
              <img 
                src={brandLogo} 
                alt="Colvo" 
                className="h-28 w-28 object-cover rounded-full" 
              />
            </div>
            
            {/* Meta Info Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 animate-border-glow shadow-[0_0_20px_rgba(15,157,142,0.1)]">
              <img src="/image.png" alt="Meta" className="h-5 w-auto object-contain rounded-md" />
              <span className="text-accent text-[13px] font-bold tracking-wide">✓ Verified Meta Business Partners</span>
            </div>
          </div>

          {/* Big Bold Headline - matching WhatsApp style */}
          <h1 className="text-[56px] md:text-[64px] leading-[1.1] font-bold tracking-[-1.5px] mb-6 text-foreground">
            Send Smarter with <br />
            <span className="text-gradient">Intelligent Email Marketing</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-[540px] mx-auto mb-12 leading-relaxed">
            Create stunning campaigns, automate workflows, and track real
            revenue attribution with the world's most powerful engine.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <button
              className="btn-primary-glow flex items-center gap-2 group shadow-[0_0_30px_rgba(15,157,142,0.3)]"
              onClick={() => navigate("/campaign/new")}
            >
              Start Free Trial
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary-outline flex items-center gap-2">
              <Play size={14} /> Watch Demo
            </button>
          </div>

          <div>
            <p className="text-[12px] font-semibold tracking-[1px] text-muted-foreground mb-6">
              TRUSTED BY 10,000+ TEAMS
            </p>
            {/* Scrolling Logo Container */}
            <div className="relative overflow-hidden">
              <div className="flex gap-10 animate-scroll-logos">
                {/* First set of logos */}
                {logos.map(({ icon: Icon, name }, idx) => (
                  <div key={`${name}-1-${idx}`} className="flex items-center gap-3 text-lg font-bold text-foreground opacity-60 dark:opacity-20 hover:opacity-100 transition-opacity whitespace-nowrap">
                    <Icon size={18} /> {name}
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {logos.map(({ icon: Icon, name }, idx) => (
                  <div key={`${name}-2-${idx}`} className="flex items-center gap-3 text-lg font-bold text-foreground opacity-60 dark:opacity-20 hover:opacity-100 transition-opacity whitespace-nowrap">
                    <Icon size={18} /> {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES (3-ROW REDESIGN) ===== */}
      <section id="features" className="py-24 border-t border-border relative overflow-hidden bg-background">
        <div className="grid-bg opacity-[0.03] lg:opacity-[0.05]"></div>
        
        {/* Row 1: Visual Builder - Wrapped in Curved Container */}
        <div className="max-w-[1300px] mx-auto px-6 mb-24">
          <div className="bg-slate-100/70 dark:bg-white/5 border border-border rounded-[48px] p-8 lg:p-20 relative overflow-hidden">
            {/* Background Blobs for specific row */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-10">
                <div className="w-14 h-14 rounded-[18px] bg-white dark:bg-black/20 border border-border flex items-center justify-center text-primary shadow-sm">
                  <Sparkles size={28} className="animate-glow-pulse" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-5xl font-bold text-foreground tracking-tight">
                    Visual Email Builder
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-[500px]">
                    Drag and drop components to create stunning emails in minutes. No coding required. Perfect rendering across all devices and providers.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/campaign/new")}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                >
                  Try the Builder
                </button>
              </div>
              
              <div className="relative h-[400px] flex items-center justify-center group overflow-visible">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-40"></div>
                {/* High-fidelity CSS/SVG Network Visual - Enhanced for Vibrancy */}
                <div className="relative w-full h-full scale-110">
                  <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     <defs>
                      <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#10b981" /> 
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                      <filter id="glow-vibrant">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Central Hub */}
                    <g className="animate-pulse">
                      <circle cx="200" cy="150" r="50" fill="url(#hubGradient)" opacity="0.15" />
                      <circle cx="200" cy="150" r="4.5" fill="#10b981" filter="url(#glow-vibrant)" />
                    </g>
                    
                    {/* Connected Nodes */}
                    {[...Array(24)].map((_, i) => {
                      const x = 100 + Math.random() * 200;
                      const y = 80 + Math.random() * 140;
                      const greenShades = ["#0f9d8e", "#10b981", "#34d399", "#059669"];
                      const shade = greenShades[i % greenShades.length];
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="2.2" fill={shade} opacity="0.95" filter="url(#glow-vibrant)" />
                          {i % 3 === 0 && (
                            <line x1="200" y1="150" x2={x} y2={y} stroke={shade} strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
                          )}
                        </g>
                      );
                    })}
                    
                    {/* Floating Particles */}
                    {[...Array(60)].map((_, i) => {
                       const colors = ["#10b981", "#0f9d8e", "#6ee7b7", "#059669"];
                       return (
                        <circle 
                           key={`p-${i}`} 
                           cx={200 + (Math.random() - 0.5) * 340} 
                           cy={150 + (Math.random() - 0.5) * 240} 
                           r={0.8 + Math.random() * 1.5} 
                           fill={colors[i % colors.length]} 
                           opacity={0.3 + Math.random() * 0.6} 
                           className="animate-pulse"
                           style={{ animationDelay: `${Math.random() * 3}s` }}
                        />
                       );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Categorized Features (Bento) */}
        <div className="max-w-[1200px] mx-auto px-6 mb-40 grid md:grid-cols-2 gap-8">
          {/* Section 1: Automation & Logic */}
          <div className="glass-card rounded-[40px] p-12 space-y-10 group hover:border-primary/60 hover:standout-glow transition-all duration-700 shadow-2xl vibrant-aura">
            <h3 className="text-2xl font-bold text-foreground">Automation & Logic</h3>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(15,157,142,0.1)]">
                  <GitBranch size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Workflow Builder</h4>
                  <p className="text-muted-foreground leading-relaxed">Design complex user journeys and automated responses triggered by any event.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(15,157,142,0.1)]">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Smart Segmentation</h4>
                  <p className="text-muted-foreground leading-relaxed">Automatically group users based on their behavior, tags, and custom attributes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Insights & Scaling */}
          <div className="glass-card rounded-[40px] p-12 space-y-10 group hover:border-primary/60 hover:standout-glow transition-all duration-700 shadow-2xl vibrant-aura">
            <h3 className="text-2xl font-bold text-foreground">Insights & Scaling</h3>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(15,157,142,0.1)]">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Revenue Tracking</h4>
                  <p className="text-muted-foreground leading-relaxed">Measure the exact ROI of every campaign with deep e-commerce integrations.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(15,157,142,0.1)]">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Enterprise Security</h4>
                  <p className="text-muted-foreground leading-relaxed">Banks-grade encryption and SOC2 compliance to keep your customer data safe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Mobile & Delivery */}
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative group h-[550px] flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-30"></div>
              {/* Premium Phone Mockups (Actual Previews) */}
              <div className="relative flex items-center justify-center -space-x-20">
                  {/* Left Phone - Savvy Finance */}
                  <div className="w-[280px] h-[580px] bg-slate-50 border-[8px] border-border rounded-[48px] shadow-2xl relative z-10 rotate-[-8deg] group-hover:rotate-[-4deg] transition-transform duration-700 overflow-hidden">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-border rounded-b-[18px] z-20"></div>
                     {/* Miniaturized Template Content */}
                     <div className="absolute top-0 left-0 w-[800px] origin-top-left scale-[0.35] pointer-events-none p-8 bg-white min-h-[1650px]">
                        {frontendTemplates.find(t => t.id === "marketing-savvy-finance")?.blocks.map((block, idx) => (
                          <div key={idx} className="mb-6">
                            {block.type === "text" && (
                              <p style={{
                                fontSize: Math.max(block.data.size, 16) + "px",
                                color: block.data.color,
                                fontWeight: block.data.bold ? "700" : "400",
                                textAlign: block.data.align,
                                lineHeight: "1.4"
                              }}>
                                {block.data.text}
                              </p>
                            )}
                            {block.type === "image" && (
                              <img src={block.data.url} alt="" className="w-full rounded-3xl shadow-sm" />
                            )}
                            {block.type === "button" && (
                              <div className="text-center pt-2">
                                <span className="inline-block px-12 py-6 font-bold rounded-full shadow-lg" style={{ backgroundColor: block.data.bg, color: block.data.color, fontSize: "20px" }}>
                                  {block.data.text}
                                </span>
                              </div>
                            )}
                            {block.type === "divider" && (
                                <div style={{ height: block.data.height, backgroundColor: block.data.color, margin: "20px 0" }} />
                            )}
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Phone - FinBank */}
                  <div className="w-[280px] h-[580px] bg-slate-50 border-[8px] border-border rounded-[48px] shadow-2xl relative translate-y-16 rotate-[8deg] group-hover:rotate-[4deg] transition-transform duration-700 overflow-hidden">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-border rounded-b-[18px] z-20"></div>
                     {/* Miniaturized Template Content */}
                     <div className="absolute top-0 left-0 w-[800px] origin-top-left scale-[0.35] pointer-events-none p-8 bg-white min-h-[1650px]">
                        {frontendTemplates.find(t => t.id === "onboarding-finbank")?.blocks.map((block, idx) => (
                          <div key={idx} className="mb-6">
                            {block.type === "text" && (
                              <p style={{
                                fontSize: Math.max(block.data.size, 16) + "px",
                                color: block.data.color,
                                fontWeight: block.data.bold ? "700" : "400",
                                textAlign: block.data.align,
                                lineHeight: "1.4"
                              }}>
                                {block.data.text}
                              </p>
                            )}
                            {block.type === "image" && (
                              <img src={block.data.url} alt="" className="w-full rounded-2xl shadow-sm" />
                            )}
                            {block.type === "button" && (
                              <div className="text-center pt-2">
                                <span className="inline-block px-12 py-6 font-bold rounded-xl shadow-lg" style={{ backgroundColor: block.data.bg, color: block.data.color, fontSize: "20px" }}>
                                  {block.data.text}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                     </div>
                  </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-secondary border border-border flex items-center justify-center text-primary shadow-[0_0_25px_rgba(15,157,142,0.15)] shrink-0">
                    <Send size={32} className="animate-float" />
                  </div>
                  <h2 className="text-5xl font-bold text-foreground tracking-tight py-2">
                    Mobile Optimized Delivery
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-[500px]">
                  Send responsive emails that look perfect on any screen. Our engine handles all the complex HTML rendering so you can focus on the message.
                </p>
              </div>
              <div className="flex flex-wrap gap-5 pt-4">
                 <div className="flex items-center gap-3 text-foreground font-bold">
                    <Zap className="text-accent" size={20} />
                    <span>99.9% Inbox Placement</span>
                 </div>
                 <div className="flex items-center gap-3 text-foreground font-bold">
                    <Shield className="text-primary" size={20} />
                    <span>GDPR & CCPA Ready</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW ===== */}
      <section id="workflow" className="py-24 border-t border-primary/20 relative overflow-hidden">
        <div className="grid-bg opacity-[0.12] lg:opacity-[0.18]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Campaign Workflow</h2>
            <p className="text-lg text-muted-foreground">
              Create stunning email campaigns in minutes with our intuitive step-by-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((s) => (
              <div key={s.title} className="glass-card p-8 border-white/20 rounded-[32px] group hover:border-primary hover:standout-glow transition-all duration-300 vibrant-aura">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-primary bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(15,157,142,0.3)] transition-all duration-300 animate-glow-pulse">
                  <s.icon size={32} className="animate-float" />
                </div>
                <div className="space-y-4">
                  <span className="text-[12px] uppercase tracking-wider font-bold text-primary">
                    {s.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMPLATES COLLAGE (PREMIUM REDESIGN) ===== */}
      <section id="templates" className="py-24 overflow-hidden relative border-y border-border dark:bg-background">
        <div className="grid-bg opacity-[0.12] lg:opacity-[0.18]"></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <h2 className="text-[40px] md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Ready-to-use <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Templates</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Launch your campaigns in minutes with our high-converting designs. 
              Optimized for all devices and tested for maximum engagement.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-4 lg:gap-6 pb-12">
            
            {/* Left Template: BrightPath */}
            <div className="w-full max-w-[240px] transition-all duration-500 hover:-translate-y-4 hover:rotate-0 group order-2 md:order-1">
              <div className="overflow-hidden rounded-2xl shadow-2xl border border-border bg-card md:-rotate-3 group-hover:border-primary/30 transition-all duration-500">
                <div className="h-[320px] overflow-hidden">
                  <img 
                    src={brightPathImg} 
                    alt="BrightPath Template" 
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="font-bold text-foreground text-base">BrightPath</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mt-1">Non-profit</p>
                </div>
              </div>
            </div>

            {/* Center Template: Co-Lab (Featured Focus) */}
            <div className="w-full max-w-[260px] relative z-20 transition-all duration-500 hover:-translate-y-6 group order-1 md:order-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-1.5 z-30">
                <Zap size={10} fill="currentColor" />
                Most Popular
              </div>
              
              <div className="overflow-hidden rounded-2xl shadow-[0_40px_100px_-15px_rgba(15,157,142,0.15)] border-2 border-primary/30 bg-white dark:bg-card scale-100 md:scale-105 group-hover:border-primary transition-all duration-700">
                <div className="h-[360px] overflow-hidden">
                  <img 
                    src={colabImg} 
                    alt="Co-Lab Template" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 bg-muted/40 border-t border-border/50">
                  <p className="font-bold text-foreground text-lg">Co-Lab</p>
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mt-1">Modern Agency</p>
                </div>
              </div>
            </div>

            {/* Right Template: FinBank */}
            <div className="w-full max-w-[240px] transition-all duration-500 hover:-translate-y-4 hover:rotate-0 group order-3">
              <div className="overflow-hidden rounded-2xl shadow-2xl border border-border bg-card md:-rotate-3 group-hover:border-primary/30 transition-all duration-500">
                <div className="h-[320px] overflow-hidden">
                  <img 
                    src={finbankImg} 
                    alt="FinBank Template" 
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="font-bold text-foreground text-base">FinBank</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mt-1">Corporate Banking</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 text-center">
            <button className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/10 active:scale-95">
              Explore All 100+ Templates
            </button>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 border-t border-border bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="text-gradient text-4xl font-bold mb-4 text-balance">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground">
              Lock in founding member rates during early access
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Trial */}
            <div className="relative p-8 rounded-[24px] border border-border bg-card flex flex-col items-start text-start hover:border-primary/30 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Free Trial</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Perfect for testing the waters</p>
              </div>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">Free</span>
                <span className="text-muted-foreground text-sm font-medium">/3 days</span>
              </div>
              <div className="flex-1 space-y-4 mb-10 w-full">
                {["3-day full access trial","Create up to 5 campaigns","Import up to 100 contacts","Basic AI template generation","Standard support","No credit card required"].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap size={14} className="text-accent mt-0.5 shrink-0" fill="currentColor" />
                    <span className="text-sm text-foreground/80 leading-tight">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("trialStartDate", new Date().toISOString());
                  navigate("/campaign/new");
                }}
                className="w-full py-3.5 rounded-xl font-bold transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Start Free Trial
              </button>
            </div>

            {/* Monthly Plan */}
            <div className="relative p-8 rounded-[24px] border border-primary bg-card shadow-[0_0_50px_rgba(15,157,142,0.15)] flex flex-col items-start text-start">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Monthly Plan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Full access to all tools with flexible monthly billing</p>
              </div>
              <div className="mb-8 flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-muted-foreground line-through text-lg">₹829</span>
                  <span className="text-4xl font-bold text-foreground">₹499</span>
                  <span className="text-muted-foreground text-sm font-medium">/mo</span>
                </div>
              </div>
              <div className="flex-1 space-y-4 mb-10 w-full">
                {["All core tools included","Unlimited campaign creation","Unlimited contact import","Advanced AI features","Priority email support","Real-time analytics dashboard","Secure data encryption"].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap size={14} className="text-accent mt-0.5 shrink-0" fill="currentColor" />
                    <span className="text-sm text-foreground/80 leading-tight">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full py-3.5 rounded-xl font-bold transition-all bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20"
              >
                Get Started
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="relative p-8 rounded-[24px] border border-border bg-card flex flex-col items-start text-start hover:border-primary/30 transition-all">
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">Save 17%</span>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Yearly Plan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Best value — get 2 months free with yearly billing</p>
              </div>
              <div className="mb-8 flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-muted-foreground line-through text-lg">₹8,299</span>
                  <span className="text-4xl font-bold text-foreground">₹4,999</span>
                  <span className="text-muted-foreground text-sm font-medium">/yr</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">₹416 per month</p>
              </div>
              <div className="flex-1 space-y-4 mb-10 w-full">
                {["Everything in Monthly Plan","2 months free every year","Bulk message scheduling","Team collaboration tools","Early access to new features","Dedicated account manager","Advanced business API"].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap size={14} className="text-accent mt-0.5 shrink-0" fill="currentColor" />
                    <span className="text-sm text-foreground/80 leading-tight">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full py-3.5 rounded-xl font-bold transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="grid-bg opacity-[0.12] lg:opacity-[0.18]"></div>
        <div className="bg-gradient-cta"></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="cta-shell">
            <div className="glass-card cta-card p-16 rounded-[48px] border-white/20">
              <div className="logo-container">
                <img 
                  src={brandLogo} 
                  alt="Colvo" 
                  className="h-16 w-16 object-cover rounded-full shadow-md transition-all hover:scale-105" 
                />
              </div>
              <h2 className="cta-title">
                Start engaging your customers <span>today</span>
              </h2>
              <p className="cta-subtitle">
                Set up your first automated campaign in less than 5 minutes. No
                credit card required.
              </p>
              <div className="cta-button-wrapper-snip">
                <div 
                  className="cta-button-snip" 
                  onClick={() => navigate("/signup")}
                >
                  Get started for free
                  <iconify-icon
                    icon="lucide:arrow-right"
                    style={{ fontSize: "16px", color: "currentColor" }}
                  ></iconify-icon>
                </div>
                <div
                  className="cta-secondary-button-snip"
                  onClick={() => navigate("/pricing")}
                >
                  View pricing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

