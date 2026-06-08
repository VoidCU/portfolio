'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/about',       label: 'About' },
  { href: '/skills',      label: 'Skills' },
  { href: '/experience',  label: 'Experience' },
  { href: '/projects',    label: 'Projects' },
  { href: '/blog',        label: 'Blog' },
  { href: '/clients',     label: 'Clients' },
  { href: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080d08] border-b border-[rgba(74,222,128,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono-custom text-[#e8fdf0] font-bold text-sm tracking-[0.15em] uppercase hover:text-[#4ade80] transition-colors"
        >
          VOIDCU
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#4d7c5a] hover:text-[#e8fdf0] text-xs font-mono tracking-[0.12em] uppercase transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/assets/pdfs/SarojResume.pdf"
          target="_blank"
          className="hidden md:block btn-primary text-xs py-2 px-5"
        >
          Resume
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#4d7c5a] hover:text-[#e8fdf0] transition-colors font-mono text-xs tracking-widest uppercase"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#080d08] border-t border-[rgba(74,222,128,0.08)] px-6 py-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-[#86efac] hover:text-[#e8fdf0] font-mono text-xs tracking-[0.12em] uppercase transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[rgba(74,222,128,0.08)]">
            <Link
              href="/assets/pdfs/SarojResume.pdf"
              target="_blank"
              className="btn-primary inline-block text-xs"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
