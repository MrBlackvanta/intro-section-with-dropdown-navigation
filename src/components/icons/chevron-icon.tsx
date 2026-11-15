import type { SVGProps } from "react";

export default function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
}
