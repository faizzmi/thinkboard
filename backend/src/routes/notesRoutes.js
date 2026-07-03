import express from "express";
import { createNote, deleteNotes, getAllNotes, getNotebyId, updateNotes, toggleShare, exportNotePdf, getDashboardData } from "../controllers/notesController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard/summary", protectRoute, getDashboardData);
router.get("/", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getNotebyId);
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, updateNotes);
router.delete("/:id", protectRoute, deleteNotes);
router.put("/:id/share", protectRoute, toggleShare);
router.get("/:id/pdf", protectRoute, exportNotePdf);

export default router;