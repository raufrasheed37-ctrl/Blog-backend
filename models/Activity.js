import mongoose from "mongoose";

const activitySchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      actor: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: [
          "like",
          "comment",
          "reply",
          "mention",
          "subscribe",
          "restack",
        ],
        required: true,
      },

      post: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },

      content: {
        type: String,
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

export default mongoose.model(
  "Activity",
  activitySchema
);
