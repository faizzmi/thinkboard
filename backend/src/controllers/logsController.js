import logger from "../config/logger.js";

export async function logClientError(req, res) {
    try {
        const { message, stack, componentStack, url, userAgent } = req.body;

        logger.error(`Frontend crash: ${message}`, {
            source: "frontend",
            stack,
            componentStack,
            url,
            userAgent,
        });

        res.status(204).send();
    } catch (error) {
        logger.error("Failed to log client error", { error: error.message });
        res.status(500).json({ message: "Failed to log error" });
    }
}