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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
            illum officiis, atque laborum amet quasi magni, repellat quas
            perferendis assumenda tenetur quos impedit sunt! Perspiciatis quas
            molestiae nobis minus soluta. Qui quia recusandae repellat? Et nemo
            facere ipsam, blanditiis ipsum ex molestiae repellat neque harum
            eos, tempore eum quod reprehenderit suscipit magnam sit rem. Quod
            iste quas eaque harum! Dolores. Labore inventore cumque ad adipisci
            debitis quo harum! Vero natus facilis, quos inventore incidunt odio
            dolore obcaecati repudiandae praesentium quia sunt error. Voluptatem
            quisquam tenetur delectus magni soluta culpa obcaecati. Praesentium
            eos saepe nulla necessitatibus, ab consectetur voluptatum quasi aut
            maiores illum, quidem asperiores animi alias nesciunt? Corrupti
            minus nostrum at, recusandae voluptatem incidunt vel, perferendis
            adipisci, omnis numquam sed. Et neque laborum quod? Nulla
            praesentium vel accusamus ipsam culpa quibusdam deleniti ratione
            velit natus non, sunt excepturi ullam, illum exercitationem harum!
            Maxime facere aspernatur sit omnis corrupti doloremque eveniet.
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
