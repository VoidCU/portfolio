"use client";
import { useId, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotionSafe } from "@/components/fx/hooks";

const modes = [
  {
    name: "Interface",
    verb: "Make it feel right.",
    from: "A PERSON",
    to: "A USEFUL EXPERIENCE",
    text: "Interfaces that make complex workflows feel approachable. From the first layout to the detail in an interaction.",
    example: "Explore the product interfaces",
    url: "/projects",
  },
  {
    name: "Systems",
    verb: "Make it hold together.",
    from: "A REQUEST",
    to: "A RELIABLE RESPONSE",
    text: "APIs, permissions and application logic. The quiet work that makes everything on the surface possible.",
    example: "The engineering behind the work",
    url: "/experience",
  },
  {
    name: "Intelligence",
    verb: "Find the useful pattern.",
    from: "RAW INPUT",
    to: "A BETTER SIGNAL",
    text: "Models and data pipelines for language, audio and recognition. Experiments become tools when the results are useful.",
    example: "Explore AI and research projects",
    url: "/projects",
  },
  {
    name: "Infrastructure",
    verb: "Keep the whole thing running.",
    from: "A COMMIT",
    to: "A WORKING RELEASE",
    text: "Containers, deployment workflows and cloud systems. A repeatable route from local development to production.",
    example: "See my production experience",
    url: "/experience",
  },
  {
    name: "Languages",
    verb: "Give an idea its form.",
    from: "AN IDEA",
    to: "WORKING SOFTWARE",
    text: "The language follows the problem. Python for data, TypeScript for products, and the right tools for everything in between.",
    example: "Browse selected source code",
    url: "/open-source",
  },
  {
    name: "Craft",
    verb: "Notice the details.",
    from: "A ROUGH EDGE",
    to: "SOMETHING CONSIDERED",
    text: "Design, iteration and the tools behind the work. The spacing, the image, the workflow: small decisions add up.",
    example: "Inside my everyday toolkit",
    url: "/uses",
  },
];
export default function SignalDesk({ paused = false }: { paused?: boolean }) {
  const [active, setActive] = useState(0),
    [selected, setSelected] = useState(0),
    [manual, setManual] = useState(false),
    ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, ""),
    reduced = useReducedMotionSafe(),
    still = paused || reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!manual && !still) {
      const next = Math.min(5, Math.floor(p * 6));
      setActive(next);
      setSelected(0);
    }
  });
  const mode = modes[active],
    skills = profile.skills[active].items;
  const choose = (i: number) => {
    setActive(i);
    setSelected(0);
    setManual(true);
  };
  return (
    <div ref={ref} className={`signal-desk ${still ? "desk-still" : ""}`}>
      <div className="desk-topline">
        <span>
          <i /> VOIDCU / SIGNAL DESK
        </span>
        <span>CONNECTED THINKING. PRACTICAL TOOLS.</span>
        <span>0{active + 1}—06</span>
      </div>
      <div className="desk-layout">
        <div
          className="desk-selector"
          role="tablist"
          aria-label="Engineering disciplines"
          aria-orientation="vertical"
        >
          {modes.map((m, i) => (
            <button
              id={`${id}-tab-${i}`}
              aria-controls={`${id}-panel`}
              role="tab"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              key={m.name}
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 5
                        : (active + (e.key === "ArrowDown" ? 1 : 5)) % 6;
                  choose(next);
                  document.getElementById(`${id}-tab-${next}`)?.focus();
                }
              }}
            >
              <small>0{i + 1}</small>
              <span>{m.name}</span>
              <b>↗</b>
            </button>
          ))}
        </div>
        <div
          id={`${id}-panel`}
          className="desk-panel"
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
        >
          <div className="desk-display">
            <div className="desk-display-meta">
              <span>INPUT / {mode.from}</span>
              <span>OUTPUT / {mode.to}</span>
            </div>
            <div className="desk-blueprint" aria-hidden="true">
              <svg viewBox="0 0 800 310" preserveAspectRatio="none">
                <defs>
                  <pattern
                    id={`${id}-grid`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="1"
                      cy="1"
                      r=".7"
                      fill="currentColor"
                      opacity=".2"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="310" fill={`url(#${id}-grid)`} />
                {skills.map((_, i) => {
                  const yy = 35 + i * 46;
                  return (
                    <g key={i}>
                      <path
                        className={
                          selected === i ? "desk-wire is-selected" : "desk-wire"
                        }
                        d={`M0 155 H${100 + i * 15} Q${135 + i * 15} 155 ${135 + i * 15} ${yy} H${650 - i * 15} Q${680 - i * 15} ${yy} ${680 - i * 15} 155 H800`}
                      />
                      <circle
                        cx={260 + i * 53}
                        cy={yy}
                        r={selected === i ? 4 : 2}
                        className="desk-wire-node"
                      />
                    </g>
                  );
                })}
              </svg>
              <motion.div
                key={active}
                className="desk-word"
                initial={still ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {mode.name}
                <span>0{active + 1}</span>
              </motion.div>
              <div className="desk-scan" />
            </div>
            <div
              className="desk-tools"
              aria-label={`${profile.skills[active].category} tools`}
            >
              {skills.map((s, i) => (
                <button
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => {
                    setSelected(i);
                    setManual(true);
                  }}
                  key={s}
                >
                  <i />
                  {s}
                  <span>↗</span>
                </button>
              ))}
            </div>
          </div>
          <div className="desk-description">
            <div>
              <span className="desk-active-tool">
                {skills[selected]} / {profile.skills[active].category}
              </span>
              <h3>{mode.verb}</h3>
            </div>
            <div>
              <p>{mode.text}</p>
              <a href={mode.url} className="cinema-text-link">
                {mode.example} <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="desk-footer">
        <span>SIX DISCIPLINES. ONE CONTINUOUS LINE.</span>
        <button
          type="button"
          onClick={() => {
            if (manual && !still) {
              setManual(false);
            } else {
              choose((active + 1) % 6);
            }
          }}
        >
          {manual && !still
            ? "Follow the scroll again"
            : "Explore the next discipline"}{" "}
          <span>→</span>
        </button>
        <span>BUILT TO CONNECT / SPM</span>
      </div>
    </div>
  );
}
