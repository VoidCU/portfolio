import type { ReactNode } from "react";
import { ImageLens } from "@/components/cinema/FilmMotion";
const coverArt: Record<string, string> = {
  ORIGIN: "cover-origin",
  EXPEDITIONS: "cover-projects",
  "FIELD KITS": "cover-opensource",
  INSTRUMENTS: "cover-systems",
  "THE ROUTE": "cover-journey",
  SIGNALS: "cover-collaboration",
  "SUMMIT LOG": "orbital-himalaya",
  "FIELD NOTES": "cover-notes",
  "PRESENT POSITION": "cover-now",
  "GEAR MANIFEST": "story-workshop",
  TRANSMISSION: "cover-contact",
};
const titles: Record<string, string> = {
  ORIGIN: "The person behind the pixels.",
  EXPEDITIONS: "Ideas made real.",
  "FIELD KITS": "Built in the open.",
  INSTRUMENTS: "Many disciplines. One builder.",
  "THE ROUTE": "Always moving forward.",
  SIGNALS: "Good work. Great people.",
  "SUMMIT LOG": "Milestones along the way.",
  "FIELD NOTES": "Beyond the code.",
  "PRESENT POSITION": "Here. Now. Next.",
  "GEAR MANIFEST": "Tools of the trade.",
  TRANSMISSION: "Let’s make it happen.",
};
export default function VolumePlate({
  volume,
  title,
  motif,
  children,
}: {
  volume: string;
  title: string;
  altitude: string;
  motif?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="cinema-volume">
      <ImageLens
        className="volume-landscape"
        src={`/assets/art/${coverArt[title] ?? "cover-notes"}.webp`}
        priority
      />
      {motif && (
        <div className="volume-motif" aria-hidden="true">
          {motif}
        </div>
      )}
      <div className="volume-kicker">
        <span>{volume.replace("VOL.", "CHAPTER ")}</span>
        <span> / </span>
        <span>SAROJ PRASAD MAINALI</span>
      </div>
      <h1>{titles[title] ?? title}</h1>
      {children && <div className="volume-intro">{children}</div>}
    </header>
  );
}
