// src/components/Competencies.tsx
'use client';
import { useRef, useEffect, useState } from 'react';
const categories = [
  {
    title: 'Frontend & UI',
    items: ['React', 'Next.js', 'Flutter', 'Figma', 'CSS', 'HTML'],
  },
  {
    title: 'Backend & APIs',
    items: ['FastAPI', 'NestJS', 'Django', 'Laravel', 'Node.js', 'GraphQL'],
  },
  {
    title: 'DevOps & Cloud',
    items: [ 'CI/CD', 'Vercel', 'AWS', 'GitHub Actions', 'Docker'],
  },
  {
    title: 'Data & AI',
    items: ['PySpark', 'scikit-learn', 'TensorFlow', 'HuggingFace', 'NLP', 'OCR'],
  },
  {
    title: 'Languages & Tools',
    items: ['Python', 'TypeScript', 'C/C++', 'SQL', 'Bash', 'Git'],
  },
];

export default function Competencies() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger reveal when in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-16 bg-[#111827]">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-12">
          Key Competencies
        </h2>
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
                      transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-teal-600/20 text-teal-300 rounded-full
                               font-medium hover:bg-teal-600/30 hover:scale-105
                               transition transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
