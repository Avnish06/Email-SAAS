import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppUrl } from "../App";
import { Sparkles, Trash2, Layout, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export const Templatehandling = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${AppUrl}/template/getAlltemplate`);
            setTemplates(response.data.templates || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching templates:", err);
            setError("Failed to load templates. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAI = async () => {
        if (!window.confirm("This will generate 3 new templates and delete the 3 oldest ones. Proceed?")) return;
        
        setGenerating(true);
        try {
            const response = await axios.post(`${AppUrl}/template/generate-ai-templates`);
            if (response.data.success) {
                toast.success("AI Templates generated successfully!");
                fetchTemplates();
            }
        } catch (err) {
            console.error("AI Generation failed:", err);
            toast.error(err.response?.data?.message || "AI Generation failed");
        } finally {
            setGenerating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this template?")) return;
        
        try {
            await axios.delete(`${AppUrl}/template/deletetemplate/${id}`);
            toast.success("Template deleted");
            fetchTemplates();
        } catch (err) {
            toast.error("Failed to delete template");
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-foreground mb-2">Template Handling</h1>
                        <p className="text-muted-foreground font-medium">Manage and generate AI-powered email templates</p>
                    </div>
                    
                    <button
                        onClick={handleGenerateAI}
                        disabled={generating}
                        className={`relative group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-3 overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {generating ? (
                            <RefreshCw className="animate-spin w-5 h-5" />
                        ) : (
                            <Sparkles className="w-5 h-5 fill-current" />
                        )}
                        <span>{generating ? "Generating AI Magic..." : "Generate AI Templates"}</span>
                    </button>
                </div>

                {/* Status Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-card border border-border rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                                <Layout size={24} />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Templates</span>
                        </div>
                        <p className="text-4xl font-black">{templates.length}</p>
                    </div>
                    {/* Add more stats if needed */}
                </div>

                {/* Templates Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <RefreshCw className="animate-spin text-primary w-12 h-12 mb-4" />
                        <p className="font-bold text-muted-foreground">Loading your library...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center bg-red-500/5 border border-red-500/20 rounded-[40px]">
                        <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">{error}</h3>
                        <button onClick={fetchTemplates} className="text-primary font-bold hover:underline">Try Again</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template) => (
                            <div key={template._id} className="group bg-card border border-border rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className="aspect-video bg-secondary relative overflow-hidden">
                                    {template.previewImage ? (
                                        <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary to-border">
                                            <Layout size={48} opacity={0.3} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight mb-1">{template.name}</h3>
                                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{template.componentName}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(template._id)}
                                            className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                                            title="Delete Template"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {template.fields?.slice(0, 3).map((f, i) => (
                                            <span key={i} className="px-3 py-1 bg-secondary text-[10px] font-bold rounded-lg border border-border">
                                                {f.name}
                                            </span>
                                        ))}
                                        {template.fields?.length > 3 && (
                                            <span className="px-3 py-1 bg-secondary text-[10px] font-bold rounded-lg border border-border">
                                                +{template.fields.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && templates.length === 0 && !error && (
                    <div className="text-center py-32 bg-secondary/20 rounded-[40px] border border-dashed border-border">
                        <Layout className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
                        <h3 className="text-2xl font-bold mb-2">No templates found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Your template library is empty. Click the AI button above to generate your first set of premium templates!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
