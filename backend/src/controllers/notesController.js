import Note from "../models/Note.js";
import logger from "../config/logger.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        logger.error("Error in getAllNotes", { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getNotebyId(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
        if (!note) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(note)
    } catch (error) {
        logger.error("Error in getNotebyId", { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content, type, priority, deadline, location, checklist } = req.body
        const newNote = new Note({
            title,
            content,
            type,
            priority,
            deadline: deadline || null,
            location,
            checklist,
            user: req.user._id,
        })
        await newNote.save()
        res.status(201).json({ message: "Note created successfully!" })
    } catch (error) {
        logger.error("Error in createNote", { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateNotes(req, res) {
    try {
        const { title, content, type, priority, deadline, location, checklist } = req.body
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content, type, priority, deadline: deadline || null, location, checklist },
            { new: true }
        )
        if (!updatedNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json({ message: "Note updated successfully!" })
    } catch (error) {
        logger.error("Error in updateNotes", { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteNotes(req, res) {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!deletedNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json({ message: "Note deleted successfully!" })
    } catch (error) {
        logger.error("Error in deleteNotes", { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Internal Server Error" })
    }
}