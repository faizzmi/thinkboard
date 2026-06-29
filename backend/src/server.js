import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

// middleware
app.use(express.json()); // will parse json body

// simple applications
// other application auth check ans rate limiting (req)
// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
