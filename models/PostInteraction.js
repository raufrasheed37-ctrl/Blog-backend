import mongoose from "mongoose";

const postInteractionSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["like", "restack"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user can like or restack a post only once per interaction type.
postInteractionSchema.index(
  { post: 1, user: 1, type: 1 },
  { unique: true }
);

const PostInteraction = mongoose.model(
  "PostInteraction",
  postInteractionSchema
);

export default PostInteraction;
