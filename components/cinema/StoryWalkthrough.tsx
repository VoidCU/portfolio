"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useFilmStill } from "./FilmMotion";

const chapters = [
  {
    name: "The spark",
    image: "saroj-roots",
    eyebrow: "01 / KATHMANDU, NEPAL",
    title: "Kathmandu is where my story starts.",
    text: "I’m Saroj Prasad Mainali. A computer engineering graduate from Thapathali Campus, a builder, and someone who keeps asking how things work. Nepal is home. Curiosity is what keeps me moving.",
    note: "Rooted here. Thinking beyond the horizon.",
  },
  {
    name: "The craft",
    image: "saroj-afterhours",
    eyebrow: "02 / THE 2 A.M. CHAPTER",
    title: "Sometimes, the job starts at 2 a.m.",
    text: "A production server went down. My home internet followed. I sat on the floor with a laptop and a phone hotspot. Two hours later, it was back. That’s part of my story too: staying with a problem until it works.",
    note: "The work nobody sees still matters.",
  },
  {
    name: "The impact",
    image: "saroj-maker",
    eyebrow: "03 / THE MANY HATS I WEAR",
    title: "One person. More than one way to build.",
    text: "I lead engineering, design interfaces, train models, and connect the systems behind them. From AI photography workflows and water modelling to Genzlink, Auctionmandu and Amarnepal, I like turning complicated problems into useful things.",
    note: "Different disciplines. The same pair of hands.",
  },
];

function StoryCamera({
  image,
  index,
  progress,
}: {
  image: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const still = useFilmStill();
  const scale = useTransform(
    progress,
    [Math.max(0, (index - 0.5) / 3), (index + 1) / 3],
    [1.02, 1.18],
  );
  const x = useTransform(progress, [0, 1], ["1.5%", "-1.5%"]);
  return (
    <motion.div
      className="story-camera"
      style={still ? { scale: 1, x: 0 } : { scale, x }}
    >
      <Image src={`/assets/art/${image}.webp`} alt="" fill sizes="100vw" />
    </motion.div>
  );
}

export default function StoryWalkthrough() {
  const host = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const steps = host.current?.querySelectorAll<HTMLElement>(".story-step");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    steps?.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="story"
      ref={host}
      className="story-walkthrough"
      aria-label="A story in three chapters"
    >
      <div className="story-stage" aria-hidden="true">
        {chapters.map((chapter, i) => (
          <div
            key={chapter.image}
            className={`story-scene ${i === active ? "is-active" : ""}`}
          >
            <StoryCamera
              image={chapter.image}
              index={i}
              progress={scrollYProgress}
            />
          </div>
        ))}
        <div className="story-shade" />
        <div className="story-stage-caption">
          <span>SAROJ PRASAD MAINALI / A BUILDER’S STORY</span>
          <span>NEPAL → EVERYWHERE</span>
        </div>
      </div>
      <motion.div
        className="story-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <nav className="story-navigation" aria-label="Story chapters">
        {chapters.map((chapter, i) => (
          <a
            key={chapter.name}
            href={`#story-${i}`}
            aria-current={active === i ? "step" : undefined}
          >
            <span>0{i + 1}</span>
            {chapter.name}
            <i />
          </a>
        ))}
      </nav>
      <div className="story-steps">
        {chapters.map((chapter, i) => (
          <article
            key={chapter.name}
            id={`story-${i}`}
            data-chapter={i}
            className="story-step"
          >
            <div className="story-mobile-art">
              <Image
                src={`/assets/art/${chapter.image}.webp`}
                alt=""
                fill
                sizes="(max-width: 760px) 1100px, 100vw"
              />
            </div>
            <div className="story-copy">
              <span className="story-eyebrow">{chapter.eyebrow}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.text}</p>
              <span className="story-note">{chapter.note}</span>
              <a
                className="cinema-text-link"
                href={i < 2 ? `#story-${i + 1}` : "#work"}
              >
                {i < 2
                  ? `Next: ${chapters[i + 1].name}`
                  : "Discover the projects"}{" "}
                <span>↓</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
