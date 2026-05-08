import express from "express";
import { login, register, getMe, forgetPassword, resetPassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.post("/forgot-password", forgetPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
