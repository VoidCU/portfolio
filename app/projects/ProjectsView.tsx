import { ProjectGallery } from "@/components/cinema/ProjectGallery";
export default function ProjectsView({
  domains,
}: {
  domains: { title: string; desc: string }[];
}) {
  return (
    <div className="inner-content">
      <ProjectGallery filters />
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
