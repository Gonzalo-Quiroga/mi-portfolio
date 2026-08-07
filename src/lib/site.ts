/**
 * Cae a un placeholder si NEXT_PUBLIC_SITE_URL no está configurada
 * (ej. en un preview deploy sin la env var). Sin barra final: quien
 * concatena un path (robots.ts) ya le antepone la suya.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
).replace(/\/+$/, "");

export const siteName = "Gonzalo Quiroga — Desarrollador Full Stack";

/**
 * Habla a los dos públicos que entran al sitio en el mismo renglón: el stack
 * para el reclutador que filtra por tecnología, "de punta a punta para
 * emprendedores y pequeñas empresas" para el cliente que busca quién le haga el
 * proyecto. Bajo 160 caracteres para que no la corte Google.
 */
export const siteDescription =
  "Desarrollador Full Stack con foco en React, Node.js y TypeScript. Aplicaciones en producción y proyectos freelance de punta a punta. Córdoba, Argentina · Remoto.";
