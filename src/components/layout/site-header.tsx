import { Logo } from "@/components/icons";
import DesktopNav from "./desktop-nav";

export default function SiteHeader() {
  return (
    <header className="relative z-10 flex h-14 items-center px-4 pt-3 lg:h-16 lg:px-10 lg:pt-5">
      <Logo className="shrink-0 translate-y-1" />
      <DesktopNav />
    </header>
  );
}
