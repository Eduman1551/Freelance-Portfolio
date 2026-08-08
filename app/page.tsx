// app/page.tsx
// Main page — assembles all sections in order.

import { Nav }         from "@/components/layout/Nav";
import { Footer }      from "@/components/layout/Footer";
import { Hero }        from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { About }       from "@/components/sections/About";
import { Skills }      from "@/components/sections/Skills";
import { Projects }    from "@/components/sections/Projects";
import { HowIWork }    from "@/components/sections/HowIWork";
import { Contact }     from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#17110C] min-h-screen">
      {/* ─── Fixed Navigation ─── */}
      <Nav />

      {/* ─── Hero ─── */}
      <Hero />

      {/* ─── Marquee Band ─── */}
      <MarqueeBand />

      {/* ─── About ─── */}
      <About />

      {/* ─── Skills ─── */}
      <Skills />

      {/* ─── Projects ─── */}
      <Projects />

      {/* ─── How I Work ─── */}
      <HowIWork />

      {/* ─── Contact ─── */}
      <Contact />

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  );
}
