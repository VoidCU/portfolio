"use client";
import Link from "next/link";
import { useReducedMotionSafe } from "@/components/fx/hooks";
import { useState } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/fx/Reveal";
import SignalDesk from "@/components/cinema/SignalDesk";
export default function SkillsView() {
  const reduced = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);
  return (
    <section className="inner-content">
      <div className="skills-overview">
        <div>
          <span className="chapter-label">
            THE INTERSECTION IS WHERE IT GETS INTERESTING
          </span>
          <h2 className="inner-section-title">
            From first pixel
            <br />
            to production.
          </h2>
          <p>
            I work across the stack, connecting thoughtful interfaces, reliable
            systems, and intelligent tools.
          </p>
          <Link href="/projects" className="cinema-text-link">
            See it in practice ↗
          </Link>
        </div>
        <div>
          <div className="desk-on-skills">
            <SignalDesk paused={paused || !!reduced} />
          </div>
          <button
            className="cinema-text-link"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume diagram motion" : "Pause diagram motion"}{" "}
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
      <div className="skills-cards">
        {profile.skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.04}>
            <article>
              <span className="skill-card-number">0{i + 1}</span>
              <h2>{group.category}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    {item}
                    <span>↗</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="skills-related">
        <Link href="/experience">The experience behind the toolkit ↗</Link>
        <Link href="/uses">My everyday setup ↗</Link>
      </div>
    </section>
  );
}
