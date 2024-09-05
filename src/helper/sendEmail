import emailjs from "emailjs-com";

const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

export const fetchCSVAndSendEmail = async (
  emailData: string,
  setIsSendEmail: any
) => {
  if (!emailData) return;

  try {
    const response = await fetch(emailData);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();

    const base64Data = btoa(unescape(encodeURIComponent(csvText)));
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      message: "Here is the requested CSV file",
      content: base64Data,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      );
      setIsSendEmail(true);
    } catch (err) {
      console.error("Failed to send email:", err);
    }
  } catch (err) {
    console.error("Error processing or sending email:", err);
  }
};
