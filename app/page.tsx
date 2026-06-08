import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Competencies from '@/components/Competencies';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Clients from '@/components/Clients';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Competencies />
        <Timeline />
        <Projects />
        <Clients />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
