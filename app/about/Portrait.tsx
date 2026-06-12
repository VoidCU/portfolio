'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * VOL.01 ORIGIN — field portrait. Duotone treatment matching the homepage
 * About language: grayscale ink + accent multiply + surface screen overlays,
 * clip-path entrance on ease-summit, internal parallax (image scaled 115%,
 * y ±8%), hover resolves to full color. Rotated mono marginalia on the frame.
 */
export default function Portrait({ degree }: { degree: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="relative w-full max-w-sm">
      <div className="pr-9">
        <motion.div
          ref={frameRef}
          className="group relative aspect-[3/4] overflow-hidden border border-line-3"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-12%' }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.8, ease: EASE_SUMMIT }}
        >
          {/* internal parallax: scaled 115%, y ±8% */}
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { y: imgY, scale: 1.15 }}
          >
            <Image
              src="/assets/me.jpeg"
              alt="Saroj Prasad Mainali — Full-Stack Engineer from Kathmandu, Nepal"
              width={1080}
              height={1440}
              priority
              sizes="(max-width: 1024px) 88vw, 384px"
              className="h-full w-full object-cover grayscale transition-[filter] duration-[400ms] group-hover:grayscale-0"
            />
          </motion.div>
          {/* theme-aware duotone tint layers — fade to full color on hover.
              Dark: mint-on-pine; light: evergreen-on-cream (tokens flip them). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent opacity-60 mix-blend-multiply transition-opacity duration-[400ms] group-hover:opacity-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-surface opacity-50 mix-blend-screen transition-opacity duration-[400ms] group-hover:opacity-0"
          />
        </motion.div>
      </div>

      {/* rotated mono marginalia along the frame edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 flex h-full items-start gap-3 [writing-mode:vertical-rl]"
      >
        <span className="label numeric whitespace-nowrap">FIG. 01 — THE ENGINEER</span>
        <span className="label numeric whitespace-nowrap">{degree}</span>
      </div>
    </div>
  );
}
