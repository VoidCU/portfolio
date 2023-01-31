import React from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import TypingEffect from "./TypeEffect";

const Main = () => {
  function sendEmail() {
    window.location = "mailto:sarojprasadmainali@gmail.com";
  }
  return (
    <div id="home" className="w-full h-screen text-center ">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-[#ecf0f3] ">
            LET&#39;S Build something together
          </p>
          <h1 className="py-4 text-[#ecf0f3]">
            Hi, I&#39;m <span className="text-[#57daac]">Saroj</span>
          </h1>
          <div>
            <h1 className="py-2 text-[#ecf0f3]">
              <TypingEffect />
            </h1>
          </div>

          <p className="py-4 text-[#aaafb3]  m-auto w-[65%]">
            I&#39;m trying to build my own world in my own universe.
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <Link href="https://www.linkedin.com/in/saroj-prasad-mainali/">
              <div className="rounded-full shadow-lg shadow-black p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                <FaLinkedinIn />
              </div>
            </Link>

            <Link href="https://github.com/VoidCU">
              <div className="rounded-full shadow-lg shadow-black p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                <FaGithub />
              </div>
            </Link>
            <div
              onClick={sendEmail}
              className="rounded-full shadow-lg shadow-black p-6 cursir-pointer hover:scale-110 ease-in duration-300 "
            >
              <AiOutlineMail />
            </div>
            <Link href="../public/assets/output.pdf">
              <div className="rounded-full shadow-lg shadow-black p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <BsFillPersonLinesFill />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
