// lib/content.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio copy, links, and data.
// Edit this file to update any text content without touching component logic.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Kin",
  fullName: "Ayushman Shekhawat",
  tagline: "Web developer for small businesses",
  metaDescription:
    "Custom, personal websites for small businesses. Built solo — no agency overhead, no AI templates, just real craftsmanship at an honest price.",
  url: "https://kinbuilds.vercel.app",
  vercelProject: "kinbuilds",
} as const;

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "About",      href: "#about"     },
  { label: "Projects",   href: "#projects"  },
  { label: "How I Work", href: "#process"   },
  { label: "Contact",    href: "#contact"   },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroLines = [
  { text: "BUILDING",      weight: "bold",   color: "text",    style: "normal"  },
  { text: "confident",     weight: "bold",   color: "primary", style: "normal"  },
  { text: "websites",      weight: "normal", color: "text",    style: "italic"  },
  { text: "for small biz.", weight: "normal", color: "secondary", style: "normal" },
] as const;

export const heroTagline =
  "I build websites, solo, for small businesses who don't want to pay high prices to hire professional developers but still want the personalization that plain AI-generated websites can't give.";

export const marqueeWords = ["custom-built", "fast", "personal", "affordable"];

// ─── About ────────────────────────────────────────────────────────────────────

export const aboutContent = {
  intro: "Hey, I'm Kin.",
  paragraphs: [
    "I'm Ayushman Shekhawat — a solo web developer who goes by Kin. I build custom websites for small local businesses that want a real, personal online presence without the agency price tag.",
    "Every site I build gets my full attention from start to finish. No hand-offs, no cookie-cutter templates, no AI-spun copy. Just thoughtful design, clean code, and a website that actually feels like *you*.",
    "If you run a local business and you've been putting off a website because it seems complicated or expensive — let's change that.",
  ],
  imageSrc: "/images/profile.jpeg",
  imageAlt: "Ayushman 'Kin' Shekhawat — freelance web developer",
};

// ─── Skills ───────────────────────────────────────────────────────────────────

export type Skill = { name: string; category: "frontend" | "styling" | "tools" };

export const skills: Skill[] = [
  // Frontend
  { name: "React",        category: "frontend" },
  { name: "Next.js",      category: "frontend" },
  { name: "TypeScript",   category: "frontend" },
  { name: "JavaScript",   category: "frontend" },
  { name: "HTML & CSS",   category: "frontend" },

  // Styling / Animation
  { name: "Tailwind CSS",    category: "styling"   },
  { name: "Framer Motion",   category: "styling"   },
  { name: "GSAP",            category: "styling"   },
  { name: "Responsive Design", category: "styling" },

  // Tools / Deployment
  { name: "Git & GitHub", category: "tools" },
  { name: "Vercel",       category: "tools" },
  { name: "Figma",        category: "tools" },
  { name: "VS Code",      category: "tools" },
];

export const skillCategories = {
  frontend: { label: "Frontend",           color: "primary"   },
  styling:  { label: "Styling & Motion",   color: "secondary" },
  tools:    { label: "Tools & Deployment", color: "highlight" },
} as const;

// ─── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
  year: string;
  status: "placeholder" | "completed";
};

export const projects: Project[] = [
  {
    id: "aether",
    name: "Aether Apparel",
    description: "A modern, sleek e-commerce frontend for an apparel brand. Features smooth animations and a premium shopping experience.",
    tags: ["E-commerce", "Frontend", "React"],
    imageSrc: "/images/project-home-1.png",
    imageAlt: "Aether Apparel project screenshot",
    href: "https://aether-apparel-frontend.vercel.app/",
    year: "2025",
    status: "completed",
  },
  {
    id: "maple",
    name: "Maple Hearth Cafe",
    description: "A cozy, welcoming website for a local cafe. Showcases the menu, location, and a warm atmosphere.",
    tags: ["Web Design", "Development", "Branding"],
    imageSrc: "/images/project-home-2.png",
    imageAlt: "Maple Hearth Cafe project screenshot",
    href: "https://maple-hearth-cafe-project.vercel.app/",
    year: "2025",
    status: "completed",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start with a friendly conversation — I learn about your business, your customers, and what you need your website to actually do for you.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I put together a design that fits your brand and feels right. You give feedback, we refine — no surprises, no jargon.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your site gets built from scratch — clean, fast, mobile-friendly, and uniquely yours. I keep you updated every step of the way.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We go live together. I handle the technical setup so you don't have to worry about a thing — and I'm always around after launch.",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactContent = {
  headline: "Let's build something",
  headlineAccent: "together.",
  subtext:
    "Have a project in mind? Want to chat about what a website could do for your business? Reach out — I don't bite, and I promise no pushy sales pitch.",
  whatsapp: {
    label: "Chat on WhatsApp",
    href: "https://wa.me/919054614477",
    hint: "Fastest response — usually within a few hours",
  },
  email: {
    label: "eduman1551@gmail.com",
    href: "mailto:eduman1551@gmail.com",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayushman-shekhawat-90451536b/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Eduman1551/",
  },
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerContent = {
  wordmark: "Kin",
  tagline: "Custom websites for small businesses.",
  copyright: `© ${new Date().getFullYear()} Ayushman Shekhawat. All rights reserved.`,
};
