import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../Context/userContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { Zap, Clock, X, User, Mail, Phone, Calendar, Edit2, LogOut, Shield, ChevronDown } from "lucide-react";

const brandLogo = "/Modern tech logo on blue background.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useDetails();
  const [trialDaysLeft, setTrialDaysLeft] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const trialStartDate = localStorage.getItem("trialStartDate");
    if (trialStartDate) {
      const start = new Date(trialStartDate);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const remaining = Math.max(0, 3 - diffDays);
      setTrialDaysLeft(remaining);

      const isDismissed = sessionStorage.getItem("trialBannerDismissed");
      if (!isDismissed) {
        setShowBanner(true);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("trialBannerDismissed", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col w-full">
      {/* Trial Countdown Banner */}
      {trialDaysLeft !== null && user && showBanner && (
        <div className="bg-gradient-to-r from-primary via-accent to-primary text-white py-2 px-4 shadow-sm text-center text-xs font-bold tracking-wider relative z-[110] flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Clock size={14} className="animate-pulse" />
            <span>FREE TRIAL ENDS IN {trialDaysLeft} DAYS</span>
            <button 
              onClick={() => navigate("/pricing")}
              className="ml-4 px-3 py-1 bg-white text-primary rounded-full hover:bg-opacity-90 transition-all flex items-center gap-1"
            >
              <Zap size={10} fill="currentColor" />
              Upgrade Now
            </button>
          </div>
          <button 
            onClick={handleDismissBanner}
            className="absolute right-4 hover:opacity-70 transition-opacity"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="topbar w-full h-16 bg-background border-b border-border flex items-center backdrop-blur-md">
        <div className="container max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between">
          {/* Left: Brand */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="p-1 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/10 shadow-[0_0_18px_rgba(15,157,142,0.45)] ring-2 ring-primary/30 transition-all group-hover:shadow-[0_0_28px_rgba(15,157,142,0.7)] group-hover:ring-primary/60">
              <img
                src={brandLogo}
                alt="Colvo"
                className="h-11 w-11 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Center: Main nav */}
          <nav className="nav-main hidden md:flex items-center gap-8">
            {[
              { label: "Campaigns", path: "/campaigns" },
              { label: "Analytics", path: "/analytics" },
              { label: "Templates", path: "/campaign/templates" },
              { label: "Contacts", path: "/contacts" },
              { label: "Support", path: "/support" },
            ].map((item) => (
              <span
                key={item.label}
                onClick={() => navigate(item.path)}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </span>
            ))}
          </nav>

          {/* Right: Auth + Profile Dropdown */}
          <div className="nav-right flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Clickable Avatar */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center text-primary text-sm font-black transition-all group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(15,157,142,0.3)]">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Panel */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-[320px] bg-card border border-border rounded-[20px] shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[200]">
                    {/* User Info Header */}
                    <div className="px-6 pt-6 pb-5 bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center text-primary text-xl font-black shadow-lg">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-black text-foreground truncate">{user.name || "User"}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="px-6 py-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={14} className="text-primary shrink-0" />
                        <span className="text-muted-foreground truncate">{user.email || "Not set"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={14} className="text-primary shrink-0" />
                        <span className="text-muted-foreground">{user.phonenumber || "Not set"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={14} className="text-primary shrink-0" />
                        <span className="text-muted-foreground">
                          Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "Recently"}
                        </span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="border-t border-border">
                      <button
                        onClick={() => { setShowDropdown(false); navigate("/profile"); }}
                        className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-primary/5 transition-colors"
                      >
                        <Edit2 size={15} className="text-primary" />
                        Edit Profile
                      </button>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-colors border-t border-border"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="nav-pill px-5 py-1.5 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary/5 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="nav-pill nav-pill-filled px-6 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
            <div className="ml-2 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
