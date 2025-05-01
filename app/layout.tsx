import './globals.css';
import { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'voidcu – Saroj Prasad Mainali',
  description: 'Full-stack dev, AI explorer, tech leader',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
