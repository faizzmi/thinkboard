import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:5173"
})); // cors
app.use(express.json()); // will parse json body
app.use(rateLimiter); // rate limiter

// simple applications
// other application auth check ans rate limiting (req)
// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT)
    })
});
