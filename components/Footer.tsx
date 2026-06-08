import Link from 'next/link';
import { profile } from '@/data/profile';

const navLinks = [
  { href: '/about',        label: 'About' },
  { href: '/skills',       label: 'Skills' },
  { href: '/experience',   label: 'Experience' },
  { href: '/projects',     label: 'Projects' },
  { href: '/blog',         label: 'Blog' },
  { href: '/clients',      label: 'Clients' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact',      label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--c-bg)] border-t border-[var(--c-b2)]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[var(--c-b1)]">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-mono-custom font-bold text-[var(--c-text)] text-sm tracking-[0.15em] uppercase block hover:text-[var(--c-accent)] transition-colors">
              VOIDCU
            </Link>
            <p className="text-[var(--c-muted)] text-xs leading-relaxed max-w-xs">
              Full-stack engineer building scalable SaaS, AI systems, and production software. Based in Kathmandu, Nepal.
            </p>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            <p className="label mb-4">Navigation</p>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[var(--c-muted)] hover:text-[var(--c-text)] font-mono text-xs tracking-wider uppercase transition-colors py-0.5"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="space-y-2">
            <p className="label mb-4">Links</p>
            {[
              { label: 'GitHub', href: profile.contacts.github },
              { label: 'LinkedIn', href: profile.contacts.linkedin },
              { label: 'LeetCode', href: profile.contacts.leetcode },
              { label: 'Email', href: `mailto:${profile.contacts.email}` },
              { label: 'Resume', href: '/assets/pdfs/SarojResume.pdf' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith('mailto') || href.startsWith('/') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="block text-[var(--c-muted)] hover:text-[var(--c-accent)] font-mono text-xs tracking-wider uppercase transition-colors py-0.5"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="label text-[var(--c-ghost)]">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="label text-[var(--c-ghost)]">
            Next.js · Tailwind CSS · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
