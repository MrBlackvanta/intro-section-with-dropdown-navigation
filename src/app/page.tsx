import { Signature, SiteHeader } from "@/components/layout";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <h1>Make remote work</h1>
      </main>
      <footer className="relative">
        <Signature />
      </footer>
    </>
  );
}
