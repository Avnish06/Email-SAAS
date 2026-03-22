import { v4 as uuid } from "uuid";

export const generateAITemplate = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const p = prompt.toLowerCase();
        let blocks = [];

        // Simple keyword-based logic to simulate AI generation
        if (p.includes("marketing") || p.includes("sale") || p.includes("product")) {
            blocks = [
                { id: uuid(), type: "text", data: { text: "Limited Time Offer! 🔥", size: 32, color: "#dc2626", align: "center", bold: true, italic: false, underline: false } },
                { id: uuid(), type: "image", data: { url: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1200", width: 100, radius: 12 } },
                { id: uuid(), type: "text", data: { text: "Discover our latest collection and get up to 50% off on all premium items. Don't wait!", size: 18, color: "#4b5563", align: "center", bold: false, italic: false, underline: false } },
                { id: uuid(), type: "button", data: { text: "Shop Now →", link: "#", bg: "#dc2626", color: "#ffffff", radius: 8 } },
            ];
        } else if (p.includes("newsletter") || p.includes("update") || p.includes("weekly")) {
            blocks = [
                { id: uuid(), type: "text", data: { text: "Your Weekly Digest 📰", size: 28, color: "#6366f1", align: "center", bold: true, italic: false, underline: false } },
                { id: uuid(), type: "divider", data: { height: 2, color: "#818cf8" } },
                { id: uuid(), type: "text", data: { text: "Stay informed with the latest trends and stories from our community directly to your inbox.", size: 16, color: "#374151", align: "left", bold: false, italic: false, underline: false } },
                { id: uuid(), type: "image", data: { url: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200", width: 100, radius: 8 } },
            ];
        } else if (p.includes("welcome") || p.includes("onboarding") || p.includes("hello")) {
            blocks = [
                { id: uuid(), type: "text", data: { text: "Welcome to the Family! 🎉", size: 36, color: "#0d9488", align: "center", bold: true, italic: false, underline: false } },
                { id: uuid(), type: "text", data: { text: "We're so glad you're here. Let's get you started with everything you need to know.", size: 18, color: "#4b5563", align: "center", bold: false, italic: false, underline: false } },
                { id: uuid(), type: "image", data: { url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200", width: 95, radius: 20 } },
                { id: uuid(), type: "button", data: { text: "Start Exploration", link: "#", bg: "#0d9488", color: "#ffffff", radius: 100 } },
            ];
        } else {
            // Default fallback
            blocks = [
                { id: uuid(), type: "text", data: { text: "Generated with AI Magic ✨", size: 24, color: "#111827", align: "center", bold: true, italic: false, underline: false } },
                { id: uuid(), type: "text", data: { text: `We've crafted this template based on your idea: "${prompt}". Feel free to customize it further!`, size: 16, color: "#4b5563", align: "center", bold: false, italic: false, underline: false } },
                { id: uuid(), type: "divider", data: { height: 1, color: "#e5e7eb" } },
            ];
        }

        res.status(200).json({
            success: true,
            blocks,
            message: "Template generated successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "AI generation failed", error: error.message });
    }
};
