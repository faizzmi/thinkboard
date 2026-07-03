export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function isOverdue(deadline) {
    if (!deadline) return false;
    return new Date(deadline).getTime() < Date.now();
}

export function getPriorityColor(priority) {
    switch (priority) {
        case "high":
            return "error";
        case "medium":
            return "warning";
        case "low":
            return "info";
        default:
            return "neutral";
    }
}

export function getDaysUntil(date) {
    const target = new Date(date);
    const now = new Date();
    const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((targetDay - nowDay) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days < 0) return `${Math.abs(days)}d overdue`;
    return `In ${days}d`;
}

export function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}