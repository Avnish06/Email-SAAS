import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../Context/userContext";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  LogOut,
  CheckCircle,
  Shield,
  ArrowLeft,
  Settings,
  X,
  Save,
  Camera
} from "lucide-react";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useDetails();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
    password: "",
  });

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phonenumber: user?.phonenumber || "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateData = {};
      if (formData.name !== user?.name) updateData.name = formData.name;
      if (formData.email !== user?.email) updateData.email = formData.email;
      if (formData.phonenumber !== user?.phonenumber) updateData.phonenumber = formData.phonenumber;
      if (formData.password) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        toast.info("No changes detected");
        setLoading(false);
        setIsEditing(false);
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`,
        updateData,
        { withCredentials: true }
      );

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Breadcrumb / Back Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-4 flex flex-col items-center bg-card border border-border rounded-[40px] p-10 shadow-xl animate-in fade-in slide-in-from-left-8 duration-700">
             <div className="relative group">
               <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-background shadow-2xl flex items-center justify-center text-primary text-4xl font-black transition-transform duration-500 group-hover:scale-105">
                 {user?.name?.charAt(0) || "U"}
               </div>
               <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full border-4 border-background shadow-xl flex items-center justify-center hover:scale-110 transition-all">
                  <Camera size={16} />
               </button>
             </div>
             
             <div className="mt-6 text-center">
               <h2 className="text-2xl font-black text-foreground tracking-tighter">{user?.name || "Member"}</h2>
               <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mt-1">Verified Account</p>
             </div>

             <div className="w-full mt-10 space-y-2">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`w-full h-12 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${isEditing ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"}`}
                >
                  {isEditing ? <><X size={14} /> Cancel</> : <><Edit2 size={14} /> Edit Profile</>}
                </button>
             </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Settings size={140} />
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xl">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-foreground tracking-tight">Account Settings</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Manage your personal data</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <ProfileField 
                      icon={User} 
                      label="Full Name" 
                      value={formData.name} 
                      name="name"
                      editing={isEditing}
                      onChange={handleChange}
                    />
                    <ProfileField 
                      icon={Mail} 
                      label="Email Address" 
                      value={formData.email} 
                      name="email"
                      editing={isEditing}
                      onChange={handleChange}
                    />
                    <ProfileField 
                      icon={Phone} 
                      label="Phone Number" 
                      value={formData.phonenumber} 
                      name="phonenumber"
                      editing={isEditing}
                      onChange={handleChange}
                    />
                    <ProfileField 
                      icon={Calendar} 
                      label="Member Since" 
                      value={new Date(user?.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} 
                      readonly
                    />
                    
                    {isEditing && (
                      <div className="md:col-span-2 animate-in slide-in-from-top-4 duration-300">
                        <ProfileField 
                          icon={Shield} 
                          label="Change Password" 
                          value={formData.password} 
                          name="password"
                          editing={true}
                          type="password"
                          placeholder="Enter new password (optional)"
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="pt-6 border-t border-border flex justify-end gap-4 animate-in fade-in duration-500">
                       <button
                         onClick={handleSave}
                         disabled={loading}
                         className="px-10 h-14 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-3 hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
                       >
                         {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                       </button>
                    </div>
                  )}
                </div>
             </div>

             {/* Footer Actions: Logout */}
             <div className="flex justify-center pt-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-destructive/10 text-destructive border-2 border-destructive/20 font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-destructive hover:text-white"
                >
                  <LogOut size={18} /> Logout Session
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon: Icon, label, value, editing, name, onChange, type = "text", placeholder, readonly }) => (
  <div className="space-y-3 group/field">
    <div className="flex items-center gap-2 ml-1">
      <Icon size={14} className="text-primary" />
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{label}</label>
    </div>
    
    {editing && !readonly ? (
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-background border-2 border-border p-4 rounded-2xl text-foreground font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 focus:ring-4 focus:ring-primary/5"
      />
    ) : (
      <div className="w-full bg-secondary/20 border-2 border-transparent p-4 rounded-2xl text-foreground font-black flex items-center justify-between">
        {value || "Not Set"}
        {readonly && <CheckCircle size={14} className="text-primary/40" />}
      </div>
    )}
  </div>
);

export default Profile;
