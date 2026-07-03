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