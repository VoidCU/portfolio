"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "./ThemeImage";
import { useFilmStill } from "./FilmMotion";

const chapters = [
  {
    label: "NOTICE",
    title: "Start with something that should be easier.",
    copy: "Finding an auction. Understanding a public budget. Discovering what is nearby. The best starting point is a real problem, and the person on the other side of it.",
    image: "story-origin",
    detail: "Auctionmandu · Amarnepal · Genzlink",
    name: "The question",
    note: "01 / FIND THE FRICTION",
  },
  {
    label: "MAKE",
    title: "Get the pieces talking to each other.",
    copy: "A useful interface needs a dependable system behind it. I connect the screens, APIs, data and deployment—and keep working when the first version meets the real world.",
    image: "story-workshop",
    detail: "Interfaces → systems → intelligence",
    name: "The work",
    note: "02 / BUILD. TEST. REPEAT.",
  },
  {
    label: "RELEASE",
    title: "Put it out there. Keep making it better.",
    copy: "The work becomes real when someone uses it. From mobile discovery to AI research and civic data, each release is another reason to listen, learn and build again.",
    image: "story-horizon",
    detail: "200+ projects · 10+ companies · still curious",
    name: "The next version",
    note: "03 / SHIP INTO THE WORLD",
  },
];
function Chapter({ index }: { index: number }) {
  const chapter = chapters[index],
    ref = useRef<HTMLElement>(null),
    still = useFilmStill();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return (
    <article
      ref={ref}
      className={`field-chapter field-chapter-${index}`}
      id={`story-${index}`}
    >
      <div className="field-chapter-heading">
        <span>{chapter.note}</span>
        <span>FIELD RECORD / 0{index + 1}</span>
      </div>
      <div className="field-chapter-body">
        <div className="field-narrative">
          <span className="field-verb">
            {chapter.label}
            <i>↘</i>
          </span>
          <h3>{chapter.title}</h3>
          <p>{chapter.copy}</p>
          <small>{chapter.detail}</small>
          <a
            href={index < 2 ? `#story-${index + 1}` : "#work"}
            className="cinema-text-link"
          >
            {index < 2
              ? `Next: ${chapters[index + 1].name}`
              : "Discover the projects"}{" "}
            <span>↓</span>
          </a>
        </div>
        <div className="field-photograph">
          <motion.div style={still ? {} : { y }}>
            <Image
              src={`/assets/art/${chapter.image}.webp`}
              alt=""
              fill
                sizes="(max-width:760px) 900px,1200px"
            />
          </motion.div>
          <span className="field-photo-index">
            0{index + 1}
            <small>THE WORK, IN MOTION</small>
          </span>
        </div>
      </div>
    </article>
  );
}
export default function StoryFlow() {
  return (
    <section
      id="story"
      className="field-story"
      aria-labelledby="field-story-title"
    >
      <header className="field-story-intro">
        <span className="chapter-label">A FEW NOTES ON HOW I BUILD</span>
        <div>
          <h2 id="field-story-title">
            From the first <em>why.</em>
            <br />
            To the thing that <em>works.</em>
          </h2>
          <p>
            There is a story behind every shipped thing.
            <br />
            Here is the thread that runs through mine.
          </p>
        </div>
        <nav aria-label="Story chapters">
          {chapters.map((c, i) => (
            <a key={c.label} href={`#story-${i}`}>
              <span>0{i + 1}</span>
              {c.name}
              <b>↘</b>
            </a>
          ))}
        </nav>
      </header>
      <div className="field-chapters">
        {chapters.map((c, i) => (
          <Chapter key={c.label} index={i} />
        ))}
      </div>
      <div className="field-story-end">
        <span>THE STORY CONTINUES IN THE WORK.</span>
        <span>↓</span>
      </div>
    </section>
  );
}
