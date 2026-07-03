import express from "express";
import { getSharedNote } from "../controllers/notesController.js";
import userRateLimiter from "../middleware/userRateLimiter.js";

const router = express.Router();

router.get("/notes/:token", userRateLimiter, getSharedNote);

export default router;