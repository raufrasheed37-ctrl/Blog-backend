
import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, html }) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "Pulse Blogger",
      email: "pulseblogger01@gmail.com"
    },
    to: [
      {
        email: to,
      },
    ],
    subject,
    htmlContent: html,
  });
};

export default sendEmail;
