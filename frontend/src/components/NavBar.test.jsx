import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("show logo text", () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    // expect(
    //   screen.getByText((_, element) => element?.textContent === "ThinkBoard")
    // ).toBeInTheDocument(); // check for combiend or nested word sinc ei sepearate the logo test into two words "Think" and "Board" in the NavBar component
    // simple way
  expect(screen.getByText("Think")).toBeInTheDocument();
  expect(screen.getByText("Board")).toBeInTheDocument();
  });
// more robust way without spliting or combining the logo text
  it("show logo link to home", () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    const logoLink = screen.getByRole("link", { name: /think.*board/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("show New Note button on non create page", () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    expect(screen.getByText(/New Note/i)).toBeInTheDocument();
  });
});