# Portfolio nuevo — plan y decisiones (guardado 2026-07-29, actualizado 2026-07-29)

Contexto: sesión de Cowork donde se analizó el portfolio actual (`https://gonzalo-quiroga.github.io/Portfolio/`) y se decidió reconstruirlo, no solo parchearlo. Este documento consolida las decisiones tomadas antes de pasar el trabajo a Claude Code.

## Diagnóstico del sitio actual (análisis técnico hecho clonando el repo público `gonzalo-quiroga/Portfolio`)

- Vanilla HTML/CSS/JS puro, sin framework, sin build tool, todo en un único `index.html`. No refleja el stack real actual (React/TS/Next.js/Supabase documentado en `cv-stack-tecnologico-real.md`).
- Contenido desactualizado.
- Deuda técnica encontrada: imágenes sin optimizar, sin `width`/`height`, sin `loading="lazy"`, sin `srcset`; solo 1 de todas las imágenes tiene atributo `alt`; formulario de contacto con `<label>` vacíos e `input type="text"` para email; EmailJS con service key pública embebida directo en el HTML; sin `robots.txt`, `sitemap.xml` ni datos estructurados; imágenes huérfanas de proyectos removidos; dos proyectos sin link activo; errores de tipeo en el texto.

## Decisión: reconstruir con el stack real actual, no iterar sobre el vanilla existente

### Stack elegido

- **Next.js + TypeScript + Tailwind + shadcn/ui + Radix**, deploy en **Vercel**.
- Formulario de contacto: reemplazar EmailJS por **Resend** vía API route de Next.js.
- Contenido de proyectos: array tipado en TypeScript, sin backend/CMS.
- `next/image` para imágenes optimizadas/lazy/con dimensiones.
- Animaciones con Framer Motion; testing con Vitest + Testing Library (un par de tests, no cobertura completa).
- Infraestructura: proyecto nuevo en Vercel, no GitHub Pages. El repo viejo queda de archivo histórico.

## Decisión: sin casos de estudio en profundidad — landing de una sola página

La sección de proyectos se mantiene simple: imagen, link y descripción corta por proyecto, en el mismo formato para todos (sin páginas separadas de "caso de estudio"). Todo el sitio es una landing de una sola página (scroll con anclas: home/about/skills/proyectos/contacto).

## Decisión: orden de desarrollo

1. Contenido decidido primero (copy de cada sección, ver `portfolio-content-brief.md`).
2. Prototipo de diseño acotado con Claude Design — ya completado: tokens visuales (paleta, tipografía), layout de Home/hero y card de Proyecto, con dos colores de acento (#06fcee y #d1ff6f) alternando por sección sobre tema oscuro.
3. Scaffolding del proyecto Next.js y deploy a Vercel desde el primer día.
4. Orden de construcción: layout/navegación → hero/about/skills (copy real) → formulario de contacto con Resend → sección de proyectos (imagen+link+descripción, contenido definitivo al final con placeholder explícito mientras tanto).
5. Pulido opcional al final, recortable si el tiempo aprieta: animaciones, tests, PWA, accesibilidad/SEO.

## Decisión: foto personal

Sin foto todavía (el diseño de "Sobre Mí" contempla el placeholder). Cuando el usuario se saque una foto nueva: luz pareja/natural (no dramática), pose profesional-casual (ni carnet rígido ni casual/selfie), fondo simple, conversión a blanco y negro para integrar con la paleta del sitio. Va únicamente en la sección Sobre Mí, no en el Hero (para no duplicar), aunque el pequeño rol/foto podría reconsiderarse en Claude Code si el diseño final lo amerita.

## Decisión: flujo de trabajo con Claude Code y Git

Claude Code debe avisar cuándo conviene hacer un commit y sugerir el mensaje, pero **nunca debe ejecutar `git push` ni ninguna acción hacia GitHub** — eso lo hace el usuario manualmente. Dejar esta regla en un `CLAUDE.md` del repo nuevo para que se sostenga durante todo el proyecto.

## Decisión: documentar el proceso de construcción (bitácora privada)

Bitácora privada (no pública en el sitio) del proceso de reconstrucción, como material de respaldo para entrevistas de trabajo — evidencia concreta del eje "IA como multiplicador de calidad, no reemplazo de criterio propio". Entradas cortas al cierre de cada etapa: qué se construyó, qué alternativa se descartó y por qué, y problemas reales resueltos. Pendiente definir dónde vive (fuera del control de versiones si el repo es público, o en este proyecto de Claude).

## Pendiente / próximos pasos

- Definir dónde vive la bitácora privada de proceso.
- ~~Decidir dominio propio vs subdominio de Vercel.~~ Resuelto: `gonzaloquiroga.dev`, deployado en Vercel con `RESEND_API_KEY` y `NEXT_PUBLIC_SITE_URL` configuradas.
- Confirmar que el handoff final de Claude Design alterna correctamente los dos colores de acento por sección.
- Elegir contenido definitivo de la sección de Proyectos (queda para el final).
