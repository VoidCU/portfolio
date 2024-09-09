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
        <title>Saroj Prasad Mainali | VoidCU</title>
        <meta name="description" content=" Delve into the world of Saroj" />
        <meta name="keywords" content="Saroj, VoidCU, Saroj Prasad Mainali, Vloe, Saroj Void, Void Saroj, computer engineering" />
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
