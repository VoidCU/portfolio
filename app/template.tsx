"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[150] bg-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
      />
    </>
  );
}
