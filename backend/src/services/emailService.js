import { Resend } from "resend";
import logger from "../config/logger.js";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM || "ThinkBoard <onboarding@resend.dev>";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export async function sendWelcomeEmail(user) {
    if (!resend) {
        console.warn("Resend API key not set, skipping email send.");
        return;
    }
    const verifyUrl = `${FRONTEND_URL}/verify-email?token=${rawToken}`;
    try {
        await resend.emails.send({
            from: FROM,
            to: user.email,
            subject: "Welcome to ThinkBoard",
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h2>Welcome, ${user.name}!</h2>
                    <p>Your ThinkBoard account has been created. Start capturing your thoughts right away.</p>
                    <a href="${FRONTEND_URL}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;">
                        Open ThinkBoard
                    </a>
                </div>
            `,
        });
    } catch (error) {
        logger.error("Failed to send welcome email", { error: error.message, userId: user._id });
    }
}

export async function sendVerificationEmail(user, rawToken) {
    const verifyUrl = `${FRONTEND_URL}/verify-email?token=${rawToken}`;
    try {
        await resend.emails.send({
            from: FROM,
            to: user.email,
            subject: "Verify your email",
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h2>Verify your email</h2>
                    <p>Click the link below to verify your ThinkBoard account. This link expires in 24 hours.</p>
                    <a href="${verifyUrl}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;">
                        Verify email
                    </a>
                    <p style="color:#888;font-size:12px;margin-top:16px;">If you didn't create this account, ignore this email.</p>
                </div>
            `,
        });
    } catch (error) {
        logger.error("Failed to send verification email", { error: error.message, userId: user._id });
    }
}

export async function sendPasswordResetEmail(user, rawToken) {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`;
    try {
        await resend.emails.send({
            from: FROM,
            to: user.email,
            subject: "Reset your password",
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h2>Reset your password</h2>
                    <p>Click the link below to reset your password. This link expires in 1 hour.</p>
                    <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;">
                        Reset password
                    </a>
                    <p style="color:#888;font-size:12px;margin-top:16px;">If you didn't request this, ignore this email — your password won't change.</p>
                </div>
            `,
        });
    } catch (error) {
        logger.error("Failed to send password reset email", { error: error.message, userId: user._id });
    }
}