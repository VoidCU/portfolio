import { ProjectGallery } from "@/components/cinema/ProjectGallery";
import SystemsLedger from "@/components/cinema/SystemsLedger";
export default function ProjectsView({
  domains,
}: {
  domains: { title: string; desc: string }[];
}) {
  return (
    <div className="inner-content">
      <ProjectGallery filters />
      <SystemsLedger />
      <h2 className="inner-section-title">Built across boundaries.</h2>
      <div className="inner-domains">
        {domains.map((domain) => (
          <article key={domain.title}>
            <h3>{domain.title}</h3>
            <p>{domain.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
