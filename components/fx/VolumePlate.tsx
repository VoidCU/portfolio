import type { ReactNode } from "react";
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
      <div
        className="volume-landscape"
        aria-hidden="true"
        style={{
          backgroundImage: `url(/assets/art/${["INSTRUMENTS", "GEAR MANIFEST", "FIELD KITS"].includes(title) ? "story-workshop" : ["SIGNALS", "SUMMIT LOG", "TRANSMISSION", "EXPEDITIONS"].includes(title) ? "story-horizon" : "story-origin"}.webp)`,
        }}
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
