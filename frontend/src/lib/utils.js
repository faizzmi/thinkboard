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
    const diff = new Date(date).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days < 0) return `${Math.abs(days)}d overdue`;
    return `In ${days}d`;
}