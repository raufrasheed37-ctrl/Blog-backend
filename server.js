import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import contactRoutes from "./routes/contact.js";
import subscribeRoutes from "./routes/subscribe.js";
import authorRoutes from "./routes/authors.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);


app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/activity", activityRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("App is running 🚀");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
