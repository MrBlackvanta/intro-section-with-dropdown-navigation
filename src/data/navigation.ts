import {
  CalendarIcon,
  PlanningIcon,
  RemindersIcon,
  TodoIcon,
} from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

export type SubmenuLink = {
  label: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type NavItem = {
  label: string;
  submenu?: {
    align: "start" | "end";
    links: readonly SubmenuLink[];
  };
};

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Features",
    submenu: {
      align: "end",
      links: [
        { label: "Todo List", Icon: TodoIcon },
        { label: "Calendar", Icon: CalendarIcon },
        { label: "Reminders", Icon: RemindersIcon },
        { label: "Planning", Icon: PlanningIcon },
      ],
    },
  },
  {
    label: "Company",
    submenu: {
      align: "start",
      links: [{ label: "History" }, { label: "Our Team" }, { label: "Blog" }],
    },
  },
  { label: "Careers" },
  { label: "About" },
];
