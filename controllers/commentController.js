import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

//  CREATE COMMENT
export const createComment = async (
  req,
  res
) => {
  try {
    const {
      text,
      postId,
      parentComment,
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message:
          "Comment cannot be empty",
      });
    }

    const comment =
      await Comment.create({
        text,
        postId,
        user: req.user.id,
        parentComment:
          parentComment || null,
      });

    // INCREASE REPLY COUNT
    if (parentComment) {
      await Comment.findByIdAndUpdate(
        parentComment,
        {
          $inc: { replyCount: 1 },
        }
      );
    }

    // INCREASE POST COMMENT COUNT
    await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { commentCount: 1 },
      }
    );

    res.status(201).json(comment);
  } catch (error) {
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

    comment.text = text;

    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
