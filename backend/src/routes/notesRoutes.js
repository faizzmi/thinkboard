import express from "express"
import { createNote, deleteNotes, getAllNotes, getNotebyId, updateNotes } from "../controllers/notesController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllNotes); 
router.get("/:id", protectRoute, getNotebyId); 
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, updateNotes);
router.delete("/:id", protectRoute, deleteNotes);

export default router;