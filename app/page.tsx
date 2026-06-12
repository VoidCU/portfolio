import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MajorProjects from '@/components/MajorProjects';
import Projects from '@/components/Projects';
import Competencies from '@/components/Competencies';
import Timeline from '@/components/Timeline';
import Clients from '@/components/Clients';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AltimeterBoot from '@/components/fx/AltimeterBoot';
import TrailSpine from '@/components/fx/TrailSpine';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AltimeterBoot />
        <TrailSpine />
        <Hero />
        <About />
        <MajorProjects />
        <Projects />
        <Competencies />
        <Timeline />
        <Clients />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
