import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { 
  Mail, 
  Lock, 
  LogIn, 
  ArrowRight, 
  Eye, 
  EyeOff,
  ShieldCheck
} from "lucide-react";

import { useDetails } from "../Context/userContext";
import { AppUrl } from "../App";
import { auth, provider } from "../../utils/firebase";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useDetails();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${AppUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Welcome back! ✅");
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email: googleEmail, photoURL, uid } = result.user;
      const res = await axios.post(
        `${AppUrl}/auth/google`,
        { name: displayName, email: googleEmail, photoURL, googleId: uid },
        { withCredentials: true }
      );
      toast.success("Signed in with Google! ✅");
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error?.response?.data?.message || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden py-20">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="bg-grid absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-[480px] space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Logo / Branding */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto transition-all group-hover:scale-110 overflow-hidden shadow-xl border border-border/50">
            <img src={logo} alt="Colvo" className="w-12 h-12 object-contain rounded-full" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-foreground tracking-tighter">Welcome <span className="text-gradient">Back</span></h1>
            <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.3em]">Colvo Technology</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Email Connection</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-4 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Secure Access</label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-12 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : <><LogIn size={18} /> Sign In</>}
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Secure Social</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full h-14 bg-background border border-border rounded-2xl flex items-center justify-center gap-4 hover:bg-secondary transition-all group/google disabled:opacity-50"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 group-hover/google:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-sm font-medium text-muted-foreground">
          New to the platform? 
          <button
            onClick={() => navigate("/signup")}
            className="text-primary font-black uppercase tracking-widest text-xs ml-2 hover:underline inline-flex items-center gap-1 group"
          >
            Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
