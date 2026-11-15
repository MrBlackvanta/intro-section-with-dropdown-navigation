"use client";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { usePageLock } from "@/hooks";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  usePageLock(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const toggle = toggleRef.current;
    dialog.showModal();

    const close = () => setOpen(false);
    const desktop = window.matchMedia("(min-width: 64rem)");

    function closeOnBackdropOrLink(event: MouseEvent) {
      const { target } = event;
      const onBackdrop = target === dialog;
      const onLink = target instanceof Element && target.closest("a");
      if (onBackdrop || onLink) close();
    }

    function closeOnDesktop(change: MediaQueryListEvent) {
      if (change.matches) close();
    }

    dialog.addEventListener("click", closeOnBackdropOrLink);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      dialog.removeEventListener("click", closeOnBackdropOrLink);
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
        className="-mr-1.5 ml-auto flex size-11 items-center justify-center text-ink transition-[color] hover:text-muted lg:hidden"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="group/menu size-full max-h-none max-w-none overflow-clip bg-transparent transition-[background-color,display,overlay] transition-discrete duration-300 backdrop:bg-transparent open:bg-ink/75 motion-reduce:transition-none starting:open:bg-transparent"
      >
        <div className="relative ml-auto h-full w-60 translate-x-full overflow-y-auto bg-surface px-6 pt-19.5 pb-8 transition-[translate] duration-300 group-open/menu:translate-x-0 motion-reduce:transition-none starting:group-open/menu:translate-x-full">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-3 right-2.5 flex size-11 items-center justify-center text-ink transition-[color] hover:text-muted"
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
}
