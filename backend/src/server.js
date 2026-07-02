import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"

// logger and error handler
import morgan from "morgan";
import logger from "./config/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import logsRoutes from "./routes/logsRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve()

// middleware
if (process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    })); // cors
}
app.use(express.json()); // will parse json body
app.use(rateLimiter); // rate limiter
app.use(morgan(
"combined", {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));

// simple applications
// other application auth check ans rate limiting (req)
// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);
app.use("/api/logs", logsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception", { message: err.message, stack: err.stack });
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection", { reason });
    process.exit(1);
});

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
