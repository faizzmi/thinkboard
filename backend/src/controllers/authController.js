import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../config/logger.js";
import { generateRawToken, hashToken } from "../utils/tokens.js";
import {
    sendWelcomeEmail,
    sendVerificationEmail,
    sendPasswordResetEmail,
} from "../services/emailService.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const user = await User.create({ name, email, password });

        // generate + store verification token
        const rawToken = generateRawToken();
        user.verificationTokenHash = hashToken(rawToken);
        user.verificationTokenExpires = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);
        await user.save();

        // fire-and-forget emails, don't block signup response
        sendWelcomeEmail(user).catch((err) => logger.error("Welcome email failed", { err: err.message }));
        sendVerificationEmail(user, rawToken).catch((err) => logger.error("Verification email failed", { err: err.message }));

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            theme: user.theme,
            emailVerified: user.emailVerified,
            token: generateToken(user._id),
        });
    } catch (error) {
        logger.error("Error in signup", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            theme: user.theme,
            emailVerified: user.emailVerified,
            token: generateToken(user._id),
        });
    } catch (error) {
        logger.error("Error in login", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMe(req, res) {
    res.status(200).json(req.user);
}

export async function updateTheme(req, res) {
    try {
        const { theme } = req.body;
        req.user.theme = theme;
        await req.user.save();
        res.status(200).json({ theme: req.user.theme });
    } catch (error) {
        logger.error("Error in updateTheme", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function verifyEmail(req, res) {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Token required" });
        }

        const tokenHash = hashToken(token);
        const user = await User.findOne({
            verificationTokenHash: tokenHash,
            verificationTokenExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification link" });
        }

        user.emailVerified = true;
        user.verificationTokenHash = null;
        user.verificationTokenExpires = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        logger.error("Error in verifyEmail", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function resendVerification(req, res) {
    try {
        const user = req.user;

        if (user.emailVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }

        const rawToken = generateRawToken();
        user.verificationTokenHash = hashToken(rawToken);
        user.verificationTokenExpires = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);
        await user.save();

        sendVerificationEmail(user, rawToken).catch((err) =>
            logger.error("Resend verification email failed", { err: err.message })
        );

        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        logger.error("Error in resendVerification", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const user = await User.findOne({ email });

        // always respond the same way whether user exists or not (anti-enumeration)
        if (user) {
            const rawToken = generateRawToken();
            user.resetTokenHash = hashToken(rawToken);
            user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
            await user.save();

            sendPasswordResetEmail(user, rawToken).catch((err) =>
                logger.error("Password reset email failed", { err: err.message })
            );
        }

        res.status(200).json({ message: "A reset link has been sent" });
    } catch (error) {
        logger.error("Error in forgotPassword", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const tokenHash = hashToken(token);
        const user = await User.findOne({
            resetTokenHash: tokenHash,
            resetTokenExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset link" });
        }

        user.password = newPassword; // pre-save hook hashes it
        user.resetTokenHash = null;
        user.resetTokenExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        logger.error("Error in resetPassword", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function checkEmail(req, res) {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        logger.error("Error in checkEmail", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function updateProfile(req, res) {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }

        req.user.name = name.trim();
        await req.user.save();

        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            theme: req.user.theme,
            emailVerified: req.user.emailVerified,
        });
    } catch (error) {
        logger.error("Error in updateProfile", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new password required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters" });
        }

        const isMatch = await req.user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        req.user.password = newPassword; // pre-save hook hashes it
        await req.user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        logger.error("Error in changePassword", { error: error.message, stack: error.stack });
        res.status(500).json({ message: "Internal Server Error" });
    }
};
