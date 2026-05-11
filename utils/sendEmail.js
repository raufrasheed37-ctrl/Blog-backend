import nodemailer from "nodemailer";

const createTransporter = () =>
	nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

const sendEmail = async ({ to, subject, html, replyTo }) => {
	const transporter = createTransporter();

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to,
		subject,
		html,
		replyTo,
	});
};

export default sendEmail;
