import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Activity from "../models/Activity.js";

//  CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { text, postId, parentComment } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    if (!postId) {
      return res.status(400).json({
        message: "Post ID required",
      });
    }

    const comment = await Comment.create({
      text,
      postId,
      user: req.user.id,
      parentComment: parentComment || null,
    });

    if (
  post.author.toString() !==
  req.user.id.toString()
) {
  await Activity.create({
    user: post.author,
    actor: req.user.id,
    type: "comment",
    post: post._id,
    content: comment.content,
  });
}

    // populate user
    await comment.populate("user", "name email");

    // increase reply count
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $inc: { replyCount: 1 },
      });
    }

    // increase post comment count
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentCount: 1 },
    });

    res.status(201).json(comment);

  } catch (error) {
    console.log("CREATE COMMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET COMMENTS BY POST
export const getComments = async (
  req,
  res
) => {
  try {
    const comments =
      await Comment.find({
        postId: req.params.postId,
        parentComment: null,
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    const commentsWithReplies =
      await Promise.all(
        comments.map(
          async (comment) => {
            const replies =
              await Comment.find({
                parentComment:
                  comment._id,
              })
                .populate(
                  "user",
                  "name"
                )
                .sort({
                  createdAt: 1,
                });

            return {
              ...comment.toObject(),
              replies,
            };
          }
        )
      );

    res.json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE COMMENT
export const deleteComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.findById(
        req.params.id
      );

    if (!comment) {
      return res.status(404).json({
        message:
          "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "Not authorized",
      });
      
    }

    // DECREASE POST COMMENT COUNT
    await Post.findByIdAndUpdate(
      comment.postId,
      {
        $inc: { commentCount: -1 },
      }
    );

    await comment.deleteOne();

    res.json({
      message:
        "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE COMMENT
export const updateComment = async (
  req,
  res
) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message:
          "Comment cannot be empty",
      });
    }

    const comment =
      await Comment.findById(
        req.params.id
      );

    if (!comment) {
      return res.status(404).json({
        message:
          "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "Not authorized",
      });
      
    }

    comment.text = text;

    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// TOGGLE COMMENT LIKE
export const toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const userId = req.user.id;

    // create likedBy if it doesn't exist
    if (!comment.likedBy) {
      comment.likedBy = [];
    }

    const alreadyLiked = comment.likedBy.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      comment.likedBy = comment.likedBy.filter(
        (id) => id.toString() !== userId
      );

      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      comment.likedBy.push(userId);
      comment.likes += 1;
    }

    await comment.save();

    res.json({
      likes: comment.likes,
      liked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
