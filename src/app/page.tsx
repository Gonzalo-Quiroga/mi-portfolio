import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { StackMarquee } from "@/components/sections/stack-marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <StackMarquee />
      <Projects />
      <Contact />
    </>
  );
}
