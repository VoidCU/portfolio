import React from "react";

const About = () => {
  return (
    <div id="about" className="w-full p-2 flex items-center py-16">
      <div className=" py-8 max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#57daac]">
            About
          </p>
          <h2 className="py-4">Who I Am</h2>
          <p className="py-2 text-gray-300 tracking-widest ">
            BE final year student at Thapathali Engineering College, IOE.
          </p>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-black rounded-full flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
          <img
            src="https://raw.githubusercontent.com/VoidCU/VoidCU/main/assets/saroj.png"
            alt="/"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
