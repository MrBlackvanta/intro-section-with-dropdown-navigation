import { SITE_NAME } from "@/data";
import type { Metadata } from "next";
import Link from "next/link";

const description =
  "There’s nothing at this address. Head back to the home page to get your team in sync, wherever they work.";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Page not found`,
  description,
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="mx-auto grid w-full max-w-360 grow">
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center md:items-start md:px-10 md:text-left lg:pl-[11.5%]">
        <h1 className="text-display-sm md:text-display">Page not found</h1>
        <p className="mt-4 max-w-md text-body-sm text-muted xl:mt-12 xl:text-body">
          {description}
        </p>
        <Link href="/" className="mt-6 v-button xl:mt-13">
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
