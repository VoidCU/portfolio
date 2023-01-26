import React from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BsFile, BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Main = () => {
  function sendEmail() {
    window.location = "mailto:sarojprasadmainali@gmail.com";
  }
  return (
    <div id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-600">
            LET'S Build something together
          </p>
          <h1 className="py-4 text-gray-700">
            Hi, I'm <span className="text-[#5651e5]">Saroj</span>
          </h1>
          <h1 className="py-2 text-gray-700">AI Learner and Explorer.</h1>
          <p className="py-4 text-gray-600 max-w-[70%] m-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            vitae nihil. Blanditiis quae eligendi dolor quis, quod aliquid animi
            quisquam tenetur beatae cupiditate corporis ipsam odit esse
            inventore hic dolore.
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <Link href="https://www.linkedin.com/in/saroj-prasad-mainali/">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                <FaLinkedinIn />
              </div>
            </Link>

            <Link href="https://github.com/VoidCU">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                <FaGithub />
              </div>
            </Link>
            <div
              onClick={sendEmail}
              className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 "
            >
              <AiOutlineMail />
            </div>
            <a href="./../public/assets/output.pdf" download="Resume.pdf">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                <BsFillPersonLinesFill />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
