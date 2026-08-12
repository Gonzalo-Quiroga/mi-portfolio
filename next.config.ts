import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * El sitio no carga ningún recurso de terceros: las fuentes las sirve next/font
 * desde el propio origen y las únicas URLs externas del HTML son enlaces `<a>`,
 * no recursos. Por eso todo puede quedar en `'self'`.
 *
 * `'unsafe-inline'` en script-src es una concesión, no un descuido: Next emite
 * ~41 scripts inline para hidratar y pasar el payload RSC. La alternativa son
 * nonces por request vía middleware, que obliga a renderizar todas las páginas
 * de forma dinámica — se perdería el prerenderizado estático completo a cambio
 * de poco: la única entrada de usuario del sitio es el formulario de contacto,
 * y su contenido nunca se vuelve a renderizar en la página, se manda como texto
 * a Resend. No hay superficie real de XSS que ese nonce estuviera protegiendo.
 *
 * Lo que sí aporta esta CSP aunque tenga unsafe-inline: `script-src 'self'`
 * bloquea la carga de scripts remotos, `object-src 'none'` mata plugins,
 * `base-uri 'self'` evita el secuestro de URLs relativas y `form-action 'self'`
 * impide que un formulario inyectado postee a otro dominio.
 */
/*
 * React en modo desarrollo usa `eval()` para reconstruir stacks de error, y la
 * CSP lo bloquea: la consola se llena de "eval() is not supported". Solo se
 * agrega en dev — el bundle de producción nunca lo necesita.
 */
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  /* Redundante con frame-ancestors, pero lo entienden navegadores viejos. */
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    /* El sitio no usa ninguna de estas APIs: se apagan explícitamente. */
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    /*
      Sin `includeSubDomains` a propósito: forzaría HTTPS en cualquier
      subdominio futuro, y uno mal configurado quedaría inaccesible sin forma
      rápida de revertirlo — los navegadores cachean esta directiva.
    */
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
];

const nextConfig: NextConfig = {
  /* No anunciar el framework ni su versión en cada respuesta. */
  poweredByHeader: false,

  images: {
    /*
      Next 16 solo sirve las calidades declaradas acá (por defecto, solo 75) y
      cae silenciosamente a 75 para cualquier otra: sin esto, el `quality={90}`
      de la foto de Sobre Mí se ignora sin ningún error visible. 90 es para esa
      foto, que es el único JPEG grande del sitio; 75 se mantiene para el resto.
    */
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
