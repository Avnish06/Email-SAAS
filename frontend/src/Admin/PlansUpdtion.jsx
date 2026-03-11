import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppUrl } from "../App";
import {
  CreditCard, Plus, Pencil, Trash2, Check, X, Loader2,
  RefreshCw, Sparkles, Database
} from "lucide-react";
import { toast } from "react-toastify";

/* ─── Default empty form state ─── */
const emptyForm = {
  planName: "",
  planDescription: "",
  Cost: "",
  currency: "INR",
  duration: "month",
  features: [""],
  isPopular: false
};

export const PlansUpdtion = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null); // null = new plan
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  /* ─── Fetch plans from DB ─── */
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${AppUrl}/plans/admin/all`);
      setPlans(res.data.plans || []);
    } catch {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  /* ─── Open modal ─── */
  const openAdd = () => { setEditingPlan(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      planName: plan.planName,
      planDescription: plan.planDescription,
      Cost: plan.Cost,
      currency: plan.currency || "INR",
      duration: plan.duration,
      features: plan.features.length ? plan.features : [""],
      isPopular: plan.isPopular || false
    });
    setShowModal(true);
  };

  /* ─── Feature list helpers ─── */
  const setFeature = (i, val) => {
    const f = [...form.features];
    f[i] = val;
    setForm({ ...form, features: f });
  };
  const addFeature = () => setForm({ ...form, features: [...form.features, ""] });
  const removeFeature = (i) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

  /* ─── Save (Create or Update) ─── */
  const handleSave = async () => {
    if (!form.planName || form.Cost === "") return toast.error("Plan name and cost are required");
    setSaving(true);
    try {
      const payload = { ...form, Cost: Number(form.Cost), features: form.features.filter(f => f.trim()) };
      if (editingPlan) {
        await axios.put(`${AppUrl}/plans/admin/update/${editingPlan._id}`, payload, { withCredentials: true });
        toast.success("Plan updated!");
      } else {
        await axios.post(`${AppUrl}/plans/admin/create`, payload, { withCredentials: true });
        toast.success("Plan created!");
      }
      setShowModal(false);
      fetchPlans();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ─── Delete ─── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan permanently?")) return;
    try {
      await axios.delete(`${AppUrl}/plans/admin/delete/${id}`, { withCredentials: true });
      toast.success("Plan deleted");
      fetchPlans();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ─── Seed default plans ─── */
  const handleSeed = async () => {
    if (!window.confirm("Seed the 3 default plans (Free Trial, Starter, Pro) into the database?")) return;
    setSeeding(true);
    try {
      const res = await axios.post(`${AppUrl}/plans/admin/seed`, {}, { withCredentials: true });
      toast.success(res.data.message);
      fetchPlans();
    } catch (err) {
      toast.error(err.response?.data?.message || "Seed failed");
    } finally {
      setSeeding(false);
    }
  };

  const colorMap = {
    0: "from-slate-500/10 to-slate-400/5 border-slate-300/30",
    499: "from-blue-500/10 to-blue-400/5 border-blue-300/30",
    1499: "from-primary/10 to-primary/5 border-primary/20",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h3 className="text-3xl font-black tracking-tighter">Plans & Pricing</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border text-foreground rounded-2xl font-bold text-sm hover:bg-border transition-all disabled:opacity-50"
          >
            {seeding ? <Loader2 size={15} className="animate-spin" /> : <Database size={15} />}
            {seeding ? "Seeding..." : "Seed Defaults"}
          </button>
          <button
            onClick={handleSeed}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border text-foreground rounded-2xl font-bold text-sm hover:bg-border transition-all"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all"
          >
            <Plus size={18} /> Add Plan
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-24 bg-secondary/20 rounded-[40px] border border-dashed border-border">
          <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h4 className="text-xl font-bold mb-2">No plans yet</h4>
          <p className="text-muted-foreground mb-6">Click "Seed Defaults" to populate the 3 default plans, or add a new plan manually.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(plan => (
            <div
              key={plan._id}
              className={`relative p-6 bg-gradient-to-br border rounded-[28px] shadow-sm hover:shadow-lg transition-all ${colorMap[plan.Cost] || "from-secondary/30 to-secondary/10 border-border"}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <Sparkles size={10} fill="currentColor" /> Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <CreditCard size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-black text-lg">{plan.planName}</h4>
                  <p className="text-xs text-muted-foreground font-bold">/{plan.duration}</p>
                </div>
              </div>

              <p className="text-4xl font-black mb-2">
                {plan.Cost === 0 ? "Free" : `₹${plan.Cost.toLocaleString("en-IN")}`}
              </p>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{plan.planDescription}</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium">
                    <Check size={14} className="text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 pt-4 border-t border-border/50">
                <button
                  onClick={() => openEdit(plan)}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-black rounded-xl bg-background/50 hover:bg-background border border-border transition-all"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-black rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Modal ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-[32px] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h4 className="text-xl font-black">{editingPlan ? "Edit Plan" : "New Plan"}</h4>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-secondary transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <input
                value={form.planName}
                onChange={e => setForm({ ...form, planName: e.target.value })}
                placeholder="Plan Name (e.g. Pro)"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Description */}
              <textarea
                value={form.planDescription}
                onChange={e => setForm({ ...form, planDescription: e.target.value })}
                placeholder="Short description..."
                rows={2}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              {/* Cost + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1 block">Cost (₹)</label>
                  <input
                    type="number"
                    value={form.Cost}
                    onChange={e => setForm({ ...form, Cost: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1 block">Duration</label>
                  <select
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="3 days">3 days</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                  </select>
                </div>
              </div>

              {/* Popular badge */}
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-secondary rounded-2xl border border-border">
                <input
                  type="checkbox"
                  checked={form.isPopular}
                  onChange={e => setForm({ ...form, isPopular: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="font-bold text-sm">Mark as "Most Popular"</span>
              </label>

              {/* Features */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Features</label>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={f}
                        onChange={e => setFeature(i, e.target.value)}
                        placeholder={`Feature ${i + 1}`}
                        className="flex-1 px-4 py-2.5 bg-secondary border border-border rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button onClick={() => removeFeature(i)} className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button onClick={addFeature} className="flex items-center gap-1 text-xs font-bold text-primary hover:underline mt-1">
                    <Plus size={12} /> Add feature
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-2xl font-bold bg-secondary hover:bg-border transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-2xl font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {saving ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
