import logger from "../config/logger.js";
import * as Sentry from "@sentry/node";

export const notFoundHandler = (req, res, next) => {
    logger.warn(`404 not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: "Route not found" });
};

export const errorHandler = (err, req, res, next) => {
    logger.error(`${err.message} at ${req.method} ${req.originalUrl}`, { stack: err.stack });
    Sentry.captureException(err);
    res.status(err.status || 500).json({ message: "Internal Server Error" });
};