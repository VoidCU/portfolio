import Link from "next/link";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/fx/Reveal";
export default function ExperienceView() {
  return (
    <div className="inner-content">
      <div className="career-heading">
        <h2 className="inner-section-title">
          A few chapters.
          <br />A lot of learning.
        </h2>
        <a
          href="/assets/pdfs/SarojResume.pdf"
          target="_blank"
          rel="noreferrer"
          className="cinema-button primary"
        >
          Download résumé ↗
        </a>
      </div>
      <div className="career-list">
        {profile.timeline.map((role, i) => (
          <Reveal key={role.index}>
            <article className="career-card">
              <div className="career-meta">
                <span>0{i + 1}</span>
                <p>{role.period}</p>
              </div>
              <div className="career-body">
                <span className="project-category">{role.role}</span>
                <h2>{role.org}</h2>
                <ul>
                  {role.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="education-card">
        <span className="project-category">
          THE FOUNDATION / {profile.education.period}
        </span>
        <h2>{profile.education.degree}</h2>
        <p>{profile.education.institution}</p>
      </div>
      <div className="skills-related">
        <Link href="/clients">The people I’ve built with ↗</Link>
        <Link href="/achievements">Milestones along the way ↗</Link>
      </div>
    </div>
  );
}
