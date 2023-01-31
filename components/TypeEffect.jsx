import React from "react";
import Typewriter from "typewriter-effect";

export default function TypingEffect() {
  return (
    <div>
      <Typewriter
        options={{
          strings: [
            "AI Learner and Explorer.",
            "Full Stack Developer",
            "Gamer and Game Developer",
            "Animator",
            "Problem Solver",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
