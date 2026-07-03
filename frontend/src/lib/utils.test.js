// frontend/src/lib/utils.test.js
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  formatDate,
  isOverdue,
  getPriorityColor,
  getDaysUntil,
  getInitials,
} from "./utils";

describe("formatDate", () => {
  it("formats a date as 'Mon D, YYYY'", () => {
    expect(formatDate(new Date(2026, 6, 4))).toBe("Jul 4, 2026");
  });
});

describe("isOverdue", () => {
  afterEach(() => vi.useRealTimers());

  it("returns false when deadline is null", () => {
    expect(isOverdue(null)).toBe(false);
  });

  it("returns true for a past deadline", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4));
    expect(isOverdue(new Date(2026, 6, 1).toISOString())).toBe(true);
  });

  it("returns false for a future deadline", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4));
    expect(isOverdue(new Date(2026, 6, 10).toISOString())).toBe(false);
  });
});

describe("getPriorityColor", () => {
  it.each([
    ["high", "error"],
    ["medium", "warning"],
    ["low", "info"],
    ["unknown", "neutral"],
  ])("maps priority %s to badge color %s", (priority, expected) => {
    expect(getPriorityColor(priority)).toBe(expected);
  });
});

describe("getDaysUntil", () => {
  afterEach(() => vi.useRealTimers());

  it("returns 'Today' for the current day", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4, 9, 0, 0));
    expect(getDaysUntil(new Date(2026, 6, 4, 18, 0, 0))).toBe("Today");
  });

  it("returns 'Tomorrow' for the next day", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4));
    expect(getDaysUntil(new Date(2026, 6, 5))).toBe("Tomorrow");
  });

  it("returns overdue phrasing for a past date", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4));
    expect(getDaysUntil(new Date(2026, 6, 1))).toBe("3d overdue");
  });

  it("returns 'In Nd' for a future date", () => {
    vi.useFakeTimers().setSystemTime(new Date(2026, 6, 4));
    expect(getDaysUntil(new Date(2026, 6, 9))).toBe("In 5d");
  });
});

describe("getInitials", () => {
  it("returns '?' for empty input", () => {
    expect(getInitials("")).toBe("?");
    expect(getInitials(undefined)).toBe("?");
  });

  it("returns first + last initial for a full name", () => {
    expect(getInitials("Muhammad Faiz")).toBe("MF");
  });

  it("returns a single initial for a one-word name", () => {
    expect(getInitials("Faiz")).toBe("F");
  });

  it("ignores extra whitespace between names", () => {
    expect(getInitials("  Muhammad   Faiz  ")).toBe("MF");
  });
});