import {
  AudiophileLogo,
  DatabizLogo,
  MakerLogo,
  MeetLogo,
} from "@/components/icons";

const CLIENTS = [
  { name: "Databiz", Logo: DatabizLogo, height: "h-3.5 xl:h-5" },
  { name: "Audiophile", Logo: AudiophileLogo, height: "h-6.5 xl:h-9" },
  { name: "Meet", Logo: MeetLogo, height: "h-3.5 xl:h-5" },
  { name: "Maker", Logo: MakerLogo, height: "h-4.25 xl:h-6" },
];

export default function ClientLogos({ className }: { className: string }) {
  return (
    <ul
      aria-label="Clients"
      className={`flex items-center justify-between text-faint md:justify-start md:gap-5 xl:gap-10 ${className}`}
    >
      {CLIENTS.map(({ name, Logo, height }) => (
        <li key={name}>
          <Logo className={`w-auto ${height}`} />
          <span className="sr-only">{name}</span>
        </li>
      ))}
    </ul>
  );
}
