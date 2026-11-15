import { NAV_ITEMS } from "@/data";
import Link from "next/link";
import AuthLinks from "./auth-links";
import MobileSubmenu from "./mobile-submenu";
import SubmenuList from "./submenu-list";

export default function MobileNav() {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-4">
        {NAV_ITEMS.map(({ label, submenu }) =>
          submenu ? (
            <MobileSubmenu key={label} label={label}>
              <SubmenuList links={submenu.links} variant="drawer" />
            </MobileSubmenu>
          ) : (
            <li key={label}>
              <Link
                href="/"
                className="block text-body-sm text-muted transition-[color] hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ),
        )}
      </ul>
      <AuthLinks variant="drawer" className="mt-8" />
    </nav>
  );
}
