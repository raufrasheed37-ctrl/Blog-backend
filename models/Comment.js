import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    postId: {
      type: String, // later can be ObjectId
      required: true,
    },

    user: {
      type: String,
      default: "temp-user",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Comment", commentSchema);

