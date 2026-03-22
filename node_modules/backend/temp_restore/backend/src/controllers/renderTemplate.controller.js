import { Temp } from "../Models/Template.model.js";
import { renderEmailTemplate } from "../services/renderTemplate.js";
export const renderTemplate = async (req, res) => {

  try {

    const { templateId } = req.params;
    const variables = req.body || {};

    // find template from DB
    const template = await Temp.findById(templateId);

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      });
    }

    // render HTML using componentName
    const html = renderEmailTemplate(
      template.componentName,
      variables
    );

    return res.json({
      success: true,
      html
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

};
