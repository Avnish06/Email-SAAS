import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowLeft,
  Sparkles
} from "lucide-react";

import { AppUrl } from "../App";
import { useDetails } from "../Context/userContext";
import { auth, provider } from "../../utils/firebase";
import logo from "../assets/logo.png";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { setUser } = useDetails();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !phonenumber || !password) {
      toast.error("All fields are required");
      return;
    }
    if (phonenumber.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${AppUrl}/auth/signup`,
        { name, email, phonenumber, password },
        { withCredentials: true }
      );
      toast.success("Welcome to Colvo! 🎉");
      setUser(res.data.user);
      navigate("/userdetails");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email: googleEmail, photoURL, uid } = result.user;
      const res = await axios.post(
        `${AppUrl}/auth/google`,
        { name: displayName, email: googleEmail, photoURL, googleId: uid },
        { withCredentials: true }
      );
      toast.success("Account created successfully! 🎉");
      setUser(res.data.user);
      navigate("/userdetails");
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(error?.response?.data?.message || "Google sign-in failed");
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

      <div className="w-full max-w-[520px] space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto transition-all group-hover:scale-110 overflow-hidden shadow-xl border border-border/50">
            <img src={logo} alt="Colvo" className="w-12 h-12 object-contain rounded-full" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-foreground tracking-tighter">Join the <span className="text-gradient">Circle</span></h1>
            <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.3em]">Start your marketing journey</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Username */}
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Identity</label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                    <input
                      type="text"
                      placeholder="Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 bg-background border border-border rounded-2xl pl-11 pr-4 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                      required
                    />
                  </div>
               </div>

               {/* Phone */}
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Connect</label>
                  <div className="relative group/input">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      className="w-full h-12 bg-background border border-border rounded-2xl pl-11 pr-4 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                      required
                    />
                  </div>
               </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Communication</label>
               <div className="relative group/input">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                 <input
                   type="email"
                   placeholder="name@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-4 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                   required
                 />
               </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Secure Access</label>
               <div className="relative group/input">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                 <input
                   type={showPassword ? "text" : "password"}
                   placeholder="Create strong password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-12 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "Creating Profile..." : <><UserPlus size={18} /> Create Account</>}
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Verified Social</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
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

        <div className="flex flex-col items-center gap-4">
           <button
             onClick={() => navigate("/login")}
             className="text-muted-foreground font-medium text-sm flex items-center gap-2 hover:text-primary transition-colors"
           >
             Already have an account? <span className="font-black uppercase tracking-widest text-xs">Sign In</span>
           </button>
           
           <button 
             onClick={() => navigate("/")}
             className="flex items-center gap-2 text-muted-foreground/40 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest"
           >
             <ArrowLeft size={12} /> Return Home
           </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
