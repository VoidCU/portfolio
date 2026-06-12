import localFont from 'next/font/local';
import { Fraunces, JetBrains_Mono } from 'next/font/google';

/* Display — Clash Display (Fontshare, FFL license in app/fonts/) */
export const clash = localFont({
  src: [
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-clash',
  display: 'swap',
});

/* Body — General Sans (Fontshare, FFL license in app/fonts/) */
export const general = localFont({
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-general',
  display: 'swap',
});

/* Voice/epigraph — Fraunces italic, variable (opsz + WONK axes) */
export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  weight: 'variable',
  axes: ['opsz', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
});

/* Instrument mono — JetBrains Mono */
export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});
