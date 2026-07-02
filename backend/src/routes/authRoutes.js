import express from "express";
import { signup, login, getMe, updateTheme } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.put("/theme", protectRoute, updateTheme);

export default router;