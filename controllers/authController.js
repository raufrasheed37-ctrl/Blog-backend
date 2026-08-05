import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js"
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
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
  avatar: user.avatar,
  profileImage: user.profileImage,
  coverImage: user.coverImage,
  bio: user.bio,
  phoneNo: user.phoneNo,
  address: user.address,
  website: user.website,
  occupation: user.occupation,
  company: user.company,
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
        subject: "Pulse Blogger",
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

export const forgotPassword = async (req, res) => {
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
  return res.json({
    success: true,
    message:
      "If an account with that email exists, a password reset link has been sent.",
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

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    

    await sendEmail({
  to: user.email,
  subject: "Reset Your Pulse Blogger Password",
  html: `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

      <div style="background:#7c6ff7;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;">Pulse Blogger</h1>
        <p style="margin-top:8px;color:#ede9fe;font-size:15px;">
          Password Reset Request
        </p>
      </div>

      <div style="padding:32px;color:#374151;line-height:1.7;">

        <h2 style="margin-top:0;color:#111827;">
          Hello ${user.name},
        </h2>

        <p>
          We received a request to reset the password for your <strong>Pulse Blogger</strong> account.
        </p>

        <p>
          Click the button below to create a new password. This link will expire in <strong>15 minutes</strong>.
        </p>

        <div style="text-align:center;margin:35px 0;">
          <a
            href="${resetLink}"
            style="
              display:inline-block;
              background:#7c6ff7;
              color:#ffffff;
              text-decoration:none;
              padding:14px 32px;
              border-radius:10px;
              font-size:16px;
              font-weight:600;
            "
          >
            Reset Password
          </a>
        </div>

        <p>
          If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>

        <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;">

        <p style="font-size:14px;color:#6b7280;">
          Thanks,<br>
          <strong>The Pulse Blogger Team</strong>
        </p>

      </div>

    </div>
  `,
});

res.json({
  success: true,
  message: "Password reset link sent successfully.",
});
  } catch (error) {
  console.error("Forgot Password Error:", error);
  console.error("Error message:", error.message);
  console.error("Stack:", error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
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


export const updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const {
      name,
      bio,
      phoneNo,
      address,
      website,
      occupation,
      company,
    } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phoneNo) user.phoneNo = phoneNo;
    if (address) user.address = address;
    if (website) user.website = website;
    if (occupation) user.occupation = occupation;
    if (company) user.company = company;

    // Upload profile image
    if (req.file) {
      const imageUrl = await uploadToCloudinary(
        req.file.buffer,
        `profile-${user._id}-${Date.now()}`
      );

      user.profileImage = imageUrl;
      user.avatar = imageUrl;
    }

    await user.save();

    res.json({
  success: true,
  message: "Profile updated successfully",
  user: buildUserResponse(user),
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
