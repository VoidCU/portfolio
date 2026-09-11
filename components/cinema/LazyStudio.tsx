"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Studio = dynamic(() => import("./OrbitalScene"), { ssr: false });

/** Keep the opening scene light; load WebGL as the studio approaches the viewport. */
export default function LazyStudio({ paused = false }: { paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="lazy-studio">
      {ready ? (
        <Studio paused={paused} />
      ) : (
        <div className="studio-loading">
          <span>SAROJ’S STUDIO</span>
          <span>Interfaces · Intelligence · Infrastructure</span>
        </div>
      )}
    </div>
  );
}
