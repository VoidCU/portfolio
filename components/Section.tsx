import { ReactNode } from 'react';
import MDiv from '@/components/MotionDiv';

type Props = { id: string; children: ReactNode };

export default function Section({ id, children }: Props) {
  return (
    <MDiv
      id={id}
      className="snap-start flex items-center justify-center px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl w-full">{children}</div>
    </MDiv>
  );
}
