export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Connectify",
    description:
      "A modern social platform prototype with real-time interactions.",
    techStack: "Flask, JS, Tailwind, Socket.io",
    imageUrl: "/images/Connectify.png",
    projectUrl: "https://github.com/Rashik8606/Connectify",
    githubUrl: "https://github.com/Rashik8606/Connectify",
  },
  {
    id: 2,
    title: "OnlineMov",
    description: "Movie discovery app with search, filters, and watchlists.",
    techStack: "Flask, TMDB API, Tailwind, SQLite",
    imageUrl: "/images/OnlineMov.png",
    projectUrl: "https://github.com/Rashik8606/Express-basics",
    githubUrl: "https://github.com/Rashik8606/Express-basics",
  },
  {
    id: 3,
    title: "Taskizo",
    description: "Task management app with drag-and-drop and reminders.",
    techStack: "Flask, JS, Tailwind, SQLAlchemy",
    imageUrl: "/images/Taskizo.png",
    projectUrl: "https://github.com/Rashik8606/Job-Indeed",
    githubUrl: "https://github.com/Rashik8606/Job-Indeed",
  },
  {
    id: 4,
    title: "Vegstore",
    description:
      "E-commerce demo focused on fresh produce with cart and checkout.",
    techStack: "Flask, Tailwind, SQLAlchemy",
    imageUrl: "/images/Vegstore.png",
    projectUrl: "https://github.com/Rashik8606/vegstore",
    githubUrl: "https://github.com/Rashik8606/vegstore",
  },
  {
    id: 5,
    title: "Credisure",
    description: "Online Micro Loan Management app.",
    techStack: "Django, React, MySQL",
    imageUrl: "/images/credisure.png",
    projectUrl: "https://github.com/Rashik8606/credisure",
    githubUrl: "https://github.com/Rashik8606/credisure",
  },
];

export function projectLink(p: Project): string {
  if (p.githubUrl && p.githubUrl !== "#") return p.githubUrl;
  if (p.projectUrl && p.projectUrl !== "#") return p.projectUrl;
  return "#";
}
