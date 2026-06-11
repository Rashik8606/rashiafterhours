export type CurrentProject = {
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl: string;
  status: "live" | "in-progress";
  statusLabel: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const currentProject: CurrentProject = {
  title: "Credisure",
  description:
    "An online micro loan management platform I'm actively building — from loan applications and approvals to repayment tracking and admin dashboards.",
  highlights: [
    "Role-based dashboards for admins and borrowers",
    "Loan lifecycle management with automated status updates",
    "Secure authentication and REST API integration",
  ],
  techStack: ["Django", "React", "MySQL", "Tailwind CSS"],
  imageUrl: "/images/credisure.png",
  status: "in-progress",
  statusLabel: "In Progress",
  liveUrl: "",
  githubUrl: "https://github.com/Rashik8606/credisure",
};
