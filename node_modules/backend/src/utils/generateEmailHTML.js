export const generateEmailHTML = (template) => {
  let dynamicContent = "";

  template.fields.forEach((field) => {
    if (field.type === "text") {
      dynamicContent += `<p>${field.defaultValue}</p>`;
    }

    if (field.type === "url") {
      dynamicContent += `
        <a href="${field.defaultValue}" 
           style="display:inline-block;padding:10px 20px;
           background:#007bff;color:#fff;text-decoration:none;
           border-radius:5px;">
           Visit Link
        </a>
      `;
    }

    if (field.type === "color") {
      dynamicContent += `
        <div style="width:100px;height:50px;
             background:${field.defaultValue};">
        </div>
      `;
    }
  });

  return `
    <div style="font-family:Arial;padding:20px;">
      <h2>${template.name}</h2>
      ${dynamicContent}
      <img src="${template.previewImage}" 
           style="max-width:100%;margin-top:20px;" />
    </div>
  `;
};
