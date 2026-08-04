import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 2525,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

const sendEmail = async ({ to, subject, html, replyTo }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Pulse Blogger" <${process.env.BREVO_USER}>`,
    to,
    subject,
    html,
    replyTo,
  });
};

export default sendEmail;
