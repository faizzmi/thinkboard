import Note from "../models/Note.js";
import logger from "../config/logger.js";
import { generateRawToken } from "../utils/tokens.js";
import PDFDocument from "pdfkit";

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

export async function toggleShare(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.shareEnabled = !note.shareEnabled;
        if (note.shareEnabled && !note.shareToken) {
            note.shareToken = generateRawToken();
        }
        await note.save();

        res.status(200).json({
            shareEnabled: note.shareEnabled,
            shareToken: note.shareEnabled ? note.shareToken : null,
        });
    } catch (error) {
        logger.error("Error in toggleShare", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSharedNote(req, res) {
    try {
        const note = await Note.findOne({ shareToken: req.params.token, shareEnabled: true });
        if (!note) return res.status(404).json({ message: "Shared note not found" });

        res.status(200).json({
            title: note.title,
            content: note.content,
            type: note.type,
            priority: note.priority,
            deadline: note.deadline,
            location: note.location,
            checklist: note.checklist,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    } catch (error) {
        logger.error("Error in getSharedNote", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function exportNotePdf(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found" });

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${note.title.replace(/[^a-z0-9]/gi, "_")}.pdf"`);
        doc.pipe(res);

        doc.fontSize(20).text(note.title, { underline: false });
        doc.moveDown(0.5);
        doc.fontSize(9).fillColor("#888").text(`Created ${note.createdAt.toDateString()}`);
        doc.moveDown(1);
        doc.fontSize(12).fillColor("#000").text(note.content, { align: "left" });

        if (note.deadline) {
            doc.moveDown(1);
            doc.fontSize(11).fillColor("#333").text(`Deadline: ${new Date(note.deadline).toLocaleString()}`);
        }
        if (note.location) {
            doc.fontSize(11).fillColor("#333").text(`Location: ${note.location}`);
        }
        if (note.checklist?.length > 0) {
            doc.moveDown(1);
            doc.fontSize(12).fillColor("#000").text("Checklist:");
            note.checklist.forEach((item) => {
                doc.fontSize(11).text(`${item.done ? "[x]" : "[ ]"} ${item.text}`);
            });
        }

        doc.end();
    } catch (error) {
        logger.error("Error in exportNotePdf", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}