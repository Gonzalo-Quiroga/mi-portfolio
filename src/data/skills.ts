import type { SkillCategory } from "@/types/skill";

/**
 * Criterio de esta lista: solo lo que tiene respaldo directo en código propio y
 * se puede defender con un caso concreto en una entrevista (el mismo que se
 * aplicó al titular y a las aptitudes de LinkedIn, ver `linkedin-notes.md`).
 *
 * Docker se sacó por eso: no aparece en ninguno de los 24 repos de Cloudnet ni
 * en los proyectos personales — la infraestructura real es Azure Static Web
 * Apps / App Service, Vercel y Supabase, todo PaaS y serverless, sin
 * contenedores. Ya se había sacado del titular y de las aptitudes de LinkedIn;
 * el portfolio era el último lugar donde quedaba.
 */
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
      "PWA",
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
      "Git",
      "GitHub Actions",
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
      /*
        Confirmada por el usuario el 2026-08-10, para quedar en línea con el CV.
        `linkedin-notes.md` la tenía marcada como pendiente de verificar ("que
        sea uso real y regular, no algo probado una vez"): ese pendiente se
        resuelve acá, no queda abierto.
      */
      "Claude Cowork",
    ],
  },
];
