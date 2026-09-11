import Link from "next/link";
import { VOLUMES } from "./routes";
const labels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Selected work",
  "/open-source": "Open source",
  "/skills": "Expertise",
  "/experience": "Experience",
  "/clients": "Clients",
  "/achievements": "Achievements",
  "/blog": "Journal",
  "/now": "Now",
  "/uses": "My setup",
  "/contact": "Let’s talk",
};
export default function ChapterNav({ current }: { current: string }) {
  const i = VOLUMES.findIndex((v) => v.href === current);
  if (i < 0) return null;
  const previous = VOLUMES[(i - 1 + VOLUMES.length) % VOLUMES.length],
    next = VOLUMES[(i + 1) % VOLUMES.length];
  return (
    <nav className="cinema-chapter-nav" aria-label="Chapter navigation">
      <Link href={previous.href}>
        <small>← PREVIOUS CHAPTER</small>
        <strong>{labels[previous.href]}</strong>
      </Link>
      <Link href={next.href}>
        <small>NEXT CHAPTER →</small>
        <strong>{labels[next.href]}</strong>
      </Link>
    </nav>
  );
}
