import { authRatelimit } from "../config/upstash.js";

// 5 requests per 15 minutes, keyed by IP (user isn't authenticated at this point)
const authRateLimiter = async (req, res, next) => {
    try {
        const key = `auth:${req.ip}`;
        const { success } = await authRatelimit.limit(key);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again later.",
            });
        }

        next();
    } catch (error) {
        console.log(`Auth rate limit error, ${error}`);
        next(error);
    }
};

export default authRateLimiter;