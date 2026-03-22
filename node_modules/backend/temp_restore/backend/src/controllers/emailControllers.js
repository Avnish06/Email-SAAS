import sendEmail from "../config/sendEmail.js";

export const sendEmailto = async(req, res) => {
try {
     const { email, name, content, subject } = req.body;
    
      const html = `
        <h2>Hello ${name}</h2>
        <p>This is my first email using Nodemailer 🚀</p>
      `;
    
      await sendEmail(
        email,                //to
        subject,      //Subject
        content,
        name          //Actual Body of the Mail(in html)
      ); 
      return res.status(200).json({ success: true, message: "Email sent"});
    
} catch (error) {
    return res.status(500).json({success:"Something Went Wrong while sending the Mail to the user"})
}
}