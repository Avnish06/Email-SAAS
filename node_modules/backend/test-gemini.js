import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    try {
        console.log("Model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello!");
        console.log("Response:", result.response.text());
        console.log("TEST PASSED ✅");
    } catch (error) {
        console.error("TEST FAILED ❌");
        console.error(error.message);
        if (error.status === 404) {
            console.log("Attempting fallback to gemini-pro...");
            try {
                const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
                const result2 = await model2.generateContent("Hello!");
                console.log("Fallback Response:", result2.response.text());
                console.log("FALLBACK PASSED ✅");
            } catch (e) {
                console.error("Fallback failed:", e.message);
            }
        }
    }
}

testGemini();
