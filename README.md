# Portfolio — Gonzalo Quiroga

Sitio personal de [gonzaloquiroga.dev](https://gonzaloquiroga.dev). Landing de una sola página con secciones ancladas: presentación, perfil, stack, proyectos y contacto.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion · Resend · Vitest · Deploy en Vercel.

## Decisiones que vale la pena mirar

**Sistema visual con un solo acento.** El cian nunca se usa como relleno: se deriva en capas (`--a1-ambient`, `--a1-glow`, `--a1-line`) para que funcione como luz y no como pintura. La jerarquía la carga el gris. Los tokens están en [`globals.css`](src/app/globals.css).

**Fondo del hero sin dependencias.** Grilla, líneas que se dibujan, partículas y halo que sigue al cursor, todo en SVG y CSS ([`hero-backdrop.tsx`](src/components/sections/hero-backdrop.tsx)). El halo se mueve escribiendo custom properties vía `requestAnimationFrame` en vez de estado de React, para no re-renderizar el árbol en cada evento de puntero.

**Endpoint de contacto endurecido.** [`api/contact`](src/app/api/contact/route.ts) es el único punto de escritura del sitio: lleva rate limit por IP, honeypot, topes de longitud y aplanado de saltos de línea en los campos que van al asunto del mail. Cubierto por tests.

**Imagen Open Graph generada, no estática.** [`opengraph-image.tsx`](src/app/opengraph-image.tsx) la arma en build con `next/og` y las fuentes del sitio, así no hay un PNG que mantener sincronizado a mano.

**Accesibilidad verificada, no asumida.** Contraste medido contra WCAG AA sobre las combinaciones reales, `prefers-reduced-motion` respetado en todas las animaciones (fijando además el estado final, para que el decorado no desaparezca), landmarks, skip link y labels asociadas.

**Cabeceras de seguridad.** CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y HSTS, configuradas en [`next.config.ts`](next.config.ts) con el razonamiento de cada concesión.

## Correr el proyecto

Requiere Node 20 o superior.

```bash
npm install
cp .env.example .env.local   # completar las variables
npm run dev
```

| Script | |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build de producción |
| `npm test` | tests con Vitest |
| `npm run lint` | ESLint |

Las variables de entorno están documentadas en [`.env.example`](.env.example). Sin `RESEND_API_KEY` el sitio funciona completo salvo el envío del formulario.

## Estructura

```
src/
  app/            rutas, metadata, imagen OG y la API de contacto
  components/
    sections/     una por sección de la landing
    ui/           primitivas compartidas
    motion/       wrapper de animación de entrada
  data/           contenido tipado: proyectos, habilidades, redes, nav
  types/          tipos del contenido
  lib/            configuración del sitio
```

El contenido vive en `src/data` como arrays tipados, sin CMS: es un sitio de una persona y la simplicidad rinde más que la infraestructura.
