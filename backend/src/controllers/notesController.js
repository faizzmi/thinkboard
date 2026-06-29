import Note from "../models/Note.js";


export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({createAt: -1})// n-1 will sort in desc order (newest first)
        if (notes.length == 0) return res.status(404).json({message: "No Note Exists"})

        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllError",error)
        res.status(500).json({message: "Internal Server Error"})
    }
}


export async function getNotebyId (req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        if (!notes) return res.status(400).json({message: "No Note found"})

        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getNotebyId",error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export async function createNote (req, res) {
    try {
        const {title, content} = req.body
        const newNotes = new Note({title, content})

        await newNotes.save();
        res.status(200).json({message: "Note Created Succesfully!"});
    } catch (error) {
        console.error("Error in createNote Function",error)
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

export async function updateNotes(req, res){
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, { new:true});
        if (!updatedNote) return res.status(404).json({message:"No Note found"})

        res.status(200).json({message: "Note updated succesfully!"});
        
    } catch (error) {
        console.error("Error in updateNote Function",error)
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

export async function deleteNotes(req, res){
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message:"No Note found"})

        res.status(200).json({message: "Note deleted succesfully!"});
        
    } catch (error) {
        console.error("Error in updateNote Function",error)
        res.status(500).json({message: "Internal Server Error"})
        
    }
}
