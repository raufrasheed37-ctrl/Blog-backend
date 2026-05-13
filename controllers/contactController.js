import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";



export const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      email,
      address,
      bio,
      website,
    } = req.body;

    // Find authenticated user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // VALIDATION
    if (!name || !phoneNo || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // UPDATE USER
    user.name = name;
    user.phoneNo = phoneNo;
    user.email = email;
    user.address = address;
    user.bio = bio || "";
    user.website = website || "";

    // SAVE UPDATED USER
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Fetch profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* =========================================
   CONTACT EMAIL
========================================= */

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const normalizedSubject =
      subject?.trim() || "New contact form message";

    const normalizedName = name.trim();

    const normalizedEmail =
      email.toLowerCase().trim();

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
    return res.status(500).json({
      message: error.message,
    });
  }
};