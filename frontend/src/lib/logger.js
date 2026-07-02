import api from "./axios";

export function logClientError({ message, stack, componentStack }) {
    api.post("/api/logs/client-error", {
        message,
        stack,
        componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
    }).catch(() => {
        // silently fail, don't crash app trying to report a crash
    });
}