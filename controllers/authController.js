import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js"
import crypto from "crypto";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );


const buildUserResponse = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  bio: user.bio,
  avatar: user.avatar,
  coverImage: user.coverImage,
  phoneNo: user.phoneNo,
  address: user.address,
  location: user.location,
  website: user.website,
  socialLinks: user.socialLinks,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Welcome to the blog",
        html: `
          <h2>Welcome, ${name.trim()}!</h2>
          <p>Your account has been created successfully.</p>
          <p>You can now log in and start using the blog platform.</p>
        `,
      });
    } catch (emailError) {
      console.error("Welcome email failed:", emailError.message);
    }

    const token = createToken(user);

    res.status(201).json({
      token,
      user: buildUserResponse(user),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.json({
      token,
      user: buildUserResponse(user),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const contact = await Contact.findOne({
      userId: req.user.id,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      // keep existing shape
      user: buildUserResponse(user),
      contact,

      // redundant fields for frontend compatibility (prevents fallback to literal "user")
      name: user.name,
      userName: user.name,
      username: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      bio,
      location,
      website,
      socialLinks,
    } = req.body;

    const avatarFile = req.files?.avatar?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    let avatar = req.body.avatar;
    let coverImage = req.body.coverImage;

    if (avatarFile) {
      avatar = await uploadToCloudinary(
        avatarFile.buffer,
        `profile-avatar-${req.user.id}-${Date.now()}`
      );
    }

    if (coverImageFile) {
      coverImage = await uploadToCloudinary(
        coverImageFile.buffer,
        `profile-cover-${req.user.id}-${Date.now()}`
      );
    }

    if (name !== undefined) {
      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Name cannot be empty" });
      }

      user.name = name.trim();
    }

    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (coverImage !== undefined) user.coverImage = coverImage;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: buildUserResponse(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto
      .randomBytes(20)
      .toString("hex");

    // Save token to DB
    user.resetPasswordToken = resetToken;

    // 15 mins
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    // TODO: Send email here using nodemailer

    res.json({
      success: true,
      message: "Password reset link generated",
      resetLink, // remove in production
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Update password
    user.password = hashedPassword;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
