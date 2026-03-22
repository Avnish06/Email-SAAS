import express from "express";
import { createTemplate, getAllTemplates, getTemplateById, updateTemplate, deleteTemplate } from "../controllers/template.controller.js";
import { generateAITemplates } from "../controllers/aiTemplate.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { renderTemplate } from "../controllers/renderTemplate.controller.js";
import { accessController } from "../middleware/accessController.js";

export const templateRouting = express.Router();

templateRouting.post("/createtemplate", accessController, upload.single("previewImage"), createTemplate);
templateRouting.get("/getAlltemplate", accessController, getAllTemplates);
templateRouting.get("/getindividualtemplate/:id", accessController, getTemplateById);
templateRouting.put("/updatethetemplate/:id", accessController, updateTemplate);
templateRouting.delete("/deletetemplate/:id", accessController, deleteTemplate);
templateRouting.post("/generate-ai-templates", accessController, generateAITemplates);
templateRouting.post("/render/:templateId", renderTemplate);







