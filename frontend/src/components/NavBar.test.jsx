import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NavBar from "./NavBar";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

const renderNavBar = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider>
          <NavBar />
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe("NavBar", () => {
  it("show logo text", () => {
    renderNavBar();
    expect(screen.getByText("Think")).toBeInTheDocument();
    expect(screen.getByText("Board")).toBeInTheDocument();
  });

  it("show logo link to home", () => {
    renderNavBar();
    const logoLink = screen.getByRole("link", { name: /think.*board/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("show New Note button on non create page", () => {
    renderNavBar();
    expect(screen.getByText(/New Note/i)).toBeInTheDocument();
  });
});