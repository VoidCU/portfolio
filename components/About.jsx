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
          <p className="py-2 text-gray-300 tracking-widest text-lg">
            Hello! I am Saroj, a computer engineering student at Thapathali
            Campus. I am passionate about technology and always strive to create
            innovative solutions through my work. My experience in game
            development, app development, website development, and machine
            learning has equipped me with a diverse set of skills that I can
            bring to any project. I am dedicated to my craft and take pride in
            delivering top-quality results. Whether you need a new app or
            website, or have ideas for a game or machine learning project, I am
            confident in my ability to bring your vision to life with
            exceptional results.
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
