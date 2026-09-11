"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    name: "The spark",
    image: "story-origin",
    eyebrow: "01 / KATHMANDU, NEPAL",
    title: "Every journey starts with a question.",
    text: "What could we build that makes a difference? For me, that question connects the foothills of Nepal, computer engineering at Thapathali Campus, and a life spent making things.",
    note: "Curiosity is the starting point.",
  },
  {
    name: "The craft",
    image: "story-workshop",
    eyebrow: "02 / INSIDE THE WORKSHOP",
    title: "Then comes the work you don’t see.",
    text: "The first sketch. The stubborn bug. The model that finally learns. I move between interfaces, APIs, AI and infrastructure to turn a promising idea into something people can actually use.",
    note: "Design. Build. Question. Refine.",
  },
  {
    name: "The impact",
    image: "story-horizon",
    eyebrow: "03 / OUT INTO THE WORLD",
    title: "An idea only matters when it reaches someone.",
    text: "A nearby opportunity on Genzlink. An auction discovered on Auctionmandu. A clearer view of Nepal’s public budgets. Different products, connected by the same purpose: make useful things, and keep making them better.",
    note: "This is where the story becomes real.",
  },
];

export default function StoryWalkthrough() {
  const host = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
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
            <Image
              src={`/assets/art/${chapter.image}.webp`}
              alt=""
              fill
              sizes="100vw"
            />
          </div>
        ))}
        <div className="story-shade" />
        <div className="story-stage-caption">
          <span>A STORY IN THREE CHAPTERS</span>
          <span>NEPAL → EVERYWHERE</span>
        </div>
      </div>
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
                sizes="100vw"
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
