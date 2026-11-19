import Providers from "@/components/Providers";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Skills from "@/components/Skills";
import CV from "@/components/CV";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { skills } from "@/lib/content";

export default function Home() {
  const marqueeWords = skills.groups.flatMap((g) => g.tags).slice(0, 10);
  return (
    <Providers>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <div className="backdrop" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="grain" />
      </div>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Marquee items={marqueeWords} />
        <Skills />
        <CV />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </Providers>
  );
}
