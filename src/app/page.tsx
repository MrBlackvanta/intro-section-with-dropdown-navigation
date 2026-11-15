import { Signature, SiteHeader } from "@/components/layout";
import { Hero } from "@/views/home";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-360">
        <Hero />
      </main>
      <footer className="relative h-23.5 xl:h-30.5">
        <Signature />
      </footer>
    </>
  );
}
