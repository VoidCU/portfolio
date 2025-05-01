'use client';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaUser } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-screen
                 bg-gradient-to-br from-[#1f2937] to-[#57daac] text-center px-4 font-handwriting"
    >
      {/* Slight animated blob decoration */}
      <div className="absolute -top-20 -left-10 w-72 h-72 bg-[#57daac]/20 rounded-full animate-blob mix-blend-multiply filter blur-xl opacity-70"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-[#1f2937]/20 rounded-full animate-blob animation-delay-2000 mix-blend-multiply filter blur-xl opacity-70"></div>

      <div className="relative z-10 max-w-2xl space-y-6">
        {/* Pre-Title */}
        <p className="uppercase text-sm tracking-widest text-white/70 animate-fade-in-down">
          Let’s build something together
        </p>

        {/* Headline */}
        <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight animate-fade-in-up">
          Hi, I’m{' '}
          <span className="text-white drop-shadow-lg">Saroj</span>{' '}
        </h1>

        {/* Typewriter Subtitle */}
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 animate-fade-in">
          <Typewriter
            options={{
              strings: [
                'Gamer & Game Developer',
                'Full-stack Engineer',
                'AI Explorer',
                'Problem Solver',
              ],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg mx-auto animate-fade-in-delay">
          I’m trying to build my own world in my own universe.
        </p>

        {/* Icon Links */}
        <div className="flex items-center justify-center space-x-6 mt-8 animate-fade-in-up-delay">
          {[
            { href: profile.contacts.linkedin, icon: <FaLinkedin /> },
            { href: profile.contacts.github,   icon: <FaGithub /> },
            { href: `mailto:${profile.contacts.email}`, icon: <FaEnvelope /> },
            { href: '/assets/pdfs/SarojResume.pdf',                  icon: <FaUser /> },
          ].map(({ href, icon }, i) => (
            <Link
              key={i}
              href={href}
              className="w-14 h-14 flex items-center justify-center rounded-full
                         bg-white/20 hover:bg-white/30 transition
                         text-2xl text-white shadow-lg"
            >
              {icon}
            </Link>
          ))}
        </div>

        {/* Scroll Prompt */}
        <Link
          href="#about"
          className="inline-block mt-10 text-base sm:text-lg text-white/70 hover:text-white animate-bounce"
        >
          ↓ Scroll Down
        </Link>
      </div>
    </section>
  );
}
