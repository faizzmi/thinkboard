import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import NavBar from "./NavBar";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ShortcutsModalProvider } from "../context/ShortcutsModalContext";
import api from "../lib/axios";

vi.mock("../lib/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: { request: { use: vi.fn() } },
  },
}));

const mockUser = {
  _id: "1",
  name: "Test User",
  email: "test@example.com",
  theme: "light",
  emailVerified: true,
};

const renderNavBar = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider>
          <ShortcutsModalProvider>
            <NavBar />
          </ShortcutsModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe("NavBar", () => {
  beforeEach(() => {
    localStorage.setItem("token", "fake-token");
    api.get.mockResolvedValue({ data: mockUser });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("show logo text", async () => {
    renderNavBar();
    const logos = await screen.findAllByText("Think");
    expect(logos.length).toBeGreaterThan(0);
    expect(screen.getAllByText("Board").length).toBeGreaterThan(0);
  });

  it("show logo link to home", async () => {
    renderNavBar();
    const logoLinks = await screen.findAllByRole("link", { name: /think.*board/i });
    logoLinks.forEach((link) => expect(link).toHaveAttribute("href", "/"));
  });

  it("show New Note button on non create page", async () => {
    renderNavBar();
    const newNoteButtons = await screen.findAllByLabelText(/new note/i);
    expect(newNoteButtons.length).toBeGreaterThan(0);
  });
});