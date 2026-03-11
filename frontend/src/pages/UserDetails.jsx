import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  User, 
  Briefcase, 
  Building, 
  MapPin, 
  Globe, 
  Hash, 
  Users, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Compass
} from "lucide-react";
import { AppUrl } from "../App";
import logo from "../assets/logo.png";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    companyName: "",
    address: "",
    state: "",
    city: "",
    postcode: "",
    contactsize: "",
    industrytype: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${AppUrl}/userinfo/userdetails`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile completed! Welcome aboard! 🚀");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden py-20">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="bg-grid absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-[580px] space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto transition-all group-hover:scale-110 overflow-hidden shadow-xl border border-border/50">
            <img src={logo} alt="Colvo" className="w-12 h-12 object-contain rounded-full" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-foreground tracking-tighter">Finalize <span className="text-gradient">Setup</span></h1>
            <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.3em]">Step {step} of 2 • Profile Completion</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          
          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-10">
            {[1, 2].map((i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? "w-12 bg-primary" : "w-4 bg-border"}`}
              />
            ))}
          </div>

          <form className="space-y-6">
            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="grid grid-cols-1 gap-6">
                    <Field 
                      label="Your Identity" 
                      icon={User} 
                      placeholder="Full name" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                    />
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Professional Role</label>
                      <div className="relative group/input">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-4 text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                        >
                          <option value="">Select Role</option>
                          <option>CEO / Founder</option>
                          <option>Marketing Manager</option>
                          <option>Content Creator</option>
                          <option>Product Designer</option>
                          <option>Operations Specialist</option>
                          <option>Developer</option>
                        </select>
                      </div>
                    </div>

                    <Field 
                      label="Organization" 
                      icon={Building} 
                      placeholder="Company name" 
                      name="companyName" 
                      value={formData.companyName} 
                      onChange={handleChange} 
                    />
                 </div>

                 <button
                   type="button"
                   onClick={() => setStep(2)}
                   className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                   Continue <ArrowRight size={18} />
                 </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field 
                      label="Location" 
                      icon={MapPin} 
                      placeholder="Address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                    />
                    <Field 
                      label="Region" 
                      icon={Globe} 
                      placeholder="State" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange} 
                    />
                    <Field 
                      label="Urban Center" 
                      icon={Compass} 
                      placeholder="City" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                    />
                    <Field 
                      label="Zip Code" 
                      icon={Hash} 
                      placeholder="Postcode" 
                      name="postcode" 
                      value={formData.postcode} 
                      onChange={handleChange} 
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field 
                      label="Network Size" 
                      icon={Users} 
                      placeholder="Contact size" 
                      name="contactsize" 
                      value={formData.contactsize} 
                      onChange={handleChange} 
                      type="number"
                    />
                    <Field 
                      label="Sector" 
                      icon={Sparkles} 
                      placeholder="Industry type" 
                      name="industrytype" 
                      value={formData.industrytype} 
                      onChange={handleChange} 
                    />
                 </div>

                 <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-24 h-14 bg-background border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:bg-secondary"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={submitForm}
                      disabled={loading}
                      className="flex-1 h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving Details..." : <><CheckCircle size={18} /> Finish Setup</>}
                    </button>
                 </div>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
          Powered by Colvo Protocol v2.4
        </p>
      </div>
    </div>
  );
};

const Field = ({ label, icon: Icon, placeholder, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">{label}</label>
    <div className="relative group/input">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={16} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 bg-background border border-border rounded-2xl pl-11 pr-4 text-sm text-foreground font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
        required
      />
    </div>
  </div>
);

export default UserDetailsForm;
