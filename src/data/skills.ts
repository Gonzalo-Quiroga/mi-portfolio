import type { SkillCategory } from "@/types/skill";

/**
 * Criterio de esta lista: solo lo que tiene respaldo directo en código propio y
 * se puede defender con un caso concreto en una entrevista (el mismo que se
 * aplicó al titular y a las aptitudes de LinkedIn, ver `linkedin-notes.md`).
 *
 * Lo que el equipo usa pero escribe otra persona no entra, aunque lo integre a
 * diario. Por eso la sección muestra el backend que escribe él, no el de cada
 * proyecto de cliente:
 * - Node.js: el runtime de su código de servidor. La API de contacto de este
 *   sitio y las rutas de Gastly (cron de notificaciones, push, auth) corren en
 *   Node.js, el runtime por defecto de Next.js.
 * - Supabase con Row Level Security, Edge Functions en Deno y API routes de
 *   Next.js (sistema de leads, Gastly, este portfolio).
 * - La integración de LLM del sistema de leads.
 *
 * Syncfusion entra porque la eligió e introdujo él como librería de
 * componentes de la empresa, y hoy está en 15 proyectos de clientes.
 *
 * Docker no figura: no aparece en ninguno de sus proyectos. "Claude Cowork"
 * tampoco, por decisión del usuario (2026-08-13), hasta tener un uso tan
 * documentado como el del resto.
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
      "Syncfusion",
      "PWA",
    ],
  },
  {
    id: "backend",
    title: "Backend & datos",
    skills: [
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Edge Functions (Deno)",
      "Next.js API Routes",
      "Resend",
    ],
  },
  {
    id: "ia",
    title: "IA",
    skills: [
      "OpenAI API",
      "Prompt engineering",
      "Claude Code",
      "Claude Design",
      "GitHub Copilot",
    ],
  },
  {
    id: "herramientas",
    title: "Testing & herramientas",
    skills: ["Vitest", "Git", "GitHub Actions", "Vercel", "Figma", "Jira"],
  },
];
