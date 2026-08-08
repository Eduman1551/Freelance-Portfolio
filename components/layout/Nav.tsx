"use client";

// components/layout/Nav.tsx
// Fixed top navigation bar.
// - Transparent → surface background transition on scroll
// - Logo wordmark "Kin" in terracotta
// - Nav links with draw-in underline animation
// - "Let's talk" CTA button (scrolls to #contact)
// - Mobile hamburger → slide-down drawer

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#2A1F15]/95 backdrop-blur-md border-b border-[#33261C]"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="font-[Bricolage_Grotesque,sans-serif] font-bold text-2xl text-[#E8834D] tracking-tight cursor-none select-none"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            data-cursor-hover
          >
            Kin
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} onClick={() => handleNav(link.href)}>
                {link.label}
              </NavLink>
            ))}
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
            >
              Let&apos;s talk
            </Button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden text-[#F2E6D3] cursor-none p-1"
            onClick={() => setMobileOpen((o) => !o)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-cursor-hover
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#17110C]/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-full bg-[#2A1F15] border-l border-[#33261C] flex flex-col pt-20 px-8 gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-semibold text-[#F2E6D3] hover:text-[#E8834D] transition-colors cursor-none"
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  data-cursor-hover
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-4"
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleNav("#contact")}
                  className="w-full"
                >
                  Let&apos;s talk
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── NavLink ──────────────────────────────────────────────────────────────────
function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      className="relative text-sm font-[Inter] text-[#93816C] hover:text-[#F2E6D3] transition-colors group cursor-none"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      data-cursor-hover
    >
      {children}
      {/* Draw-in underline */}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#E8834D] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
