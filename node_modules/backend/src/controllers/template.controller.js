import uploadoncloudinary from "../config/cloudinary.js";
import { Temp } from "../Models/Template.model.js";

export const createTemplate = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, category, componentName } = req.body;

    // ✅ Validate required fields
    if (!name || !category || !componentName) {
      return res.status(400).json({
        success: false,
        message: "Name, category and componentName are required",
      });
    }

    // ✅ SAFELY parse fields
    let parsedFields = [];

    if (req.body.fields) {
      if (typeof req.body.fields === "string") {
        try {
          parsedFields = JSON.parse(req.body.fields);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid fields format. Must be valid JSON array.",
          });
        }
      } else if (Array.isArray(req.body.fields)) {
        parsedFields = req.body.fields;
      }
    }

    // ✅ Ensure fields is always an array
    if (!Array.isArray(parsedFields)) {
      return res.status(400).json({
        success: false,
        message: "Fields must be an array",
      });
    }

    console.log("Parsed Fields:", parsedFields);
    console.log("Type after parse:", typeof parsedFields);

    // ✅ Handle image upload
    let previewImage = "";

    if (req.file) {
      const uploaded = await uploadoncloudinary(req.file.path);
      console.log("Uploaded:", uploaded?.secure_url);
      previewImage = uploaded?.secure_url || "";
    }

    // ✅ Create template
    const template = await Temp.create({
      name,
      category,
      componentName,
      fields: parsedFields,
      previewImage,
    });

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template,
    });

  } catch (error) {
    console.error("Create Template Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Temp.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: templates.length,
      templates,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching templates",
    });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Temp.findById(id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json(template);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching template",
    });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, componentName, fields, layoutJson } = req.body;

    let updateData = {
      name,
      category,
      componentName,
      fields,
      layoutJson,
    };

    if (req.files?.previewImage) {
      const imagePath = req.files.previewImage.path;
      const uploaded = await uploadoncloudinary(imagePath);
      updateData.previewImage = uploaded?.secure_url;
    }

    const updatedTemplate = await Temp.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template updated successfully",
      template: updatedTemplate,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating template",
    });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Temp.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting template",
    });
  }
};


