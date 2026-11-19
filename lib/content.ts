/* ==========================================================================
   SITE CONTENT  <-- EDIT HERE to change any wording on the site.
   The components only handle layout and animation; every word lives here.
   ========================================================================== */

export const site = {
  name: "Ogbanje Abraham",
  firstName: "Ogbanje",
  lastName: "Abraham",
  title: "Ogbanje Abraham — Software Engineer (Go, Python, AI)",
  description:
    "Ogbanje Abraham is a software engineer in Nigeria building reliable, accessible web applications with Go and Python, and growing into AI-native engineering.",
  ogTitle: "Ogbanje Abraham — Software Engineer",
  ogDescription:
    "Building reliable, accessible web applications with Go and Python. Growing into AI-native engineering.",
  // AFTER YOU HAVE A LIVE URL: put it here (e.g. "https://abrahamogbanje.github.io").
  // It fills in og:url, og:image and the canonical link for nicer link previews.
  url: "" as string,
  email: "creativeuivison@gmail.com",
  // CV: replace public/Ogbanje_Abraham_CV.pdf with a new file of the SAME NAME.
  cvFile: "/Ogbanje_Abraham_CV.pdf",
  cvDownloadName: "Ogbanje_Abraham_CV.pdf",
  // Photo: replace public/photo.jpg with a new square image of the same name (around 700x700 px).
  photo: "/photo.jpg",
  photoAlt: "Portrait of Ogbanje Abraham in a light blue striped shirt",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Hello, I'm",
  tagline:
    "Software engineer building reliable, accessible web applications, and growing into AI-native engineering.",
  meta: ["Based in Nigeria", "Open to opportunities"],
  primary: { href: "#projects", label: "View my work" },
  secondary: { href: "#contact", label: "Get in touch" },
};

export const about = {
  title: "About me",
  paragraphs: [
    "I'm a software engineer with a background in Industrial Physics, and I'm training to become a full-stack, AI-native engineer. I enjoy turning a clear problem into clean, well-structured software that works reliably and is pleasant to use.",
    "Right now I build with Go and Python: web servers and templates, API-driven apps, and command-line tools with validation, search and tests. I also care about the front end, including responsive layouts and accessibility. In parallel, I'm working through AI engineering from first principles so I can build products that use AI well.",
  ],
  timeline: [
    {
      date: "Nov 2025 – Present",
      title: "Learn2Earn Fellowship (01-edu)",
      text: "Software development track with a project-based, peer-evaluated curriculum. Go is the foundation, progressing through increasingly complex web projects.",
    },
    {
      date: "2019 – 2024",
      title: "B.Sc. Industrial Physics",
      text: "Joseph Sarwuan Tarka University, Makurdi. Graduated with Second Class Upper Division.",
    },
  ],
};

export type ProjectLink = { href: string; label: string; ariaLabel: string };

export const projects = {
  title: "Projects",
  intro:
    "Selected work from my fellowship and self-study. Each one taught me something about building software that holds up.",
  /* To add a project, copy one { ... } block below.
     To add a live demo link, add to its `links`:
       { href: "https://YOUR-DEMO-URL", label: "Live demo", ariaLabel: "PROJECT NAME live demo" }
     To point a source link at one repository, use https://github.com/abrahamogbanje/REPO-NAME */
  items: [
    {
      title: "ASCII Art Web",
      text: "A browser-based ASCII art generator backed by a Go HTTP server, with HTML templates and form handling. Styled to be responsive and accessible.",
      tags: ["Go", "HTML templates", "CSS", "Accessibility"],
      links: [
        {
          href: "https://github.com/abrahamogbanje",
          label: "Source code",
          ariaLabel: "ASCII Art Web source code on GitHub",
        },
      ] as ProjectLink[],
    },
    {
      title: "PropBrain AI",
      text: "An AI-assisted lease extraction service for small landlords. It turns scanned PDF leases into a clear report of tasks, financial terms and notice deadlines. Currently validating demand.",
      tags: ["AI / LLMs", "Docling OCR", "Qwen 2.5", "Modal"],
      links: [
        /* When the propbrain-ai repository is public, add its link here:
        { href: "https://github.com/abrahamogbanje/propbrain-ai", label: "Source code", ariaLabel: "PropBrain AI source code on GitHub" }, */
        {
          href: "https://propbrainai.vercel.app",
          label: "Sample report",
          ariaLabel: "PropBrain AI sample report",
        },
      ] as ProjectLink[],
    },
    {
      title: "CampusFlow Next",
      text: "A reliability upgrade of a Python command-line ticket app, adding input validation, notes, search, reports and safe JSON storage, backed by unit tests and peer code review.",
      tags: ["Python", "CLI", "unittest", "JSON", "Git"],
      links: [
        {
          href: "https://github.com/abrahamogbanje/campusflow",
          label: "Source code",
          ariaLabel: "CampusFlow Next source code on GitHub",
        },
      ] as ProjectLink[],
    },
  ],
};

export const skills = {
  title: "Skills",
  intro: "Tools and technologies I work with, and what I'm learning next.",
  groups: [
    { title: "Languages", tags: ["Go", "Python", "HTML", "CSS"] },
    {
      title: "Web & APIs",
      tags: ["HTTP servers", "HTML templates", "REST APIs", "JSON", "Responsive design", "Accessibility"],
    },
    { title: "Engineering practice", tags: ["Git & GitHub", "Unit testing", "Code review", "CLI tools"] },
    { title: "Learning now", tags: ["AI engineering", "Full-stack development"] },
  ],
};

export const cv = {
  title: "Curriculum vitae",
  text: "A summary of my background, projects and skills, ready to read or save.",
  view: { label: "View CV", ariaLabel: "View my CV as a PDF (opens in a new tab)" },
  download: { label: "Download", ariaLabel: "Download my CV as a PDF" },
};

export const contact = {
  title: "Let's talk",
  text: "I'm open to new opportunities and collaborations. The best way to reach me is by email.",
  copy: "Copy",
  copied: "Copied!",
  copyFailed: "Press Ctrl/Cmd+C to copy",
  copyUnsupported: "Copy not supported here",
  socials: [
    { href: "https://github.com/abrahamogbanje", label: "GitHub" },
    // WhatsApp: wa.me needs the number in international format with no + or leading 0 (Nigeria = 234).
    { href: "https://wa.me/2347025847919", label: "WhatsApp", ariaLabel: "Message me on WhatsApp, 0702 584 7919" },
    { href: "https://www.linkedin.com/in/abraham-ogbanje-522744351", label: "LinkedIn" },
  ] as { href: string; label: string; ariaLabel?: string }[],
};

export const footer = {
  rights: "Ogbanje Abraham. All rights reserved.",
  backToTop: "Back to top",
};

export const notFound = {
  title: "Page not found",
  text: "The page you're looking for doesn't exist.",
  back: "Back to the portfolio",
};
