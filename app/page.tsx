import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Competencies from '@/components/Competencies';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import MajorProjects from '@/components/MajorProjects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Competencies />
      <Timeline />
      <Projects />
      <MajorProjects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
