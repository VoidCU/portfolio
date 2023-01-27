import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectItem = ({ title, logo, desc, urllink }) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-black rounded-xl p-4 group hover:bg-gradient-to-r from-[#51e5a2] to-[#70ff98]">
      <Image className="rounded-xl group-hover:opacity-10" src={logo} alt="/" />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl text-gray-900 tracking-wider text-center ">
          {title}
        </h3>
        <p className="pb-4 pt-2 text-gray-900 text-center">{desc}</p>
        <Link href={urllink}>
          <p className="text-center py-3 rounded-lg bg-black text-white font-bold text-lg cursor-pointer hover:scale-110 ease-in duration-300">
            More Info
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;
