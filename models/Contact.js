import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    address: {
      type: String,
      required: true,
    },

    bio: String,

    website: String,

    occupation: String,

    company: String,

    socialLinks: {
      twitter: String,
      instagram: String,
      facebook: String,
      linkedin: String,
      github: String,
      youtube: String,
    },

    privacy: {
      phoneNo: {
        type: String,
        default: "only_me",
      },
      email: {
        type: String,
        default: "only_me",
      },
      address: {
        type: String,
        default: "subscribers",
      },
      website: {
        type: String,
        default: "everyone",
      },
      followersList: {
        type: String,
        default: "everyone",
      },
      subscriptionsList: {
        type: String,
        default: "everyone",
      },
      bio: {
        type: String,
        default: "everyone",
      },
      occupation: {
        type: String,
        default: "everyone",
      },
      company: {
        type: String,
        default: "everyone",
      },
      twitter: {
        type: String,
        default: "everyone",
      },
      instagram: {
        type: String,
        default: "everyone",
      },
      facebook: {
        type: String,
        default: "everyone",
      },
      linkedin: {
        type: String,
        default: "everyone",
      },
      github: {
        type: String,
        default: "everyone",
      },
      youtube: {
        type: String,
        default: "everyone",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contacts", contactSchema )
