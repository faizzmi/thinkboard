import ratelimit from "../config/upstash.js";
import logger from "../config/logger.js";

const ipRateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.ip);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again in a moment.",
            });
        }

        next();
    } catch (error) {
        logger.error("Rate limiter error", { error: error.message });
        next(error);
    }
};

export default ipRateLimiter;