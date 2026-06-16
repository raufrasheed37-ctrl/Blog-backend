import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    avatar: {
      type: String,
      trim: true,
      default: "",
    },
              
    profileImage: {
      type: String,
      trim: true,
      default: "",
    },

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    phoneNo: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    subscribers: {
      type: Number,
      default: 0,
    },

    subscribersList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    socialLinks: {
  twitter: {
    type: String,
    default: "",
  },

  instagram: {
    type: String,
    default: "",
  },

  facebook: {
    type: String,
    default: "",
  },

  linkedin: {
    type: String,
    default: "",
  },

  github: {
    type: String,
    default: "",
  },

  youtube: {
    type: String,
    default: "",
  },
},

occupation: {
  type: String,
  default: "",
},

company: {
  type: String,
  default: "",
},

privacy: {
  phoneNo: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "only_me",
  },

  email: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "only_me",
  },

  address: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "subscribers",
  },

  website: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "everyone",
  },

  followersList: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "everyone",
  },

  subscriptionsList: {
    type: String,
    enum: [
      "only_me",
      "mutuals",
      "subscribers",
      "everyone",
    ],
    default: "everyone",
  },
},

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
