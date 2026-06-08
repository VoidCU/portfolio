import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#080d08] text-center px-6">
      <span className="label mb-6">404</span>
      <h1 className="font-heading font-black text-[#e8fdf0] text-6xl md:text-8xl tracking-tight mb-4">
        NOT FOUND
      </h1>
      <p className="text-[#86efac] text-sm max-w-sm mb-10 leading-relaxed">
        The page you are looking for does not exist. It may have moved, been deleted, or never existed in the first place.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
