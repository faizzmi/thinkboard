import mongoose from "mongoose";

// 1 create schemas
// 2 model from schemas

const noteSchem = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    {timestamps: true} // createdAt, updatedAt
);


const Note = mongoose.model("Note", noteSchem);

export default Note;