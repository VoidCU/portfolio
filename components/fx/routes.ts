/* THE ASCENT — canonical route table (CONTRACT §5). Single source for ChapterNav. */
export type Volume = {
  href: string;
  volume: string;
  title: string;
  altitude: string;
};

export const VOLUMES: Volume[] = [
  { href: '/',            volume: 'VOL.00', title: 'BASECAMP',         altitude: '1,400M' },
  { href: '/about',       volume: 'VOL.01', title: 'ORIGIN',           altitude: '2,300M' },
  { href: '/projects',    volume: 'VOL.02', title: 'EXPEDITIONS',      altitude: '3,500M' },
  { href: '/open-source', volume: 'VOL.03', title: 'FIELD KITS',       altitude: '4,000M' },
  { href: '/skills',      volume: 'VOL.04', title: 'INSTRUMENTS',      altitude: '5,300M' },
  { href: '/experience',  volume: 'VOL.05', title: 'THE ROUTE',        altitude: '6,200M' },
  { href: '/clients',     volume: 'VOL.06', title: 'SIGNALS',          altitude: '7,100M' },
  { href: '/achievements',volume: 'VOL.07', title: 'SUMMIT LOG',       altitude: '8,000M' },
  { href: '/blog',        volume: 'VOL.08', title: 'FIELD NOTES',      altitude: '8,200M' },
  { href: '/now',         volume: 'VOL.09', title: 'PRESENT POSITION', altitude: '8,400M' },
  { href: '/uses',        volume: 'VOL.10', title: 'GEAR MANIFEST',    altitude: '8,500M' },
  { href: '/contact',     volume: 'VOL.11', title: 'TRANSMISSION',     altitude: '8,600M' },
];
