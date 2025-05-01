'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import logo from '/public/assets/logo.png'; // adjust path if needed

export default function Navbar() {

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark);
//   }, [dark]);

  return (
    <header className="fixed top-0 w-full px-6 py-4 z-50 bg-gray-900 dark:bg-gray-800 shadow-md transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
      {/* Logo on the left */}
      <Link href="#home" className="flex items-center">
        <Image src={logo} alt="voidcu logo" width={300} height={48} />
      </Link>

      {/* Social icons + theme toggle on the right */}
      <div className="flex items-center space-x-4">
        <Link href="https://linkedin.com/in/saroj-prasad-mainali" className="text-white hover:text-teal-300">
          <FaLinkedin size={20} />
        </Link>
        <Link href="https://github.com/VoidCU" className="text-white hover:text-teal-300">
          <FaGithub size={20} />
        </Link>
        <Link href="mailto:sarojprasadmainali@gmail.com" className="text-white hover:text-teal-300">
          <FaEnvelope size={20} />
        </Link>
        
      </div>
      </div>
    </header>
  );
}
