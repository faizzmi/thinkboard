import express from "express";
import { createNote, deleteNotes, getAllNotes, getNotebyId, updateNotes, toggleShare, exportNotePdf } from "../controllers/notesController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import userRateLimiter from "../middleware/userRateLimiter.js";

const router = express.Router();

router.get("/", protectRoute, userRateLimiter, getAllNotes);
router.get("/:id", protectRoute, userRateLimiter, getNotebyId);
router.post("/", protectRoute, userRateLimiter, createNote);
router.put("/:id", protectRoute, userRateLimiter, updateNotes);
router.delete("/:id", protectRoute, userRateLimiter, deleteNotes);
router.put("/:id/share", protectRoute, userRateLimiter, toggleShare);
router.get("/:id/pdf", protectRoute, userRateLimiter, exportNotePdf);

export default router;