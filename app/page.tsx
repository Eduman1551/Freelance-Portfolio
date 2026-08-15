// app/page.tsx
// Main page — assembles all sections in order.

import { Nav }          from "@/components/layout/Nav";
import { Footer }       from "@/components/layout/Footer";
import { Hero }         from "@/components/sections/Hero";
import { About }        from "@/components/sections/About";
import { Skills }       from "@/components/sections/Skills";
import { Projects }     from "@/components/sections/Projects";
import { Experience }   from "@/components/sections/Experience";
import { HowIWork }     from "@/components/sections/HowIWork";
import { Contact }      from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="bg-[#17110C] min-h-screen">
      <ScrollProgress />
      <Nav />

      {/* ─── Hero ─── */}
      <Hero />


      {/* ─── About ─── */}
      <About />

      {/* ─── Skills ─── */}
      <Skills />

      <Projects />

      <Experience />

      <HowIWork />

      {/* ─── Contact ─── */}
      <Contact />

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  );
}
