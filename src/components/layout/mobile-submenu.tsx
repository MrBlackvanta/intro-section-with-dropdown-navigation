"use client";

import { ChevronIcon } from "@/components/icons";
import { type ReactNode, useId, useState } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

export default function MobileSubmenu({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="group/submenu flex items-center gap-4 text-body-sm text-muted transition-[color] hover:text-ink"
      >
        {label}
        <ChevronIcon className="transition-[rotate] duration-200 group-aria-expanded/submenu:rotate-180 motion-reduce:transition-none" />
      </button>
      <div id={panelId} hidden={!open} className="pt-6 pb-2 pl-6">
        {children}
      </div>
    </li>
  );
}
