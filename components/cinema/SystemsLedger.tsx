import { profile } from "@/data/profile";

export default function SystemsLedger() {
  return (
    <section
      className="systems-ledger"
      aria-labelledby="systems-heading"
      id="systems"
    >
      <div className="systems-intro">
        <div>
          <span className="systems-eyebrow">
            MORE OF THE WORK / BUSINESS SYSTEMS
          </span>
          <h2 id="systems-heading">
            The software behind
            <br />
            <em>the everyday.</em>
          </h2>
        </div>
        <p>
          Alongside the public projects, I have worked on the systems that
          support schools, teams, libraries, and businesses.
        </p>
      </div>
      <ol className="systems-list">
        {profile.systems.map((system, index) => (
          <li key={system.code}>
            <span className="system-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="system-name">
              <span>
                {system.domain} <b aria-hidden="true">/</b> {system.code}
              </span>
              <h3>{system.name}</h3>
            </div>
            <p>{system.summary}</p>
          </li>
        ))}
      </ol>
      <div className="systems-footnote">
        <span>DIFFERENT CONTEXTS. THE SAME CARE.</span>
        <span>SELECTED SYSTEMS EXPERIENCE</span>
      </div>
    </section>
  );
}
