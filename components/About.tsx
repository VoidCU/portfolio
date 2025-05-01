

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#111827] w-full ">
      <div className="container flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto px-6 ">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src="https://raw.githubusercontent.com/VoidCU/VoidCU/main/assets/saroj.png"
            alt="Saroj Prasad Mainali"
            className="w-56 h-56 rounded-full border-4 border-teal-400 shadow-xl"
          />
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-teal-400">About Me</h2>

          {/* Expanded narrative */}
          <p className="text-slate-200 leading-relaxed text-justify">
            Hello! I’m <strong>Saroj Prasad Mainali</strong>—a Computer Engineering graduate
            from Thapathali Campus who has turned a childhood love of gaming into a passion
            for software. Over the past five years, I’ve designed and shipped everything from
            high-performance web SaaS and mobile apps to AI-powered automation bots and
            hydrological models.
          </p>
          <p className="text-slate-200 leading-relaxed text-justify">
            At <em>Neuron Nest</em> I architect multi-tenant platforms using FastAPI, Next.js,
            and Kubernetes, while at <em>Elytra Solutions</em> I serve as CTO—guiding product
            roadmaps, mentoring teams, and ensuring code quality meets enterprise standards.
          </p>
          <p className="text-slate-200 leading-relaxed text-justify">
            I thrive on tackling green-field builds: whether it’s bias-correcting climate data
            in QGIS, training CNNs for Devanagari OCR, or crafting modular LMS/CRM plugins
            with JWT and dynamic RBAC. Clean architecture, test-driven development, and
            performance optimization are my north star.
          </p>

          {/* “At a glance” bullets */}
          <ul className="list-disc list-inside text-teal-300 space-y-1">
            <li>🎓 B.E. Computer Engineering, Thapathali Campus</li>
            <li>🖥️ 5+ years: Full-stack & AI/ML projects for Web, Mobile & DevOps</li>
            <li>🚀 Ship cadence: Daily CI/CD releases via Docker & GitHub Actions</li>
            <li>🤝 Mentored junior engineers and interns</li>
            <li>🌐 Open-source: 30+ repos, 600+ LeetCode problems</li>
          </ul>

         
        </div>
      </div>
    </section>
);
}
