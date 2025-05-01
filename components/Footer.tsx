// src/components/Footer.tsx
'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="bg-[#111827] py-8">
      <div className="container mx-auto max-w-6xl px-4 text-center space-y-4">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 text-xl text-slate-400">
          <Link href={profile.contacts.github} className="hover:text-teal-400">
            <FaGithub />
          </Link>
          <Link href={profile.contacts.linkedin} className="hover:text-teal-400">
            <FaLinkedin />
          </Link>
          <Link href={`mailto:${profile.contacts.email}`} className="hover:text-teal-400">
            <FaEnvelope />
          </Link>
        </div>

        {/* Contact Info */}
        <p className="text-slate-500 text-sm">
          {profile.contactSection.text}
        </p>

        {/* Copyright */}
        <p className="text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
