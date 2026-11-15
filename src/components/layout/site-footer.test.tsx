import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import SiteFooter from "./site-footer";

describe("SiteFooter", () => {
  it("is the contentinfo landmark that carries the signature", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Coded by Abdelrhman Abdelaal.",
    );
  });
});
