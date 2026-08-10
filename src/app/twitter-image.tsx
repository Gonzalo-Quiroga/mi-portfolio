/**
 * X/Twitter lee `twitter:image` y no cae a `og:image` de forma confiable, así
 * que necesita su propio archivo. Es exactamente la misma tarjeta: se reexporta
 * el componente de Open Graph en vez de duplicar la composición.
 *
 * `size`, `contentType`, `alt` y `dynamic` sí se declaran acá y no se
 * reexportan: Next los parsea estáticamente en tiempo de compilación y un
 * `export { ... } from` no le sirve — falla el build con "The exported
 * configuration object needs to have a very specific format".
 */
export { default } from "./opengraph-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Gonzalo Quiroga — Desarrollador Full Stack. React, Node.js y TypeScript.";
export const dynamic = "force-static";
