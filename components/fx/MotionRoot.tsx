'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Wraps the app in MotionConfig so every Framer Motion animation
 * respects the user's prefers-reduced-motion setting (brief §7).
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
