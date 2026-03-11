import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const planName = state?.planName || "Your Plan";
  const amount = state?.amount;
  const currency = state?.currency || "INR";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-32 h-32 rounded-full bg-primary/10 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_50px_rgba(15,157,142,0.3)]">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-3 text-foreground">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          Welcome to the{" "}
          <span className="font-bold text-primary">{planName}</span> plan.
          Your subscription is now active and you're all set to go!
        </p>

        {/* Summary Card */}
        {amount !== undefined && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-semibold text-foreground">{planName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-semibold text-foreground">
                {currency === "INR" ? "₹" : currency}
                {amount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-green-500">✓ Paid</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/campaign/new")}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-all"
          >
            <Mail size={16} />
            Start a Campaign
          </button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          A confirmation will be sent to your registered email. Need help?{" "}
          <button
            onClick={() => navigate("/support")}
            className="text-primary underline-offset-4 hover:underline"
          >
            Contact support
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
