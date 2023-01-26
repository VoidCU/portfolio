import React from "react";
import SkillItems from "./SkillItems";

import arduinologo from "../public/assets/skills/arduino.png";
import reactlogo from "../public/assets/skills/react.png";
import blenderlogo from "../public/assets/skills/blender.png";
import clogo from "../public/assets/skills/c.png";
import cpplogo from "../public/assets/skills/cpp.png";
import pythonlogo from "../public/assets/skills/python.png";
import csharplogo from "../public/assets/skills/csharp.png";
import csslogo from "../public/assets/skills/css.png";
import htmllogo from "../public/assets/skills/html.png";
import jslogo from "../public/assets/skills/js.png";
import figmalogo from "../public/assets/skills/figma.png";
import flutterlogo from "../public/assets/skills/flutter.png";
import gitlogo from "../public/assets/skills/git.png";
import githublogo from "../public/assets/skills/github.png";
import photoshoplogo from "../public/assets/skills/photoshop.png";
import illustratorlogo from "../public/assets/skills/illustrator.png";
import prologo from "../public/assets/skills/pro.png";
import unitylogo from "../public/assets/skills/unity.png";
import mysqllogo from "../public/assets/skills/mysql.png";
import opencvlogo from "../public/assets/skills/opencv.png";
import nodejslogo from "../public/assets/skills/nodejs.png";
import pytorchlogo from "../public/assets/skills/pytorch.png";
import matlablogo from "../public/assets/skills/matlab.png";
import tailwindcsslogo from "../public/assets/skills/tailwindcss.png";
import tensorflowlogo from "../public/assets/skills/tensorflow.png";
import nextjslogo from "../public/assets/skills/nextjs.png";

const Skills = () => {
  return (
    <div id="skills" className="w-full  p-2 py-8">
      <div className=" py-16 max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4">What I Have Idea About</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SkillItems title="Arduino" logo={arduinologo} />
          <SkillItems title="React" logo={reactlogo} />
          <SkillItems title="Blender" logo={blenderlogo} />
          <SkillItems title="C" logo={clogo} />
          <SkillItems title="C++" logo={cpplogo} />
          <SkillItems title="Python" logo={pythonlogo} />
          <SkillItems title="C#" logo={csharplogo} />
          <SkillItems title="CSS" logo={csslogo} />
          <SkillItems title="HTML" logo={htmllogo} />
          <SkillItems title="JS" logo={jslogo} />
          <SkillItems title="Figma" logo={figmalogo} />
          <SkillItems title="Flutter" logo={flutterlogo} />
          <SkillItems title="Git" logo={gitlogo} />
          <SkillItems title="Github" logo={githublogo} />
          <SkillItems title="Photoshop" logo={photoshoplogo} />
          <SkillItems title="Illustrator" logo={illustratorlogo} />
          <SkillItems title="Premiere " logo={prologo} />
          <SkillItems title="Unity" logo={unitylogo} />
          <SkillItems title="MySQL" logo={mysqllogo} />
          <SkillItems title="OpenCV" logo={opencvlogo} />
          <SkillItems title="Nodejs" logo={nodejslogo} />
          <SkillItems title="Nextjs" logo={nextjslogo} />
          <SkillItems title="PyTorch" logo={pytorchlogo} />
          <SkillItems title="TensorFlow" logo={tensorflowlogo} />
          <SkillItems title="MatLab" logo={matlablogo} />
          <SkillItems title="TailWindCSS" logo={tailwindcsslogo} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
