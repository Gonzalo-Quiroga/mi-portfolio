/**
 * Cae a un placeholder si NEXT_PUBLIC_SITE_URL no está configurada
 * (ej. en un preview deploy sin la env var). Sin barra final: quien
 * concatena un path (robots.ts) ya le antepone la suya.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
).replace(/\/+$/, "");

export const siteName = "Gonzalo Quiroga — Desarrollador Full Stack";

export const siteDescription =
  "Portfolio de Gonzalo Quiroga, Desarrollador Full Stack especializado en React, Node.js y TypeScript.";
