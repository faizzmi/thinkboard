import express from "express";
import {
    signup,
    login,
    getMe,
    updateTheme,
    updateProfile,
    changePassword,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    checkEmail,
    logout
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import authRateLimiter from "../middleware/authRateLimiter.js";

const router = express.Router();

router.get("/check-email", authRateLimiter, checkEmail);

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.put("/theme", protectRoute, updateTheme);
router.put("/profile", protectRoute, updateProfile);
router.put("/change-password", protectRoute, authRateLimiter, changePassword);

router.get("/verify-email", verifyEmail);
router.post("/resend-verification", protectRoute, authRateLimiter, resendVerification);

router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/logout", protectRoute, logout);
export default router;