// src/app/not-found.tsx
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-center px-4">
      <h1 className="text-9xl font-extrabold text-teal-400 mb-4">404</h1>
      <p className="text-2xl text-slate-200 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-teal-400 text-black font-semibold rounded-full shadow-lg hover:bg-teal-300 transition"
      >
        <FaArrowLeft className="mr-2" /> Go Back Home
      </Link>
    </div>
  );
}
