import type { SubmenuLink } from "@/data";
import Link from "next/link";

const variants = {
  desktop: { link: "text-nav", icon: "size-4" },
  drawer: { link: "text-body-sm", icon: "size-5" },
} as const;

type Props = {
  links: readonly SubmenuLink[];
  variant: keyof typeof variants;
};

export default function SubmenuList({ links, variant }: Props) {
  const styles = variants[variant];

  return (
    <ul className="flex flex-col gap-4">
      {links.map(({ label, Icon }) => (
        <li key={label}>
          <Link
            href="/"
            className={`flex items-center gap-3.5 text-muted transition-[color] hover:text-ink ${styles.link}`}
          >
            {Icon && <Icon className={styles.icon} />}
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
