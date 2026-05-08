import Contact from '../models/Contact.js';
import sendEmail from "../utils/sendEmail.js";



// app.use(express.json());
// Save contact
export const saveContact = async (req, res) => {
    try {
        const { name, phoneNo, email, address } = req.body;

        // Validate required fields
        if (!name || !phoneNo || !email || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new contact
        const contact = await new Contact({
            userId: req.user.id,
            name,
            phoneNo,
            email,
            address
        });

        // Save to database
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact saved successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save contact',
            error: error.message
        });
    }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

export const sendContactEmail = async (req, res) => {
	try {
		const { name, email, subject, message } = req.body;

		if (!name || !name.trim()) {
			return res.status(400).json({ message: "Name is required" });
		}

		if (!email || !email.trim()) {
			return res.status(400).json({ message: "Email is required" });
		}

		if (!message || !message.trim()) {
			return res.status(400).json({ message: "Message is required" });
		}

		const normalizedSubject = subject?.trim() || "New contact form message";
		const normalizedName = name.trim();
		const normalizedEmail = email.toLowerCase().trim();
		const normalizedMessage = message.trim();

		const html = `
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> ${normalizedName}</p>
			<p><strong>Email:</strong> ${normalizedEmail}</p>
			<p><strong>Subject:</strong> ${normalizedSubject}</p>
			<p><strong>Message:</strong></p>
			<p>${normalizedMessage.replace(/\n/g, "<br />")}</p>
		`;

		await sendEmail({
			to: process.env.EMAIL_USER,
			subject: normalizedSubject,
			html,
			replyTo: normalizedEmail,
		});

		return res.status(200).json({
			message: "Your message has been sent successfully",
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
