import nodemailer from "nodemailer";

const sendEmail = async (toList, subject, content) => {
  if (!Array.isArray(toList)) {
    throw new Error("Recipients must be an array");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const email of toList) {
    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: content,
    });
  }
};

export default sendEmail;
