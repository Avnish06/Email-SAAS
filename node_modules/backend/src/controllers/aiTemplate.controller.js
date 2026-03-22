import { GoogleGenerativeAI } from "@google/generative-ai";
import { Temp } from "../Models/Template.model.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAITemplates = async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(400).json({
                success: false,
                message: "GEMINI_API_KEY is missing in .env file",
            });
        }

        // 1. Fetch existing templates to get context (images, categories)
        const existingTemplates = await Temp.find().sort({ createdAt: -1 }).limit(10);

        // Extract some useful info for the prompt
        const context = existingTemplates.map(t => ({
            name: t.name,
            category: t.category,
            previewImage: t.previewImage
        }));

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an expert email marketing template designer. 
      Based on these existing templates: ${JSON.stringify(context)}, 
      generate 3 NEW and unique email template configurations.
      
      Each template must have:
      1. "name": A descriptive name.
      2. "category": One of [Marketing, Transactional, Newsletter, Promotional, Educational, Event].
      3. "componentName": A unique CamelCase name for the React component (e.g., "SeasonalSaleTemplate").
      4. "previewImage": Select one valid image URL from the existing templates context provided above to reuse as a placeholder.
      5. "fields": An array of objects, e.g., [{"name": "title", "label": "Title", "type": "text", "defaultValue": "Welcome!"}].
      
      Return ONLY a valid JSON array of these 3 objects. Do not include markdown formatting or extra text.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up response if it contains markdown code blocks
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const newTemplatesData = JSON.parse(text);

        // 2. Create the new templates
        const createdTemplates = await Temp.create(newTemplatesData);

        // 3. Delete the last 3 (oldest) templates if we have more than a certain number, 
        // or just simply delete the 3 oldest as requested.
        // The user said: "last 3 will get deleted from the template"

        // Find the 3 oldest templates (excluding the ones we just created)
        const allTemplates = await Temp.find().sort({ createdAt: 1 }); // Ascending = oldest first

        // Filter out the newly created ones just in case
        const newlyCreatedIds = createdTemplates.map(t => t._id.toString());
        const oldestTemplates = allTemplates
            .filter(t => !newlyCreatedIds.includes(t._id.toString()))
            .slice(0, 3);

        if (oldestTemplates.length > 0) {
            const deleteIds = oldestTemplates.map(t => t._id);
            await Temp.deleteMany({ _id: { $in: deleteIds } });
        }

        return res.status(201).json({
            success: true,
            message: "AI Templates generated and library updated",
            generated: createdTemplates,
            deletedCount: oldestTemplates.length
        });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate AI templates: " + error.message,
        });
    }
};
