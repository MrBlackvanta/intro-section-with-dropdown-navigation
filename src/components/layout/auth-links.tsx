import Link from "next/link";

const variants = {
  desktop: { list: "flex items-center gap-10", register: "px-5.5" },
  drawer: { list: "flex flex-col gap-4 text-center", register: "" },
} as const;

type Props = {
  variant: keyof typeof variants;
  className?: string;
};

export default function AuthLinks({ variant, className = "" }: Props) {
  const styles = variants[variant];

  return (
    <ul className={`${styles.list} ${className}`}>
      <li>
        <Link
          href="/"
          className="block text-nav text-muted transition-[color] hover:text-ink"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`flex h-10.5 items-center justify-center rounded-button-sm border-button-sm border-muted text-nav text-muted transition-[color,border-color] hover:border-ink hover:text-ink ${styles.register}`}
        >
          Register
        </Link>
      </li>
    </ul>
  );
}
