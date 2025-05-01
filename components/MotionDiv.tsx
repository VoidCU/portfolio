'use client';
import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Dynamically import ONLY the piece we need; disable SSR
const MotionDiv = dynamic(
  () =>
    import('framer-motion').then(({ motion }) => motion.div),
  { ssr: false }
);

type Props = ComponentProps<typeof MotionDiv>;

export default function MDiv(props: Props) {
  return <MotionDiv {...props} />;
}
