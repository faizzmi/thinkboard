import express from "express";
import {
    signup,
    login,
    getMe,
    updateTheme,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    checkEmail,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import authRateLimiter from "../middleware/authRateLimiter.js";

const router = express.Router();

router.get("/check-email", authRateLimiter, checkEmail);

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.put("/theme", protectRoute, updateTheme);

router.get("/verify-email", verifyEmail);
router.post("/resend-verification", protectRoute, authRateLimiter, resendVerification);

router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password", resetPassword);

export default router;