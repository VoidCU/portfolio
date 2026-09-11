import Link from "next/link";
export default function NotFoundView() {
  return (
    <section className="cinema-volume lost-page">
      <div className="volume-landscape" aria-hidden="true" />
      <div className="volume-kicker">
        <span>404 / UNCHARTED TERRITORY</span>
      </div>
      <h1>Lost in space.</h1>
      <p>This page is beyond the map. Let’s find your way back.</p>
      <Link href="/" className="cinema-button primary">
        Back to the beginning ↗
      </Link>
      <Link href="/projects" className="cinema-text-link">
        Explore the work ↗
      </Link>
    </section>
  );
}
