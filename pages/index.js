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
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
