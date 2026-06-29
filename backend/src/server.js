import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve()

// middleware
if (process.env.NODE_ENV !== "prodcution"){
    app.use(cors({
        origin: "http://localhost:5173"
    })); // cors
}
app.use(express.json()); // will parse json body
app.use(rateLimiter); // rate limiter

// simple applications
// other application auth check ans rate limiting (req)
// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist","index.html"))
    })
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT)
    })
});
