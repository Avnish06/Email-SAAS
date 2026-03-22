import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // The standard SDK doesn't have a simple listModels, but we can try a fetch manually or use the genAI object if it has it in newer versions.
        // Actually, let's try a different model name format. 
        // Some regions/keys require 'gemini-1.0-pro'

        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];

        for (const m of models) {
            console.log(`Checking ${m}...`);
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Hi");
                console.log(`✅ ${m} works!`);
                return;
            } catch (e) {
                console.log(`❌ ${m} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("Critical error:", error);
    }
}

listModels();
