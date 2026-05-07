// Contact controller
import Contact from '../models/Contact.js';



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
