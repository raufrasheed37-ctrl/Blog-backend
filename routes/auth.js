import express from "express";
import { login, register, getMe, updateMe, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
// router.put(
// 	"/me",
// 	protect,
// 	upload.fields([
// 		{ name: "avatar", maxCount: 1 },
// 		{ name: "coverImage", maxCount: 1 },
// 	]),
// 	updateMe
// );
router.put(
  "/me",
  protect,
  upload.single("profileImage"),
  updateMe
);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
