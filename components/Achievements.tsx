// src/components/Achievements.tsx
'use client';
import { profile } from '@/data/profile';
import { FaTrophy, FaCertificate, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const icons = [FaTrophy, FaCertificate, FaMedal];

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 bg-[#111827]">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-12">
          Achievements & Certifications
        </h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {profile.achievements.map((text, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={text}
                className="flex items-start space-x-4 bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <Icon className="text-teal-400 text-3xl" />
                </div>
                <p className="text-slate-200 leading-relaxed">{text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
