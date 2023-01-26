import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import logoimg from "../public/assets/logo.png";

import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  function sendEmail() {
    window.location = "mailto:sarojprasadmainali@gmail.com";
  }

  return (
    <div
      style={{ backgroundColor: "#ecf0f3" }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100]"
          : "fixed w-full h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image src={logoimg} alt="/" width={350} height="auto" />
        </Link>

        <div>
          <ul className="hidden md:flex">
            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="/">Home</Link>
            </li>

            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="#about">About</Link>
            </li>

            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="#skills">Skills</Link>
            </li>

            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="#projects">Projects</Link>
            </li>

            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? " md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link onClick={() => setNav(false)} href="/">
                <Image src={logoimg} alt="/" width="87" height="35" />
              </Link>
              <div
                div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md-w-[90%] py-4">Learning Everyday.</p>
            </div>
          </div>
          <div className="py-4 flex-col">
            <ul className="uppercase">
              <li onClick={() => setNav(false)} className="py-4 text-sm">
                <Link href="/">Home</Link>
              </li>

              <li onClick={() => setNav(false)} className="py-4 text-sm">
                <Link href="/#about">About</Link>
              </li>

              <li onClick={() => setNav(false)} className="py-4 text-sm">
                <Link href="/#skills">Skills</Link>
              </li>

              <li onClick={() => setNav(false)} className="py-4 text-sm">
                <Link href="/#projects">Projects</Link>
              </li>

              <li onClick={() => setNav(false)} className="py-4 text-sm">
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5] ">
                Let&#39;s Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <Link href="https://www.linkedin.com/in/saroj-prasad-mainali/">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursir-pointer hover:scale-105 ease-in duration-300 ">
                    <FaLinkedinIn />
                  </div>
                </Link>
                <Link href="https://github.com/VoidCU">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursir-pointer hover:scale-105 ease-in duration-300 ">
                    <FaGithub />
                  </div>
                </Link>

                <div
                  onClick={sendEmail}
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursir-pointer hover:scale-105 ease-in duration-300 "
                >
                  <AiOutlineMail />
                </div>
                <a href="./../public/assets/output.pdf" download="Resume.pdf">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursir-pointer hover:scale-105 ease-in duration-300 ">
                    <BsFillPersonLinesFill />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
