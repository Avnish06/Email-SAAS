import { useLocation, useNavigate } from "react-router-dom";
import { 
  Type, 
  Users, 
  Layout, 
  PenTool, 
  Layers, 
  Send,
  CheckCircle2
} from "lucide-react";

const steps = [
  { label: "Campaign Name", path: "/campaign/new", icon: Type },
  { label: "Import Contacts", path: "/campaign/contacts", icon: Users },
  { label: "Select Type", path: "/campaign/type", icon: Layout },
  { label: "Write Mail", path: "/campaign/write", icon: PenTool },
  { label: "Editor", path: "/campaign/editor", icon: Layers },
  { label: "Preview & Send", path: "/campaign/preview", icon: Send },
];

const CampaignSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find current step index
  const currentStepIndex = steps.findIndex(step => location.pathname === step.path);

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase italic">
          Setup
        </h2>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
          Campaign Wizard
        </p>
      </div>

      <div className="relative space-y-2">
        {/* Vertical Line Connector */}
        <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-border z-0" />

        <ul className="space-y-4 relative z-10">
          {steps.map((step, index) => {
            const isActive = location.pathname === step.path;
            const isCompleted = index < currentStepIndex;
            const Icon = step.icon;

            return (
              <li
                key={index}
                onClick={() => navigate(step.path)}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Step Indicator Dot/Icon */}
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border-2
                      ${isActive 
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-110" 
                        : isCompleted 
                        ? "bg-accent/10 text-accent border-accent/20" 
                        : "bg-card text-muted-foreground border-border group-hover:border-primary/50"
                      }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="flex flex-col">
                    <span className={`text-xs font-black uppercase tracking-widest transition-colors
                      ${isActive ? "text-primary" : isCompleted ? "text-accent" : "text-muted-foreground/50"}
                    `}>
                      Step 0{index + 1}
                    </span>
                    <span className={`text-sm font-bold transition-all
                      ${isActive ? "text-foreground scale-105" : "text-muted-foreground group-hover:text-foreground"}
                    `}>
                      {step.label}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto pt-10">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status</p>
          <p className="text-xs text-muted-foreground leading-relaxed text-[11px]">
            Your progress is automatically saved as you navigate through the wizard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignSteps;
