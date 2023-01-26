import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectItem from "./ProjectItem";

import fitnesslogo from "../public/assets/project/FitnessFlow.jpg";
import hdrlogo from "../public/assets/project/handwritten.png";
import slabburlogo from "../public/assets/project/slabbur.jpg";
import snakelogo from "../public/assets/project/snake.jpg";

const Projects = () => {
  return (
    <div id="projects" className="w-full lg:h-screen p-2 py-8">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I've Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectItem
            title="Fitness Flow"
            logo={fitnesslogo}
            desc="Hackathon, Nextjs, TailwindCss"
            urllink="https://github.com/Suven-p/treasurehacks"
          />
          <ProjectItem
            title="Handwritten Devanagari Character Recognition"
            logo={hdrlogo}
            desc="OCR , ML, Tensorflow"
            urllink="https://github.com/VoidCU/handwritten_devanagari_character_recognition"
          />
          <ProjectItem
            title="Slabbur: History Matters"
            logo={slabburlogo}
            desc="React, Hacky New Year"
            urllink="https://github.com/VoidCU/Slaabur"
          />
          <ProjectItem
            title="Snake Game: Computer Graphics"
            logo={snakelogo}
            desc="Game, C++, GLut"
            urllink="https://github.com/VoidCU/snake-and-ladder"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
