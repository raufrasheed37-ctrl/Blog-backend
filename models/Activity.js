import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "reply",
        "restack",
        "subscribe",
      ],
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Efficiently retrieve a user's newest notifications.
activitySchema.index({
  recipient: 1,
  createdAt: -1,
});

// Efficiently retrieve unread notifications.
activitySchema.index({
  recipient: 1,
  read: 1,
  createdAt: -1,
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
