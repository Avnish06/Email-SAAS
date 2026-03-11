import CampaignSteps from "../components/CampaignSteps";
import React, { useState } from "react";

const CampaignLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen pt-16 bg-background text-foreground overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* SIDEBAR TOGGLE BUTTON - ChatGPT Style */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-[84px] z-[110] p-1.5 text-muted-foreground/60 hover:text-foreground hover:bg-secondary/80 rounded-lg transition-all duration-300 hidden lg:flex items-center group shadow-sm ${
          isSidebarOpen ? "left-[284px]" : "left-6"
        }`}
        title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform duration-500"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" className={`transition-all duration-500 ${isSidebarOpen ? "opacity-100" : "opacity-40"}`} />
            <path 
              d={isSidebarOpen ? "M14 9l-3 3 3 3" : "M11 9l3 3-3 3"} 
              className="transition-all duration-500 opacity-0 group-hover:opacity-100"
            />
          </svg>
        </div>
      </button>

      {/* LEFT SIDEBAR - PROGRESS TRACKER */}
      <aside 
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] border-r border-border bg-card/30 backdrop-blur-xl z-20 hidden lg:block overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-80 opacity-100" : "w-0 opacity-0 -translate-x-full"
        }`}
      >
        <div className="w-80">
           <CampaignSteps />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main 
        className={`flex-1 relative z-10 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-80" : "lg:pl-0"
        }`}
      >
        <div className="max-w-5xl mx-auto p-8 md:p-12 min-h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CampaignLayout;
