import ratelimit from "../config/upstash.js";

const userRateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.ip);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }

        next();
    } catch (error) {
        console.log(`User rate limit error, ${error}`);
        next(error);
    }
};

export default userRateLimiter;