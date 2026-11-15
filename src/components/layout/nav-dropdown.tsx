"use client";

import { ChevronIcon } from "@/components/icons";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";

const alignments = { start: "left-0", end: "right-0" } as const;

type Props = {
  label: string;
  align: keyof typeof alignments;
  children: ReactNode;
};

export default function NavDropdown({ label, align, children }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function closeOnOutside(event: Event) {
      const root = rootRef.current;
      if (event.target instanceof Node && root?.contains(event.target)) return;
      setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (rootRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
      setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("focusin", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("focusin", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <li ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="group/trigger peer/trigger flex items-center gap-2 text-nav text-muted transition-[color] hover:text-ink aria-expanded:text-ink"
      >
        {label}
        <ChevronIcon className="-mr-px transition-[rotate] duration-200 group-aria-expanded/trigger:rotate-180 motion-reduce:transition-none" />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`invisible absolute top-full mt-5 w-max rounded-panel bg-surface p-6 shadow-dropdown transition-[clip-path,visibility] duration-200 ease-out [clip-path:inset(0_0_100%)] peer-aria-expanded/trigger:visible peer-aria-expanded/trigger:[clip-path:inset(-2.5rem_-2.5rem_-3.125rem)] motion-reduce:transition-none ${alignments[align]}`}
      >
        {children}
      </div>
    </li>
  );
}
