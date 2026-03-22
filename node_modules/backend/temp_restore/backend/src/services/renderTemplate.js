// backend/src/services/renderTemplate.js

import React from "react";
import { render } from "@react-email/render";


export const renderEmailTemplate = (componentName, variables) => {

  const TemplateComponent = template[componentName];

  if (!TemplateComponent) {
    throw new Error("Template not found");
  }
  return html;
};
