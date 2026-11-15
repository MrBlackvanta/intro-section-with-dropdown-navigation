import { mediaListenerCount, setMediaMatch } from "@/test/media";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import MobileMenu from "./mobile-menu";
import MobileNav from "./mobile-nav";

const DESKTOP = "(min-width: 64rem)";

function renderMenu() {
  const user = userEvent.setup();
  render(
    <MobileMenu>
      <MobileNav />
    </MobileMenu>,
  );
  const toggle = screen.getByRole("button", { name: "Open menu" });
  return { user, toggle };
}

async function openMenu() {
  const { user, toggle } = renderMenu();
  await user.click(toggle);
  const dialog = screen.getByRole("dialog", { name: "Menu" });
  return { user, toggle, dialog };
}

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("keeps the drawer closed until the toggle is pressed", () => {
    const { toggle } = renderMenu();

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the navigation as a modal dialog the toggle controls", async () => {
    const { toggle, dialog } = await openMenu();

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("open");

    const nav = within(dialog).getByRole("navigation", { name: "Primary" });
    for (const name of ["Features", "Company"]) {
      expect(within(nav).getByRole("button", { name })).toBeInTheDocument();
    }
    for (const name of ["Careers", "About", "Login", "Register"]) {
      expect(within(nav).getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("leads with the close button, which showModal focuses first", async () => {
    const { dialog } = await openMenu();

    expect(
      within(dialog).getByRole("button", { name: "Close menu" }),
    ).toHaveFocus();
  });

  it("closes from its close button and refocuses the toggle", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(
      within(dialog).getByRole("button", { name: "Close menu" }),
    );

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dialog).not.toHaveAttribute("open");
    expect(toggle).toHaveFocus();
  });

  it("refocuses the toggle even when opening did not focus it, as in Safari", async () => {
    const { user, toggle } = renderMenu();
    act(() => toggle.click());
    expect(toggle).not.toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const { user, toggle } = await openMenu();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on a click on the scrim but not on the drawer", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(within(dialog).getByRole("navigation"));
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(dialog);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes once a link is chosen", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(within(dialog).getByRole("link", { name: "Careers" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("pins the page while open, then restores the scroll position", async () => {
    const { user, dialog } = await openMenu();

    expect(document.body.style.position).toBe("fixed");

    await user.click(
      within(dialog).getByRole("button", { name: "Close menu" }),
    );

    expect(document.body.style.position).toBe("");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "instant",
    });
  });

  it("closes itself and releases the page when the desktop nav takes over", async () => {
    const { toggle } = await openMenu();
    expect(mediaListenerCount(DESKTOP)).toBe(1);

    act(() => setMediaMatch(DESKTOP, true));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.position).toBe("");
    expect(mediaListenerCount(DESKTOP)).toBe(0);
  });

  it("expands each submenu in place, independently", async () => {
    const { user, dialog } = await openMenu();
    const features = within(dialog).getByRole("button", { name: "Features" });
    const company = within(dialog).getByRole("button", { name: "Company" });
    const panelOf = (button: HTMLElement) =>
      document.getElementById(button.getAttribute("aria-controls") ?? "")!;

    expect(features).toHaveAttribute("aria-expanded", "false");
    expect(panelOf(features)).not.toBeVisible();

    await user.click(features);
    await user.click(company);

    expect(features).toHaveAttribute("aria-expanded", "true");
    expect(company).toHaveAttribute("aria-expanded", "true");
    expect(
      within(panelOf(features))
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["Todo List", "Calendar", "Reminders", "Planning"]);
    expect(
      within(panelOf(company)).getByRole("link", { name: "Blog" }),
    ).toBeVisible();

    await user.click(features);

    expect(features).toHaveAttribute("aria-expanded", "false");
    expect(panelOf(features)).not.toBeVisible();
  });
});
