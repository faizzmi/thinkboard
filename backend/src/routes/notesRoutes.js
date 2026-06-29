import express from "express"
import { createNote, deleteNotes, getAllNotes, getNotebyId, updateNotes } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes); 
router.get("/:id", getNotebyId); 
router.post("/", createNote);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

export default router;