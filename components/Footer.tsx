import Link from "next/link";
import { profile } from "@/data/profile";
export default function Footer() {
  return (
    <footer className="cinema-footer">
      <div className="footer-top">
        <Link href="/" className="cinema-logo">
          <span className="logo-orbit" aria-hidden="true" />
          voidcu<span className="logo-dot">.</span>
        </Link>
        <p>Built with intention. From Kathmandu, to everywhere.</p>
        <a href="#main-content" className="back-top">
          Back to top ↑
        </a>
      </div>
      <div className="footer-links">
        <div>
          {[
            ["/about", "About"],
            ["/projects", "Work"],
            ["/skills", "Expertise"],
            ["/experience", "Experience"],
            ["/blog", "Journal"],
            ["/clients", "Clients"],
            ["/achievements", "Achievements"],
            ["/open-source", "Open source"],
            ["/now", "Now"],
            ["/uses", "Setup"],
          ].map(([href, label]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <a href={profile.contacts.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a
            href="/assets/pdfs/SarojResume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Résumé ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Saroj Prasad Mainali</span>
        <span>27.7172° N &nbsp; 85.3240° E</span>
        <span>
          ALWAYS EXPLORING <i className="status-dot" />
        </span>
      </div>
    </footer>
  );
}
