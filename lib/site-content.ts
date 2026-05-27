export type Skill = { title: string; tech: string };
export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};
export type Service = { title: string; desc: string };
export type FaqItem = { q: string; a: string };

export const siteContent = {
  brand: "Muhammed Rashik",
  tagline:
    "I build elegant, fast, and accessible web experiences with Python, Tailwind CSS, and modern JavaScript.",

  aboutShort:
    "I'm a full‑stack developer who loves crafting stylish, interactive UIs and solid backends. " +
    "Specialising in Python ecosystems, I bring ideas from wireframe to production with clean code and delightful UX.",

  aboutFull: [
    "I'm a full‑stack developer who loves crafting stylish, interactive UIs and solid backends. " +
      "Specialising in Python ecosystems — Flask, Django, SQLAlchemy — I pair them with modern frontends built " +
      "with Tailwind CSS, vanilla JavaScript, and React. " +
      "I care deeply about performance, accessibility, and code maintainability. " +
      "Whether it's a REST API, a real‑time feature with Socket.io, or a pixel‑perfect landing page, " +
      "I approach every project with the same attention to detail.",
    "Outside of work I contribute to open‑source projects, mentor junior developers, and explore " +
      "machine‑learning integrations for web apps. I believe great software is built through collaboration, " +
      "clear communication, and a genuine passion for solving problems.",
  ],

  skills: [
    {
      title: "Frontend",
      tech: "HTML, CSS, Tailwind, JavaScript, React, Bootstrap, Canvas",
    },
    { title: "Backend", tech: "Python, Flask, Django, REST APIs" },
    { title: "Databases", tech: "MySQL, SQLite, MongoDB" },
    { title: "Tools", tech: "Git, Docker basics, CI/CD" },
  ] as Skill[],

  experience: [
    {
      role: "IT Assistant  ",
      company: "Thiru Kochi Fincap Limeted Kochi",
      period: "Present - 2026",
      description:
        "Provided IT support and technical assistance for daily business operations, including system maintenance, troubleshooting hardware and software issues, managing user accounts, and ensuring smooth network functionality. Assisted staff with technical problems, maintained system performance, and supported overall IT infrastructure to improve operational efficiency and reliability.",
    },
    {
      role: "Python Full Stack Developer",
      company: "One Team Solutions, Kochi",
      period: "2024 - 2025",
      description:
        "Completed an internship as a Python Full Stack Developer Intern at OneTeam Solutions, " +
        "gaining hands-on experience in Django, React, and REST API integration. " +
        "Worked on real-world projects including web applications, authentication systems, " +
        "and UI/UX improvements.",
    },
  ] as Experience[],

  services: [
    {
      title: "Web Development",
      desc: "Full‑stack apps with Flask, Django, MERN, SQLAlchemy, Tailwind, and JS.",
    },
    {
      title: "API Design",
      desc: "RESTful APIs with secure auth and clean documentation.",
    },
    {
      title: "UI/UX Polish",
      desc: "Modern, accessible, and responsive UI implementation.",
    },
  ] as Service[],

  faq: [
    {
      q: "What stack do you use?",
      a: "Python (Flask / Django), Tailwind CSS, JavaScript, and MySQL with SQLAlchemy.",
    },
    {
      q: "Do you take freelance work?",
      a: "Yes — reach out via the contact form with project details.",
    },
    {
      q: "How fast do you respond?",
      a: "Usually within 24 hours on weekdays.",
    },
    {
      q: "Can you work remotely?",
      a: "Absolutely — I'm fully set up for remote collaboration.",
    },
  ] as FaqItem[],

  github: "https://github.com/Rashik8606",
  linkedin:
    "https://www.linkedin.com/in/muhammed-rashik-52407a2b3/",
};
