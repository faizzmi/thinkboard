import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv" 

dotenv.config();

const redis = Redis.fromEnv();

// allow 10 request per 10 second
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "100 s")
});

// stricter limit for auth-sensitive routes (forgot-password, resend-verification)
export const authRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
});

export default ratelimit;