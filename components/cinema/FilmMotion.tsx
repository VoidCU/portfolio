"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/fx/hooks";

const FilmMotionContext = createContext(false);

export function FilmMotionProvider({
  paused,
  children,
}: {
  paused: boolean;
  children: ReactNode;
}) {
  return (
    <FilmMotionContext.Provider value={paused}>
      {children}
    </FilmMotionContext.Provider>
  );
}

export function useFilmStill() {
  const paused = useContext(FilmMotionContext);
  const reduced = useReducedMotionSafe();
  return paused || reduced;
}

/** A small camera move tied to the document, never to a timer or scroll lock. */
export function ImageLens({
  src,
  alt = "",
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const still = useFilmStill();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  return (
    <div className={`image-lens ${className}`} ref={host}>
      <motion.div
        className="image-lens-camera"
        style={still ? { scale: 1, y: 0 } : { scale, y }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}

export function ProductCamera({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const still = useFilmStill();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], [24, -12]);
  return (
    <div ref={host} className="product-camera">
      <motion.div
        className="product-camera-inner"
        style={still ? { scale: 1, y: 0 } : { scale, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function StatementLine({
  children,
  index,
  progress,
}: {
  children: ReactNode;
  index: number;
  progress: MotionValue<number>;
}) {
  const still = useFilmStill();
  const opacity = useTransform(
    progress,
    [0.05 + index * 0.15, 0.23 + index * 0.15],
    [0.2, 1],
  );
  const y = useTransform(
    progress,
    [0.05 + index * 0.15, 0.23 + index * 0.15],
    [18, 0],
  );
  return (
    <motion.span style={still ? { opacity: 1, y: 0 } : { opacity, y }}>
      {children}
    </motion.span>
  );
}

export function BuilderStatement() {
  const host = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  return (
    <section
      ref={host}
      className="builder-statement"
      aria-label="In my own words"
    >
      <div className="builder-statement-inner">
        <span className="chapter-label">IN MY OWN WORDS</span>
        <blockquote>
          {[
            "The codebase compiles.",
            "It ships.",
            "The bugs get fixed eventually.",
          ].map((text, index) => (
            <StatementLine key={text} index={index} progress={scrollYProgress}>
              {text}
            </StatementLine>
          ))}
        </blockquote>
        <div className="builder-statement-credit">
          <span>
            SAROJ PRASAD MAINALI
            <br />
            FROM “WEARING MANY HATS”
          </span>
          <Link href="/blog/wearing-many-hats">
            Read the story behind the work ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
