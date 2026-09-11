"use client";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/fx/Reveal";
import { ProductCamera } from "./FilmMotion";

const categories = ["All work", "Platforms", "AI & Research"];
export function ProjectGallery({
  limit,
  filters = false,
}: {
  limit?: number;
  filters?: boolean;
}) {
  const [filter, setFilter] = useState("All work");
  const reduced = useReducedMotion();
  const projects = profile.featuredProjects
    .filter(
      (p) =>
        filter === "All work" ||
        (filter === "AI & Research"
          ? p.status === "RESEARCH"
          : p.status !== "RESEARCH"),
    )
    .slice(0, limit);
  function tilt(event: PointerEvent<HTMLElement>) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      event.currentTarget.closest(".motion-paused")
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--tilt-x",
      `${((event.clientY - rect.top - rect.height / 2) / rect.height) * -5}deg`,
    );
    event.currentTarget.style.setProperty(
      "--tilt-y",
      `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 5}deg`,
    );
  }
  return (
    <>
      {filters && (
        <div className="project-filters" aria-label="Filter projects">
          {categories.map((cat) => (
            <button
              key={cat}
              aria-pressed={cat === filter}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="project-gallery" aria-live="polite">
        {projects.map((project) => (
          <Reveal key={project.name}>
            <article
              className={`cinema-project project-${project.index}`}
              onPointerMove={tilt}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty("--tilt-x", "0deg");
                e.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
            >
              <a
                className="project-art"
                href={project.url ?? project.github ?? undefined}
                target="_blank"
                rel="noreferrer"
                aria-label={`Explore ${project.name}${project.url ? " website" : " on GitHub"}`}
              >
                <div className="project-art-top">
                  <span>{project.status}</span>
                  <span>
                    {String(
                      profile.featuredProjects.indexOf(project) + 1,
                    ).padStart(2, "0")}{" "}
                    / SELECTED WORK
                  </span>
                </div>
                <ProductCamera>
                  <ProjectArtwork index={project.index} />
                </ProductCamera>
                <span className="project-open">↗</span>
              </a>
              <div className="project-info">
                <div>
                  <span className="project-category">{project.tagline}</span>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      Visit website ↗
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      View source ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function ProjectArtwork({ index }: { index: string }) {
  if (index === "06")
    return (
      <div className="auction-showcase">
        <div className="browser-shot">
          <div className="browser-chrome">
            <i />
            <i />
            <i />
            <span>auctionmandu.com</span>
          </div>
          <Image
            src="/assets/projects/auctionmandu-web.webp"
            alt="Auctionmandu website with bank auction search and location filters"
            width={1800}
            height={1125}
            sizes="(max-width: 760px) 90vw, 75vw"
          />
        </div>
        <div className="phone-shot">
          <Image
            src="/assets/projects/auctionmandu-app.webp"
            alt="Auctionmandu mobile app showing auction listings"
            width={648}
            height={1440}
            sizes="(max-width: 760px) 22vw, 18vw"
          />
        </div>
        <span className="product-image-caption">
          WEB + MOBILE / AUCTION DISCOVERY
        </span>
      </div>
    );
  if (index === "02")
    return (
      <div className="genz-showcase">
        <Image
          src="/assets/projects/genzlink-app.webp"
          alt="Genzlink mobile app: welcome, discovery categories and nearby job listings"
          fill
          sizes="(max-width: 760px) 90vw, 45vw"
        />
        <span className="product-image-caption">GENZLINK / iOS + ANDROID</span>
      </div>
    );
  if (index === "04")
    return (
      <div className="research-showcase">
        <Image
          src="/assets/project/handwritten.png"
          alt="Devanagari handwritten character recognition project"
          fill
          sizes="(max-width: 760px) 90vw, 45vw"
        />
        <span className="product-image-caption">
          HANDWRITTEN DEVANAGARI / RESEARCH
        </span>
      </div>
    );
  const scenes: Record<string, { image: string; label: string }> = {
    "01": { image: "story-origin", label: "NEPAL IN FOCUS / EDITORIAL ART" },
    "03": {
      image: "story-horizon",
      label: "COMMUNITY & IMPACT / EDITORIAL ART",
    },
    "05": {
      image: "audio-material",
      label: "AUDIO INTELLIGENCE / EDITORIAL ART",
    },
  };
  const scene = scenes[index];
  return (
    <div className="editorial-project-art">
      <Image
        src={`/assets/art/${scene.image}.webp`}
        alt=""
        fill
        sizes="(max-width: 760px) 90vw, 45vw"
      />
      <span className="product-image-caption">{scene.label}</span>
    </div>
  );
}
