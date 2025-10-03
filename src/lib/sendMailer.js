import nodemailer from "nodemailer";

export const sendMail = async (subject, receiver, body) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT, 10),
    secure: process.env.NODEMAILER_SECURE === "true", // convert string to bool
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const options = {
    from: `Ecom <${process.env.NODEMAILER_USER}>`,
    to: receiver,
    subject,
    html: body,
  };

  try {
    await transport.sendMail(options);
    console.log("Email sent to:", receiver);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};
