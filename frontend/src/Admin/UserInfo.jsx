import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppUrl } from "../App";
import { Activity, Mail, Calendar, User } from "lucide-react";

export const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${AppUrl}/admin/getUserdetails`)
      .then(r => { setUsers(r.data.user || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h3 className="text-3xl font-black tracking-tighter mb-8">User Info & Stats</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {/* User List */}
        <div className="md:col-span-1 bg-card border border-border rounded-[24px] overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Select a User</p>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {loading ? (
              <p className="p-6 text-sm text-muted-foreground">Loading...</p>
            ) : users.map(u => (
              <button
                key={u._id}
                onClick={() => setSelected(u)}
                className={`w-full text-left px-4 py-3 border-b border-border hover:bg-secondary transition-all ${selected?._id === u._id ? "bg-primary/10 text-primary" : ""}`}
              >
                <p className="font-bold text-sm truncate">{u.email}</p>
                <p className="text-[10px] text-muted-foreground">ID: {u._id?.slice(-6)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* User Detail Panel */}
        <div className="md:col-span-2 bg-card border border-border rounded-[24px] p-8">
          {selected ? (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl">
                  {selected.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xl font-black">{selected.name || "Unknown"}</h4>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "User ID", value: selected._id?.slice(-10), icon: <User size={16} /> },
                  { label: "Status", value: selected.status || "Active", icon: <Activity size={16} /> },
                  { label: "Email", value: selected.email, icon: <Mail size={16} /> },
                  { label: "Joined", value: selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "N/A", icon: <Calendar size={16} /> },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-secondary/40 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      {item.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className="font-bold text-sm truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <User size={48} className="text-muted-foreground opacity-20 mb-4" />
              <p className="font-bold text-muted-foreground">Select a user from the list to see their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
