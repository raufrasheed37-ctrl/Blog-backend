import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";

const PUBLIC_AUTHOR_FIELDS =
  "name bio avatar coverImage location website socialLinks subscribers subscribersList createdAt updatedAt";

export const getPublicAuthorProfile = async (req, res) => {
  try {
    const { authorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const author = await User.findById(authorId)
      .select(PUBLIC_AUTHOR_FIELDS)
      .lean();

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const [publishedPostCount, recentPosts] = await Promise.all([
      Post.countDocuments({ author: authorId, published: true }),
      Post.find({ author: authorId, published: true })
        .sort({ createdAt: -1 })
        .limit(6)
        .select(
          "title slug excerpt coverImage tags likes restacks commentCount featured publishedAt createdAt"
        )
        .lean(),
    ]);

    return res.json({
      author: {
        ...author,
        _id: author._id,
        id: author._id,
      },
      stats: {
        publishedPostCount,
      },
      recentPosts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
