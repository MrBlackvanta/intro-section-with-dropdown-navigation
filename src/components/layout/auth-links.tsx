import Link from "next/link";

const variants = {
  desktop: {
    list: "flex items-center gap-10",
    register: "h-10.5 px-5.5",
  },
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
          className="text-nav text-muted transition-[color] hover:text-ink"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`flex items-center justify-center rounded-button-sm border-button-sm border-muted text-nav text-muted transition-[color,border-color] hover:border-ink hover:text-ink ${styles.register}`}
        >
          Register
        </Link>
      </li>
    </ul>
  );
}
