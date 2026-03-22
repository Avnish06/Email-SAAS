export const createCampaign = async (req, res) => {
  try {
    const { campaignName, campaignType, inbuiltTemplate } = req.body;
    const { templateId } = req.params;
    const userId = req.user._id;

    if (!campaignName || !campaignType) {
      return res.status(400).json({
        message: "Campaign name and campaign type are required",
      });
    }

    let template = null;
    let defaultVariables = {};
    let subject = "";

    // ✅ If using inbuilt template
    if (inbuiltTemplate) {
      template = await Temp.findById(templateId);

      if (!template) {
        return res.status(404).json({
          message: "Template not found",
        });
      }

      template.fields.forEach((field) => {
        defaultVariables[field.name] = field.defaultValue || "";
      });

      subject = template.name;
    }

    // ✅ Now create campaign ONLY ONCE
    const campaign = await Campaign.create({
      campaignName,
      campaignType,
      inbuiltTemplate: inbuiltTemplate || false,
      userId,
      templateId: template?._id,
      variables: defaultVariables,
      subject,
      status: "draft",
    });

    return res.status(201).json({
      message: "Campaign Data has been Saved Successfully",
      campaign,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while creating your campaign",
    });
  }
};
