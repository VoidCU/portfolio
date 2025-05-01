// src/components/Projects.tsx
'use client';
import { profile } from '@/data/profile';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section id="projects" className="py-16 bg-[#111827]">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-12">
          Signature Projects
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map(({ name, tech, desc, url }, idx) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              className="relative block rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {name}
                  </h3>
                  <p className="text-sm text-teal-300 mb-4">{tech}</p>
                  <p className="text-slate-300 leading-relaxed">{desc}</p>
                </div>
                {/* <span className="mt-6 inline-block px-4 py-2 bg-teal-400 text-black font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  View Project
                </span> */}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
