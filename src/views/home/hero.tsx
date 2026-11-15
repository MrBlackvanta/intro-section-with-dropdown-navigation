import heroDesktop2x from "@/assets/image-hero-desktop-2x.webp";
import heroDesktop from "@/assets/image-hero-desktop.webp";
import heroMobile from "@/assets/image-hero-mobile.webp";
import Link from "next/link";
import ClientLogos from "./client-logos";

export default function Hero() {
  return (
    <div className="mt-4.5 grid md:mt-16.5 md:grid-cols-2 md:items-center md:gap-x-8 md:px-10 lg:gap-x-10 lg:pr-[9%] lg:pl-[11.5%] xl:items-start">
      <picture className="md:order-last md:w-full md:max-w-120 md:justify-self-end">
        <source
          media="(min-width: 48rem)"
          srcSet={`${heroDesktop.src} 1x, ${heroDesktop2x.src} 2x`}
          width={heroDesktop.width}
          height={heroDesktop.height}
        />
        <img
          src={heroMobile.src}
          width={heroMobile.width}
          height={heroMobile.height}
          alt=""
          fetchPriority="high"
          className="w-full"
        />
      </picture>

      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 text-center md:mx-0 md:max-w-none md:items-start md:px-0 md:text-left xl:pt-26">
        <h1 className="mt-12 text-display-sm md:mt-0 md:text-display">
          <span className="md:block">Make</span> remote work
        </h1>
        <p className="mt-4 text-body-sm text-muted xl:mt-12 xl:max-w-md xl:text-body">
          Get your team in sync, no matter your location. Streamline processes,
          create team rituals, and watch productivity soar.
        </p>
        <Link
          href="/"
          className="mt-6 flex h-12 items-center rounded-button border border-ink bg-ink px-5.5 text-button-sm text-page transition-[color,background-color] hover:bg-transparent hover:text-ink xl:mt-13 xl:h-14 xl:px-7.5 xl:text-button"
        >
          Learn more
        </Link>
        <ClientLogos className="mt-12 self-stretch xl:mt-27" />
      </div>
    </div>
  );
}
