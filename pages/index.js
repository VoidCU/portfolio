import Head from "next/head";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// import logoimg from "../public/assets/logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Saroj | Learner</title>
        <meta name="description" content=" Delve into the world of Saroj, a talented computer engineering student at Thapathali Campus, renowned for their passion and innovative spirit in technology. With expertise in game development, app development, website development, and machine learning, Saroj brings a versatile skill set to every project. Experience their commitment to excellence and unrivaled craftsmanship as they transform ideas into reality, whether it's crafting captivating apps, websites, games, or exploring the realms of machine learning. Discover the boundless potential of technology through Saroj's ingenuity and unlock a future of limitless possibilities." />
        <meta name="keywords" content="Saroj, VoidCU, Saroj Prasad Mainali, Vloe, Saroj Void, Void Saroj, computer engineering, technology, innovation, game development, app development, website development, machine learning, craftsmanship, excellence, future, possibilities" />
      </Head>
      <Navbar />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
