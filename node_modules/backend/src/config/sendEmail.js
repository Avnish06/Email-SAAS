import nodemailer from "nodemailer";

/**
 * Inject tracking pixel and wrap links for click tracking.
 * @param {string} html - The email HTML content
 * @param {string} campaignId - The campaign's MongoDB ObjectId
 * @param {string} recipientEmail - The recipient email
 * @param {string} baseUrl - The backend base URL for tracking endpoints
 * @returns {string} - Modified HTML with tracking
 */
const injectTracking = (html, campaignId, recipientEmail, baseUrl) => {
  if (!campaignId || !recipientEmail || !baseUrl) return html;

  const encodedEmail = encodeURIComponent(recipientEmail);

  // 1. Inject open-tracking pixel before </body> or at the end
  const pixelUrl = `${baseUrl}/api/v1/track/open/${campaignId}/${encodedEmail}`;
  const pixelTag = `<img src="${pixelUrl}" width="1" height="1" style="display:none;border:0;" alt="" />`;

  let trackedHtml = html;
  if (trackedHtml.includes("</body>")) {
    trackedHtml = trackedHtml.replace("</body>", `${pixelTag}</body>`);
  } else {
    trackedHtml += pixelTag;
  }

  // 2. Wrap <a href="..."> links with click tracking redirect
  const clickBase = `${baseUrl}/api/v1/track/click/${campaignId}/${encodedEmail}`;
  trackedHtml = trackedHtml.replace(
    /href="(https?:\/\/[^"]+)"/gi,
    (match, originalUrl) => {
      const trackUrl = `${clickBase}?url=${encodeURIComponent(originalUrl)}`;
      return `href="${trackUrl}"`;
    }
  );

  return trackedHtml;
};

/**
 * Send emails to a list of recipients with optional tracking.
 * @param {string[]} toList - Array of recipient emails
 * @param {string} subject - Email subject
 * @param {string} content - HTML content
 * @param {string} [campaignId] - Campaign ID for tracking (optional)
 * @param {string} [baseUrl] - Backend base URL for tracking (optional)
 */
const sendEmail = async (toList, subject, content, campaignId, baseUrl) => {
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

  const results = { sent: [], failed: [] };

  for (const email of toList) {
    try {
      // Inject per-recipient tracking if campaignId is available
      const trackedContent = campaignId
        ? injectTracking(content, campaignId, email, baseUrl)
        : content;

      await transporter.sendMail({
        from: `"MailMint" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: trackedContent,
      });
      results.sent.push(email);
    } catch (err) {
      console.error(`Failed to send to ${email}:`, err.message);
      results.failed.push(email);
    }
  }

  return results;
};

export default sendEmail;
