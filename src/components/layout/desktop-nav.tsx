import { NAV_ITEMS } from "@/data";
import Link from "next/link";
import AuthLinks from "./auth-links";
import NavDropdown from "./nav-dropdown";
import SubmenuList from "./submenu-list";

export default function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="ml-15.75 hidden grow items-center lg:flex"
    >
      <ul className="flex items-center gap-10">
        {NAV_ITEMS.map(({ label, submenu }) =>
          submenu ? (
            <NavDropdown key={label} label={label} align={submenu.align}>
              <SubmenuList links={submenu.links} variant="desktop" />
            </NavDropdown>
          ) : (
            <li key={label}>
              <Link
                href="/"
                className="text-nav text-muted transition-[color] hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ),
        )}
      </ul>
      <AuthLinks variant="desktop" className="ml-auto" />
    </nav>
  );
}
