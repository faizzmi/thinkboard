import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true },
        done: { type: Boolean, default: false },
    },
    { _id: true }
);

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["note", "task", "event"],
            default: "note",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        deadline: {
            type: Date,
            default: null,
        },
        location: {
            type: String,
            default: "",
            trim: true,
        },
        checklist: {
            type: [checklistItemSchema],
            default: [],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;