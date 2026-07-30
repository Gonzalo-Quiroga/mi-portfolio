import type { SkillCategory } from "@/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Astro",
      "Vite",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "Express", "Sequelize", "JWT", "Passport", "Auth0"],
  },
  {
    id: "datos-cloud",
    title: "Datos & Cloud",
    skills: [
      "PostgreSQL",
      "SQL Server",
      "Supabase",
      "Azure",
      "Vercel",
      "GitHub Actions",
      "Docker",
    ],
  },
  {
    id: "testing-otros",
    title: "Testing & otros",
    skills: [
      "Jest",
      "Supertest",
      "Vitest",
      "Socket.IO",
      "Mercado Pago",
      "Resend",
      "Swagger",
      "Jira",
      "Claude Code",
      "Claude Design",
    ],
  },
];
