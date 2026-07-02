import express from "express";
import { logClientError } from "../controllers/logsController.js";

const router = express.Router();

router.post("/client-error", logClientError);

export default router;