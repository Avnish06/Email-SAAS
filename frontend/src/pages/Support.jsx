import React from 'react';
import { Mail, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            
            <div className="max-w-4xl w-full relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
                        <HelpCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Customer Support</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">
                        How can we <span className="text-gradient">help?</span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                        Have questions about Colvo? Our team is here to support your marketing journey every step of the way. Reach out for any technical queries or account assistance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Email Support Card */}
                    <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[40px] p-10 shadow-2xl group hover:border-primary/30 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-primary/10">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-foreground">Email Support</h3>
                        <p className="text-muted-foreground mb-6 font-medium">For general inquiries, technical issues, or billing questions.</p>
                        <a 
                            href="mailto:support@hatbaliya.in" 
                            className="text-xl font-bold text-primary hover:underline hover:opacity-80 transition-all block"
                        >
                            support@hatbaliya.in
                        </a>
                    </div>

                    {/* Response Time Card */}
                    <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[40px] p-10 shadow-2xl group hover:border-accent/30 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-lg shadow-accent/10">
                            <Clock size={28} />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-foreground">Response Time</h3>
                        <p className="text-muted-foreground mb-6 font-medium">We typically respond to all inquiries within 24 hours during business days.</p>
                        <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest">
                            <ShieldCheck size={16} /> 24/7 Monitoring
                        </div>
                    </div>
                </div>

                {/* Engagement Section */}
                <div className="bg-secondary/30 backdrop-blur-sm border border-border rounded-[32px] p-10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                    <p className="text-muted-foreground font-medium relative z-10 leading-relaxed max-w-2xl mx-auto">
                        Looking for something else? Reach out to us directly at our support mail and we'll ensure your query is handled by the right department. We're dedicated to your success on the Colvo platform.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Support;
