"use client";

import Image from "@/components/cinema/ThemeImage";
import { SignalMark } from "./SignalPortal";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/fx/hooks";
import { profile } from "@/data/profile";
import { blogPosts } from "@/data/blog";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/fx/Reveal";
import StoryFlow from "./StoryFlow";
import { ProjectGallery } from "./ProjectGallery";
import { FilmMotionProvider, ImageLens, BuilderStatement } from "./FilmMotion";
import SignalDesk from "./SignalDesk";

function Chapter({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="chapter-label">
      <span className="chapter-number">{number}</span>
      <span>{children}</span>
      <span className="chapter-rule" />
    </div>
  );
}

export default function CinemaHome() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const [motionPaused, setMotionPaused] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const still = reduced || motionPaused;
  return (
    <FilmMotionProvider paused={!!still}>
      <main
        id="main-content"
        className={`cinema-home ${still ? "motion-paused" : ""}`}
      >
        <section
          ref={hero}
          className="cinema-hero"
          id="basecamp"
          aria-labelledby="hero-title"
        >
          <motion.div
            className="hero-landscape"
            style={{ y: still ? 0 : y, scale: still ? 1 : heroScale }}
          >
            <Image
              src="/assets/art/saroj-opening.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 850px) 1500px, 100vw"
              className="hero-landscape-image"
            />
          </motion.div>
          <div className="hero-shade" />
          <div className="hero-stars" aria-hidden="true" />
          <motion.div
            className="hero-content"
            style={{ opacity: still ? 1 : opacity }}
          >
            <div className="hero-eyebrow">
              <span className="status-dot" /> SAROJ PRASAD MAINALI / ENGINEER &
              AI BUILDER
            </div>
            <h1 id="hero-title">
              <span>
                Saroj<span className="hero-period">.</span>
              </span>
              <span className="hero-second">Always building.</span>
            </h1>
            <div className="hero-intro">
              <span className="intro-line" />
              <div>
                <p>
                  Engineer. Problem solver. A few too many hats.
                  <br className="desktop-break" /> This is my work, my
                  curiosity, and the story so far.
                </p>
                <span className="hero-location">
                  BASED IN NEPAL. BUILDING FOR THE WORLD.
                </span>
              </div>
            </div>
            <div className="hero-actions">
              <a className="cinema-button primary" href="#work">
                Explore my work <span>↗</span>
              </a>
              <Link href="#story" className="cinema-text-link">
                Follow the story <span>↗</span>
              </Link>
            </div>
          </motion.div>
          <div className="hero-art-label">
            <SignalMark station={0} className="crosshair">
              +
            </SignalMark>
            <span>
              WRITTEN IN CODE.
              <br />
              ROOTED IN NEPAL.
            </span>
          </div>
          <div className="hero-bottom">
            <a href="#story" className="scroll-cue">
              <span>↓</span> SCROLL TO DISCOVER
            </a>
            <span className="hero-coordinate">
              KATHMANDU, NP &nbsp; / &nbsp; 27°43′ N 85°19′ E
            </span>
            <button
              className="motion-control"
              onClick={() => setMotionPaused(!motionPaused)}
              aria-pressed={motionPaused}
            >
              {motionPaused ? "▶" : "Ⅱ"}{" "}
              <span>{motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}</span>
            </button>
          </div>
        </section>
        <div className="proof-strip">
          <p>
            A little curiosity.
            <br />
            <strong>A lot of shipped work.</strong>
          </p>
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>
                {stat.label === "Years"
                  ? "YEARS OF BUILDING"
                  : stat.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        <StoryFlow />
        <section id="origin" className="cinema-section origin-section">
          <Chapter number="01">THE ORIGIN</Chapter>
          <div className="origin-grid">
            <Reveal>
              <h2>
                Rooted in curiosity.
                <br />
                Built for <em>possibility.</em>
              </h2>
              <p className="section-lede">
                From the foothills of the Himalayas to the frontiers of
                technology.
              </p>
              <div className="origin-copy">
                {profile.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link href="/about" className="cinema-text-link">
                More about my journey <span>↗</span>
              </Link>
            </Reveal>
            <Reveal>
              <div className="portrait-composition">
                <div className="portrait-orbit" aria-hidden="true" />
                <div className="portrait-frame">
                  <Image
                    src="/assets/art/saroj-editorial.webp"
                    alt="Saroj Prasad Mainali"
                    fill
                    sizes="(max-width: 760px) 85vw, 32vw"
                  />
                </div>
                <span className="portrait-label">
                  SAROJ PRASAD MAINALI
                  <br />
                  <small>ENGINEER · BUILDER · EXPLORER</small>
                </span>
                <span className="portrait-badge">
                  <SignalMark station={1}>MADE IN</SignalMark>
                  <br />
                  <strong>NEPAL ↗</strong>
                </span>
              </div>
            </Reveal>
          </div>
        </section>
        <BuilderStatement />
        <section id="work" className="cinema-section work-section">
          <Chapter number="02">
            SELECTED WORK <SignalMark station={2}>·</SignalMark>
          </Chapter>
          <Reveal>
            <div className="section-heading">
              <h2>
                Ideas made <em>real.</em>
              </h2>
              <p>
                Different challenges. The same obsession.
                <br />
                Make it meaningful. Make it work.
              </p>
            </div>
          </Reveal>
          <ProjectGallery limit={3} />
          <Link href="/projects" className="all-work-link">
            Explore all projects{" "}
            <span>
              ({String(profile.featuredProjects.length).padStart(2, "0")})
            </span>
            <b>↗</b>
          </Link>
        </section>
        <section id="expertise" className="cinema-section expertise-section">
          <Chapter number="03">
            THE TOOLKIT <SignalMark station={3}>·</SignalMark>
          </Chapter>
          <div className="desk-introduction">
            <Reveal>
              <h2>
                Different disciplines.
                <br />
                <em>One connected mind.</em>
              </h2>
            </Reveal>
            <p>
              From the first pixel to the last deployment.
              <br />
              Follow a thread. See what makes it work.
            </p>
          </div>
          <SignalDesk paused={!!still} />
          <Link href="/skills" className="cinema-text-link desk-complete-link">
            The complete skill set <span>↗</span>
          </Link>
        </section>
        <section id="journey" className="cinema-section journey-section">
          <Chapter number="04">THE JOURNEY</Chapter>
          <div className="section-heading">
            <Reveal>
              <h2>
                Always moving
                <br />
                <em>forward.</em>
              </h2>
            </Reveal>
            <Link href="/experience" className="cinema-text-link">
              Full experience <span>↗</span>
            </Link>
          </div>
          <div className="journey-list">
            {profile.timeline.map((item, i) => (
              <Reveal key={item.org}>
                <details className="journey-item" open={i === 0}>
                  <summary>
                    <span className="journey-date">{item.period}</span>
                    <div>
                      <h3>{item.org}</h3>
                      <p>{item.role}</p>
                    </div>
                    <span className="journey-expand">↗</span>
                  </summary>
                  <ul>
                    {item.items.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </details>
              </Reveal>
            ))}
          </div>
          <div className="client-band">
            <span>
              BUILDING ALONGSIDE
              <br />
              <strong>10+ COMPANIES</strong>
            </span>
            <div>
              {profile.clients.slice(0, 5).map((client) => (
                <span key={client.name}>{client.name}</span>
              ))}
            </div>
            <Link href="/clients" aria-label="See all clients">
              ↗
            </Link>
          </div>
          <Link href="/achievements" className="achievement-strip">
            <span>KEEPING THE CURIOSITY ALIVE</span>
            <strong>LeetCode: 690 problems solved</strong>
            <span>690 problems. Always one more to solve. ↗</span>
          </Link>
        </section>
        <section className="cinema-section journal-section">
          <Chapter number="05">NOTES ALONG THE WAY</Chapter>
          <div className="section-heading">
            <Reveal>
              <h2>
                Beyond <em>the code.</em>
              </h2>
            </Reveal>
            <Link href="/blog" className="cinema-text-link">
              The journal <span>↗</span>
            </Link>
          </div>
          <div className="journal-grid">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`journal-card journal-${i}`}
                >
                  <div className="journal-art" aria-hidden="true">
                    <ImageLens
                      src={`/assets/art/${["journal-context", "journal-machine", "journal-time"][i]}.webp`}
                      sizes="(max-width: 760px) 90vw, 30vw"
                    />
                    <small>FIELD NOTE / 0{i + 1}</small>
                  </div>
                  <div className="journal-meta">
                    {post.category} <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="journal-arrow">Read story ↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="contact" className="cinema-contact">
          <div className="contact-horizon" aria-hidden="true">
            <ImageLens src="/assets/art/contact-invitation.webp" />
          </div>
          <div className="contact-content">
            <span className="hero-eyebrow">
              <span className="status-dot" /> THE NEXT CHAPTER{" "}
              <SignalMark station={4}>·</SignalMark>
            </span>
            <Reveal>
              <h2>
                Let’s build
                <br />
                something <em>extraordinary.</em>
              </h2>
            </Reveal>
            <p>
              Have an ambitious idea, a difficult problem, or a good story?
              <br />
              I’d love to hear it.
            </p>
            <button
              className="cinema-button primary"
              onClick={() => setShowForm(!showForm)}
              aria-expanded={showForm}
              aria-controls="home-contact-form"
            >
              {showForm ? "Close message form" : "Start a conversation"}{" "}
              <span>{showForm ? "−" : "↗"}</span>
            </button>
            <a
              className="contact-email"
              href={`mailto:${profile.contacts.email}`}
            >
              {profile.contacts.email} ↗
            </a>
            {showForm && (
              <div id="home-contact-form" className="home-contact-form">
                <ContactForm />
              </div>
            )}
          </div>
        </section>
      </main>
    </FilmMotionProvider>
  );
}
