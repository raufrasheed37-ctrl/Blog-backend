import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.authentications.apiKey.apiKey =
  process.env.BREVO_API_KEY;

const sendEmail = async ({ to, subject, html, replyTo }) => {
  const email = new brevo.SendSmtpEmail();

  email.sender = {
    name: "Pulse Blogger",
    email: "pulseblogger01@gmail.com",
  };

  email.to = [
    {
      email: to,
    },
  ];

  email.subject = subject;
  email.htmlContent = html;

  if (replyTo) {
    email.replyTo = {
      email: replyTo,
    };
  }

  return await apiInstance.sendTransacEmail(email);
};

export default sendEmail;
