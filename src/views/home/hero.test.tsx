import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import Hero from "./hero";

describe("Hero", () => {
  it("leads with the page's only h1", () => {
    render(<Hero />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Make remote work" }),
    ).toBeInTheDocument();
  });

  it("loads the hero image eagerly as the LCP, hidden from assistive tech", () => {
    const { container } = render(<Hero />);
    const image = container.querySelector("picture img");

    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).not.toHaveAttribute("loading");
    expect(image).toHaveAttribute("width");
    expect(image).toHaveAttribute("height");
  });

  it("swaps in the portrait crop at 1x and 2x from 48rem, sized to avoid a shift", () => {
    const { container } = render(<Hero />);
    const source = container.querySelector("picture source");

    expect(source).toHaveAttribute("media", "(min-width: 48rem)");
    expect(source?.getAttribute("srcset")).toMatch(
      /image-hero-desktop\.webp 1x, \S*image-hero-desktop-2x\.webp 2x$/,
    );
    expect(source).toHaveAttribute("width");
    expect(source).toHaveAttribute("height");
  });

  it("offers Learn more as a link", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("names each client logo in a labelled list", () => {
    render(<Hero />);
    const clients = screen.getByRole("list", { name: "Clients" });

    expect(
      within(clients)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["Databiz", "Audiophile", "Meet", "Maker"]);
  });
});
