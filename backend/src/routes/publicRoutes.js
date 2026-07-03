import express from "express";
import { getSharedNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/notes/:token", getSharedNote);

export default router;