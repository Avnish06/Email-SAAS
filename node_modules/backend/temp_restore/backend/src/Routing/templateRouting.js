import express from "express"
import { createTemplate, getAllTemplates, getTemplateById, updateTemplate, deleteTemplate}
from "../controllers/template.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { renderTemplate } from "../controllers/renderTemplate.controller.js";
export const templateRouting = express.Router()


templateRouting.post("/createtemplate", upload.single("previewImage"), createTemplate)
templateRouting.get("/getAlltemplate", getAllTemplates)
templateRouting.get("/getindividualtemplate/:id", getTemplateById)
templateRouting.put("/updatethetemplate/:id", updateTemplate)
templateRouting.delete("/deletetemplate/:id", deleteTemplate)
templateRouting.post("/render/:templateId", renderTemplate)






 
