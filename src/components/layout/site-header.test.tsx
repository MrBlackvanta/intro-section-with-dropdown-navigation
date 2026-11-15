import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import SiteHeader from "./site-header";

function setup() {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const nav = screen.getByRole("navigation", { name: "Primary" });
  const trigger = (name: string) => within(nav).getByRole("button", { name });
  const panelOf = (button: HTMLElement) =>
    document.getElementById(button.getAttribute("aria-controls") ?? "");

  return { user, nav, trigger, panelOf };
}

describe("SiteHeader", () => {
  it("names the brand logo", () => {
    setup();

    expect(screen.getByRole("img", { name: "snap" })).toBeInTheDocument();
  });

  it("lists every primary destination", () => {
    const { nav } = setup();

    for (const name of ["Careers", "About", "Login", "Register"]) {
      expect(within(nav).getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("starts with both submenus collapsed and inert", () => {
    const { trigger, panelOf } = setup();

    for (const name of ["Features", "Company"]) {
      expect(trigger(name)).toHaveAttribute("aria-expanded", "false");
      expect(panelOf(trigger(name))).toHaveAttribute("inert");
    }
  });

  it("opens the panel the trigger controls on click", async () => {
    const { user, trigger, panelOf } = setup();

    await user.click(trigger("Features"));

    const panel = panelOf(trigger("Features"));
    expect(trigger("Features")).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("inert");
    expect(
      within(panel!)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["Todo List", "Calendar", "Reminders", "Planning"]);
  });

  it("closes again on a second click", async () => {
    const { user, trigger, panelOf } = setup();

    await user.click(trigger("Company"));
    await user.click(trigger("Company"));

    expect(trigger("Company")).toHaveAttribute("aria-expanded", "false");
    expect(panelOf(trigger("Company"))).toHaveAttribute("inert");
  });

  it("keeps one submenu open at a time", async () => {
    const { user, trigger } = setup();

    await user.click(trigger("Features"));
    await user.click(trigger("Company"));

    expect(trigger("Features")).toHaveAttribute("aria-expanded", "false");
    expect(trigger("Company")).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on a click outside but not on a click inside the panel", async () => {
    const { user, trigger, panelOf } = setup();

    await user.click(trigger("Features"));
    await user.click(panelOf(trigger("Features"))!);
    expect(trigger("Features")).toHaveAttribute("aria-expanded", "true");

    await user.click(document.body);
    expect(trigger("Features")).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape and hands focus back from inside the panel", async () => {
    const { user, trigger } = setup();

    await user.click(trigger("Company"));
    await user.tab();
    expect(screen.getByRole("link", { name: "History" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(trigger("Company")).toHaveAttribute("aria-expanded", "false");
    expect(trigger("Company")).toHaveFocus();
  });

  it("closes when focus tabs past the last submenu link", async () => {
    const { user, trigger } = setup();

    await user.click(trigger("Company"));
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("link", { name: "Blog" })).toHaveFocus();

    await user.tab();

    expect(screen.getByRole("link", { name: "Careers" })).toHaveFocus();
    expect(trigger("Company")).toHaveAttribute("aria-expanded", "false");
  });
});
