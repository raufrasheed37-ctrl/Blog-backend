import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// ✅ CREATE POST
export const createPost = async (req, res) => {
  try {
    console.log("🔵 CreatePost called - Auth User:", req.user);
    console.log("📦 Request body:", req.body);
    let coverImageUrl = req.body.coverImage;
    const authenticatedUserId = req.user?.id;

    // Use the authenticated user as the author when available.
    const author = authenticatedUserId || req.body.author;

    if (!author || !mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    // Optional: ensure referenced user exists
    const userExists = await User.findById(author).select("_id");
    if (!userExists) {
      return res.status(400).json({ message: "Author not found" });
    }

    // If file is uploaded, upload to Cloudinary
    if (req.file) {
      coverImageUrl = await uploadToCloudinary(
        req.file.buffer,
        `blog-${Date.now()}`
      );
    }

    const { title, content, excerpt, tags, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }

    const post = await Post.create({
      title,
      content,
      excerpt,
      coverImage: coverImageUrl,
      tags: tags || [],
      author,
      published: published !== undefined ? published : true,
    });

    await post.populate("author", "name email");

    res.status(201).json(post);
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL PUBLISHED POSTS
export const getAllPosts = async (req, res) => {
  try {
    const { limit = 10, skip = 0, featured } = req.query;

    let query = { published: true };

    if (featured === "true") {
      query.featured = true;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate("author", "name email");

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET POST BY ID OR SLUG
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    let post;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id).populate("author", "name email");
    } else {
      post = await Post.findOne({ slug: id }).populate("author", "name email");
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, coverImage, tags, published, featured } =
      req.body;
    const userId = req.user?.id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (tags) post.tags = tags;
    if (published !== undefined) post.published = published;
    if (featured !== undefined) post.featured = featured;

    await post.save();
    await post.populate("author", "name email");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE POST (only author can delete)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET POSTS BY AUTHOR
export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const { limit = 10, skip = 0 } = req.query;

    const posts = await Post.find({ author: authorId, published: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate("author", "name email");

    const total = await Post.countDocuments({
      author: authorId,
      published: true,
    });

    res.json({
      posts,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET FEATURED POSTS
export const getFeaturedPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const posts = await Post.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("author", "name email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
