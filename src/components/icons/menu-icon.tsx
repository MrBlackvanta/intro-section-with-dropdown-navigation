import type { SVGProps } from "react";

export default function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="18"
      viewBox="0 0 32 18"
      aria-hidden="true"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M0 0h32v2H0zM0 8h32v2H0zM0 16h32v2H0z" />
      </g>
    </svg>
  );
}
