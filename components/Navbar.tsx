"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScroll, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
const links = [
  ["/about", "About"],
  ["/projects", "Work"],
  ["/skills", "Expertise"],
  ["/experience", "Experience"],
  ["/blog", "Journal"],
];
const more = [
  ["/clients", "Clients"],
  ["/achievements", "Achievements"],
  ["/open-source", "Open source"],
  ["/now", "Now"],
  ["/uses", "My setup"],
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const trigger = toggle.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("voidcu:lenis-stop"));
    const inerted: HTMLElement[] = [];
    for (
      let node: HTMLElement | null = root.current;
      node && node !== document.body;
      node = node.parentElement
    ) {
      for (const sibling of Array.from(node.parentElement?.children ?? [])) {
        if (
          sibling !== node &&
          sibling instanceof HTMLElement &&
          !sibling.inert
        ) {
          sibling.inert = true;
          inerted.push(sibling);
        }
      }
    }
    root.current?.querySelector<HTMLAnchorElement>(".cinema-menu a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const nodes = Array.from(
        root.current?.querySelectorAll<HTMLElement>("a[href],button") ?? [],
      ).filter((el) => el.getClientRects().length);
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      inerted.forEach((el) => (el.inert = false));
      window.dispatchEvent(new CustomEvent("voidcu:lenis-start"));
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);
  return (
    <header
      ref={root}
      className={`cinema-nav ${scrolled || pathname !== "/" ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="cinema-nav-inner">
        <Link
          href="/"
          className="cinema-logo"
          onClick={() => setOpen(false)}
          aria-label="VoidCU home"
        >
          <span className="logo-orbit" aria-hidden="true" />
          voidcu<span className="logo-dot">.</span>
        </Link>
        <nav className="desktop-links" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link
            className="nav-contact"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <span>↗</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="site-menu" className="cinema-menu" aria-label="All pages">
          <div className="menu-heading">EXPLORE THE UNIVERSE</div>
          <div className="menu-main">
            {[...links, ["/contact", "Let’s talk"]].map(([href, label], i) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {label}
                <span>↗</span>
              </Link>
            ))}
          </div>
          <div className="menu-secondary">
            <ThemeToggle />
            {more.map(([href, label]) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>
                {label} ↗
              </Link>
            ))}
            <a
              href="/assets/pdfs/SarojResume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Résumé ↗
            </a>
          </div>
        </nav>
      )}
      <motion.div
        className="page-progress"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
