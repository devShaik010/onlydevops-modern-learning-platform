import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App.jsx";

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("app routing", () => {
  it("renders the landing page on the home route", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByText(/learn devops/i)).toBeInTheDocument();
  });

  it("renders the architecture designer on /designArchitecture", () => {
    window.history.pushState({}, "", "/designArchitecture");

    render(<App />);

    expect(screen.getByText(/resource library/i)).toBeInTheDocument();
    expect(screen.getByText(/properties/i)).toBeInTheDocument();
  });
});
