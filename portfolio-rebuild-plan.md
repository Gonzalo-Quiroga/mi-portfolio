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
2. Prototipo de diseño acotado con Claude Design — ya completado: tokens visuales (paleta, tipografía), layout de Home/hero y card de Proyecto, con dos colores de acento (#06fcee y #d1ff6f) alternando por sección sobre tema oscuro. **Superado en 2026-08-04 por la pasada de rediseño, ver más abajo: queda un solo acento y varias decisiones de layout cambiaron.**
3. Scaffolding del proyecto Next.js y deploy a Vercel desde el primer día.
4. Orden de construcción: layout/navegación → hero/about/skills (copy real) → formulario de contacto con Resend → sección de proyectos (imagen+link+descripción, contenido definitivo al final con placeholder explícito mientras tanto).
5. Pulido opcional al final, recortable si el tiempo aprieta: animaciones, tests, PWA, accesibilidad/SEO.

## Decisión: foto personal

Sin foto todavía (el diseño de "Sobre Mí" contempla el placeholder). Cuando el usuario se saque una foto nueva: luz pareja/natural (no dramática), pose profesional-casual (ni carnet rígido ni casual/selfie), fondo simple, conversión a blanco y negro para integrar con la paleta del sitio.

**Actualizado 2026-08-04:** la reserva de "solo en Sobre Mí, no en el Hero" quedó sin efecto — el rediseño lo ameritó, que es la reconsideración que este mismo punto dejaba abierta. Ahora hay dos usos distintos:

- **Hero:** PNG recortado (sujeto sin fondo), alineado a la derecha y sangrado hasta el borde inferior. El degradé de la sección concentra el gris justo ahí para que el sujeto emerja de la oscuridad. Va en `z-0` contra el `z-10` del contenido, de modo que el titular le pase por delante (profundidad por oclusión). Sin placeholder visible: por pedido del usuario se quitó, el degradé ya reserva la zona.
- **Sobre Mí:** foto 4:5 convencional, con marcas de esquina. Placeholder explícito activo.

## Decisión: flujo de trabajo con Claude Code y Git

Claude Code debe avisar cuándo conviene hacer un commit y sugerir el mensaje, pero **nunca debe ejecutar `git push` ni ninguna acción hacia GitHub** — eso lo hace el usuario manualmente. Dejar esta regla en un `CLAUDE.md` del repo nuevo para que se sostenga durante todo el proyecto.

## Decisión: documentar el proceso de construcción (bitácora privada)

Bitácora privada (no pública en el sitio) del proceso de reconstrucción, como material de respaldo para entrevistas de trabajo — evidencia concreta del eje "IA como multiplicador de calidad, no reemplazo de criterio propio". Entradas cortas al cierre de cada etapa: qué se construyó, qué alternativa se descartó y por qué, y problemas reales resueltos. Pendiente definir dónde vive (fuera del control de versiones si el repo es público, o en este proyecto de Claude).

## Decisión: pasada de rediseño sobre referencia externa (2026-08-04)

El sitio construido funcionaba pero se leía "correcto" antes que "diseñado". A partir de dos capturas de un portfolio de dirección creativa que el usuario marcó como referencia, se extrajo un sistema visual y se aplicó en siete pasos. El análisis completo, con qué se adoptó, qué se adaptó y qué se descartó a propósito, está en **`design-referencia-estilo.md`** — es el documento de diseño vigente y manda sobre el handoff original de Claude Design donde haya conflicto.

Decisiones que reemplazan a las anteriores:

- **Un solo acento.** Se elimina el lima `#d1ff6f` y la alternancia por sección. Queda el cian `#06fcee`, y deja de aplicarse como relleno: se derivan capas (`--a1-ambient`, `--a1-glow`, `--a1-line`, `--a1-text`) para que el acento se comporte como luz. Por pedido del usuario terminó aún más acotado que lo que planteaba el análisis: **el cian solo aparece en hover, foco y el centro de las hairlines**, en ningún elemento estático. El gris carga la jerarquía.
- **Proyectos deja de ser grilla de cards** y pasa a índice tabular (miniatura, título, descripción, stack, año). Esto agrega el campo obligatorio `year` al tipo `Project`.
- **Habilidades deja de usar cards.** Cuatro columnas separadas por línea, con las tecnologías apiladas como lista; sin chips ni recuadros con fondo.
- **Cabeceras de sección asimétricas:** etiqueta y título grande en las columnas 1-4, statement en las 6-12, columna 5 vacía a propósito.
- **Links secundarios en corchetes** (`[ VER PROYECTOS ]`). El único botón sólido que queda es "Descargar CV".
- **Bloque de declaración** a ancho completo entre Sobre Mí y Habilidades, y **banda de stack en loop** entre Habilidades y Proyectos.
- **Wordmark tipográfico gigante** sangrado en el footer, más columnas de links.
- **Hero a viewport completo** con margen exterior más ancho que el resto de las secciones (1760px contra 1360px). Sin badge de estado: era un pill con punto que se leía como plantilla generada, ahora es una línea de metadata en registro micro.

## Decisión: el portfolio tiene dos públicos, no uno (2026-08-07)

El sitio se venía escribiendo para un reclutador técnico (stack, producción, deploy). El usuario aclaró que también es su perfil público de cara a **clientes** que entran a ver qué hace. Se evaluó agregar una sección de servicios / "cómo trabajo" y **se descartó**: en vez de sumar estructura, se afinó el copy existente (Hero, Sobre Mí, Contacto, formulario y metadata) para que cada pieza le hable a los dos. El detalle está en `portfolio-content-brief.md`, sección "Pasada de consistencia".

En la misma pasada se corrigió el desfasaje entre el sitio y `linkedin-notes.md` — el perfil real había pasado por cuatro rondas de ajuste que el portfolio nunca absorbió. La más importante: **el sitio era el último lugar donde sobrevivía "líder técnico"** después de haberse sacado del CV, del Acerca de, de la Experiencia y del banner.

**`linkedin-notes.md` pasa a ser contexto obligatorio** junto con este documento: es la fuente de verdad de qué se afirma sobre el perfil profesional, y el criterio que la rige (preferir lo verificable y defendible en entrevista por sobre maximizar keywords) aplica igual al sitio.

## Pendiente / próximos pasos

- Definir dónde vive la bitácora privada de proceso.
- ~~Decidir dominio propio vs subdominio de Vercel.~~ Resuelto: `gonzaloquiroga.dev`, deployado en Vercel con `RESEND_API_KEY` y `NEXT_PUBLIC_SITE_URL` configuradas.
- ~~Confirmar que el handoff final de Claude Design alterna correctamente los dos colores de acento por sección.~~ Sin efecto: ya no hay dos acentos ni alternancia.
- Sacar la foto personal y cargar los dos usos (PNG recortado en el Hero, 4:5 en Sobre Mí). Es lo único que falta para cerrar el rediseño.
- ~~Elegir contenido definitivo de la sección de Proyectos.~~ **Resuelto el 2026-08-07:** cargados los 11 proyectos reales. Queda solo completar datos (años, capturas, 3 links, tecnologías colapsadas) — ver `portfolio-content-brief.md`.
- ~~Cargar capturas de proyectos.~~ Hechas el 2026-08-09: once WebP de 1280×800, normalizadas desde dos familias de origen distintas. Ver `portfolio-content-brief.md`.
- Completar las tecnologías de Cerco Digital, el único proyecto sin verificar contra su repo.
- Evaluar recapturar los cinco sistemas privados como capturas planas, para que las once compartan estilo y no solo marco (hoy cinco son mockups de dispositivo). No es bloqueante.
- Activar en GitHub *Settings → Profile → Include private contributions on my profile*: muestra la actividad del trabajo privado sin exponer código. Hoy el perfil se ve vacío teniendo años de trabajo diario.
- Terminar `gq-balu`, `gq-gastos` y `gq-labs` y sumarlos como los proyectos **con repo público** (el campo `repo` del tipo `Project` ya lo contempla). Son los que cargan la señal "sabe codear" que el trabajo de cliente no puede dar. Este mismo repo de portfolio ya cumple parte de ese rol.
- Decidir si el sitio refleja los títulos intermedios de ISPC ("Programador" may-2026, "Desarrollador Full Stack Junior" jun-2026). El CV ya los incorporó; la ficha de Formación del sitio sigue diciendo solo "en curso".
