# Portfolio nuevo — brief de contenido real para Claude Design (2026-07-29)

Objetivo: este es el contenido real (no ficticio) para pasarle a Claude Design junto con la captura del portfolio actual, evitando armar el mockup con texto de relleno que después haya que reajustar en Claude Code. Ver `portfolio-rebuild-plan.md` para el resto de las decisiones (stack, orden de desarrollo, etc.).

> **Aviso de vigencia (2026-08-07).** El copy de este documento quedó desactualizado respecto del perfil real. Ver **"Pasada de consistencia contra `linkedin-notes.md`"** al final: ahí está el texto vigente de Hero, Sobre Mí y Statement. Lo de abajo se conserva como registro histórico.

## Hero

- Nombre: **Gonzalo Quiroga**
- Rol: **Desarrollador Full Stack**
- Tagline (primer borrador, ajustable): *"Lidero técnicamente el frontend en Cloudnet Solutions y desarrollo proyectos freelance de punta a punta, con React, Node.js y TypeScript en producción."* — **reemplazado, ver la pasada del 2026-08-07.**
- CTAs existentes a mantener: descargar CV (pdf), ir a la sección de proyectos.

## Sobre mí

Adaptado del "Acerca de" ya validado para LinkedIn (`linkedin-notas.md`), consistente con el CV:

> Soy Desarrollador Full Stack con foco en React, Node.js y TypeScript. Lidero técnicamente al equipo frontend en Cloudnet Solutions, donde desarrollo y mantengo aplicaciones para múltiples clientes: APIs REST con Express y Sequelize sobre PostgreSQL y SQL Server, autenticación con JWT y Auth0, testing con Jest y despliegue continuo en Microsoft Azure con GitHub Actions.
>
> También desarrollo proyectos freelance de punta a punta para emprendedores y pequeñas empresas, y complemento mi perfil técnico con diseño de interfaces (Claude Design), lo que me da una mirada integral: funcionalidad, experiencia de usuario y resolución práctica de problemas.
>
> Incorporo asistentes de IA como Claude Code en mi flujo de trabajo para acelerar el desarrollo sin resignar calidad, y sigo formándome en la Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales del ISPC.
>
> Si tenés un proyecto en mente o necesitás de mis servicios, no dudes en contactarme.

Nota: la anécdota original del sitio actual ("estudié Ing. Electrónica, en 2020 di el salto a programación") se puede mantener como frase de apertura si se quiere conservar el origen personal, antes del párrafo profesional de arriba.

### Ajuste de reparto del copy (2026-08-04)

El texto de arriba sigue siendo el aprobado, pero en el sitio dejó de estar todo dentro de "Sobre Mí". No se agregó ni se reescribió contenido; se repartió:

- **La anécdota de apertura** es ahora el statement de la cabecera de sección, a dos tonos: el origen ("Empecé estudiando Ing. Electrónica y en 2020 di el salto a la programación") en gris, y el presente ("Hoy soy Desarrollador Full Stack con foco en React, Node.js y TypeScript") en blanco.
- **La frase sobre diseño de interfaces** salió del segundo párrafo, donde estaba como cláusula subordinada, y pasó a ser el bloque de declaración a ancho completo entre Sobre Mí y Habilidades: *"Complemento mi perfil técnico con diseño de interfaces. Eso me da una mirada integral: funcionalidad, experiencia de usuario y resolución práctica de problemas."* Era la frase más fuerte del brief y estaba enterrada.
- Ese segundo párrafo queda entonces reducido a la parte de freelance.

Si se quiere volver atrás, el texto original completo está arriba sin tocar.

## Habilidades (reemplaza las 3 cajas genéricas actuales por 4 categorías reales)

- **Frontend:** React, TypeScript, Next.js, Astro, Vite, Redux Toolkit, TanStack Query, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, Sequelize, JWT, Passport, Auth0
- **Datos & Cloud:** PostgreSQL, SQL Server, Supabase, Azure, Vercel, GitHub Actions, Docker
- **Testing & Otros:** Jest, Supertest, Vitest, Socket.IO, Mercado Pago, Resend, Swagger, Jira, Claude Code, Claude Design

## Contacto

Sin cambios respecto al sitio actual, ya coincide con lo confirmado en `cv-notas.md`:
- WhatsApp: +54 3576 476025
- Email: gonzaloquiroga488@gmail.com
- CV descargable
- Redes: Facebook, LinkedIn, Instagram, GitHub

## Proyectos

**No usar contenido real todavía.** Por decisión ya tomada (ver `portfolio-rebuild-plan.md`), el contenido definitivo de esta sección se resuelve al final. Para el mockup de Claude Design alcanza con 2-3 cards placeholder genéricas (imagen + título + descripción corta ficticia tipo "Proyecto de ejemplo"), sin comprometer el diseño real de la sección todavía.

**Resuelto el 2026-08-07.** Los 11 proyectos reales están cargados en `data/projects.ts`, con las descripciones del usuario tal cual las escribió para LinkedIn. Ver abajo, "Cómo se muestran proyectos con el código privado".

---

# Pasada de consistencia contra `linkedin-notes.md` (2026-08-07)

Origen: el perfil de LinkedIn y el CV pasaron por cuatro rondas de ajuste (última el 2026-08-07) que el portfolio nunca absorbió. El sitio seguía afirmando cosas que el resto del perfil ya había corregido por no ser defendibles en una entrevista. Criterio aplicado, heredado de esas sesiones: **preferir siempre lo verificable por sobre lo que suena mejor.**

Segundo eje de esta pasada: el sitio hablaba casi solo en registro de reclutador técnico. Decisión del usuario — **no** agregar una sección de servicios, sino afinar el copy existente para que Hero, Sobre Mí, Contacto y metadata le hablen también al cliente que entra a ver qué hace.

## Correcciones de consistencia (el sitio decía algo que el resto del perfil ya había corregido)

| # | Dónde | Antes | Ahora | Por qué |
|---|---|---|---|---|
| 1 | Hero, Sobre Mí (párrafo) y ficha "Rol actual" | "Lidero técnicamente…" / "Tech Lead Frontend" | Actividades concretas: trato directo con clientes y stakeholders + revisión de código y acompañamiento a juniors del equipo frontend | El rol real fue informal y acotado, sin autoridad formal ni alcance de arquitectura. Ya se había sacado del CV, del Acerca de, del bullet de Experiencia y del banner. El sitio era el último lugar donde sobrevivía. |
| 2 | Sobre Mí, párrafo de Cloudnet | "donde **desarrollo y mantengo**" | "donde **desarrollamos y mantenemos**" | Plural deliberado: Sequelize, PostgreSQL/SQL Server, JWT/Auth0 y Azure son del equipo en conjunto. Está marcado explícitamente en `linkedin-notes.md` como detalle a no perder al reescribir. |
| 3 | Sobre Mí, statement a dos tonos | "en **2020** di el salto a la programación" | "en **2022**" | Contradecía toda la cronología verificada (Alura/ONE feb-2022, BA Multiplica may-2022, Argentina Programa oct-2022, freelance dic-2022). Confirmado por el usuario. |
| 4 | Habilidades (`data/skills.ts`) | Incluía **Docker** | Sacado | Sin respaldo en ninguno de los 24 repos de Cloudnet ni en los proyectos personales: la infra real es Azure Static Web Apps/App Service, Vercel y Supabase, todo PaaS y serverless. Ya se había sacado del titular y de las aptitudes de LinkedIn. |
| 5 | Bloque de declaración | "…con diseño de interfaces." | "…con diseño de interfaces **y reparación de equipos informáticos**." | La cláusula se perdió al mover la frase desde Sobre Mí. Es lo que sostiene "resolución práctica de problemas"; sin eso la segunda mitad de la oración no tiene de dónde agarrarse. |
| 6 | Sobre Mí, párrafo de IA | "asistentes de IA" | "asistentes de IA **como Claude Code**" | El Acerca de aprobado lo nombra. Es además el eje de la bitácora privada. |
| 7 | Hero (esquina) y ficha "Ubicación" | "Córdoba, Argentina" | "**Arroyito**, Córdoba, Argentina" | Coincide exacto con CV, LinkedIn y banner. |

## Mejoras de doble público (cliente + reclutador)

- **Hero, línea de estado:** "Disponible para proyectos freelance" → "…**y nuevas oportunidades**". El Acerca de de LinkedIn ya declara ambas cosas.
- **Hero, tagline:** ahora abre por la capacidad ("Construyo aplicaciones web de punta a punta") y cierra nombrando al cliente objetivo ("emprendedores y pequeñas empresas"). El énfasis en blanco pasó del nombre del empleador al stack — es lo que no caduca y lo que ambos públicos escanean.
- **Sobre Mí:** se suma el cierre del Acerca de ("Abierto a nuevas oportunidades como Full Stack, Frontend o Backend Developer") en registro micro con marcador, no como cuarto párrafo: es metadata de estado, no prosa. Le habla al reclutador; el link en corchetes de abajo le habla al cliente.
- **Fichas de Sobre Mí:** de 3 a 4, sumando "Freelance · Desde 2022 · Proyectos de punta a punta" — el único dato de la ficha que le sirve a un cliente.
- **Contacto:** el titular grande "¿Tenés un proyecto en mente?" (solo cliente) pasa a "**¿Trabajamos juntos?**", y el párrafo nombra los dos casos explícitamente. El asunto del formulario suma "propuesta laboral" a las opciones sugeridas.
- **Metadata y JSON-LD:** `siteDescription` reescrita para cubrir stack + freelance + ubicación en menos de 160 caracteres. Al schema de Persona se le sumaron `url`, `address`, `alumniOf` y `knowsAbout` (leído de `skillCategories`, así no puede desincronizarse de la sección de Habilidades).

## Cómo se muestran proyectos con el código privado (2026-08-07)

Diez de los once proyectos son de Cloudnet o de clientes. Sus repos son privados **porque el código no es del usuario** — no es una preferencia de seguridad que haya que justificar, y publicarlos sería incumplir contrato. Ningún reclutador técnico espera ver el repo de un proyecto de agencia; un candidato que sí los expone es una señal de alarma, no lo contrario.

Decisiones tomadas en consecuencia:

- **El deploy es la prueba, no el repo.** El link va al producto en producción.
- **La ausencia de código se declara una vez, en la cabecera de la sección**, no fila por fila: *"El código es propiedad de cada cliente y sus repositorios son privados. Los links llevan al producto en producción."* Etiquetar la razón convierte una ausencia en señal de que se trabaja bajo contrato.
- **Se eliminó el link "[ Ver todo en GitHub ]"** de la cabecera. Mandaba a un perfil casi vacío, porque el grueso del trabajo del usuario está en repos privados: era un link que no cumplía lo que prometía.
- **Una fila sin producto público no se renderiza como link.** `href: null` hace que la fila sea un `<div>` en vez de un `<a>`, sin hover ni flecha, y en su lugar muestra "Acceso privado" — la mayoría son sistemas de gestión detrás de login, no proyectos abandonados. No quedan links muertos.
- **Se agrega el "Asociado con" de LinkedIn** como etiqueta micro sobre el título. Distingue el trabajo de agencia del freelance, que es información útil para los dos públicos.
- **Las descripciones no se reescriben.** Mantienen la atribución honesta del original ("colaboré en", "junto al equipo", "uno de los principales desarrolladores"), mismo criterio que rige el resto del perfil.

Dos decisiones más del mismo día:

- **Sin columna de año.** La referencia fecha su índice (`NOMBRE | ROL | AÑO`), pero el usuario decidió no cargar años. Once guiones comunican menos que no tener la columna, así que el campo `year` se eliminó del tipo en vez de quedar vacío. El rol de columna de metadata lo cumple el "Asociado con", que además varía entre filas.
- **Nota de cierre al pie de la sección:** *"Selección de once entre más de veinte proyectos entregados."* Sin esto un visitante asume que once es todo lo que hizo. Una línea convierte una lista en una decisión editorial, y es un dato fuerte que el sitio no estaba usando.

**Orden: se mantiene el que eligió el usuario** (2026-08-07). Se evaluó reordenar para agrupar las filas con link arriba y se descartó: las cinco sin link son justamente los sistemas de gestión (Up Logix, DataCrops, Manisel, DaGuia, Cerco), que son el trabajo de ingeniería más fuerte — agruparlas al fondo dejaría arriba los sitios institucionales, que tienen las historias más finas. Además el orden original queda `L L L · — — — — — · L L L`: hay links al principio y al final, con el bloque sin link contenido en el medio, así que no se scrollea hacia una zona muerta sin final.

**Tecnologías (2026-08-07):** cargadas las once, provistas por el usuario. Listan solo aquello con lo que interactuó de primera mano, no el stack completo de cada proyecto. Dos criterios:

- **Se incluyen Vite y TanStack Query** aunque venían marcados como "no etiquetables". Esa era una restricción de LinkedIn, que solo deja etiquetar tecnologías presentes en tu lista de Aptitudes — en el sitio no existe, y además las dos ya están declaradas en `data/skills.ts`. Omitirlas subestimaba el trabajo.
- **Material UI, Syncfusion, Bootstrap y jQuery sí aparecen acá y no en Habilidades.** No es una contradicción: `tech` es registro histórico de lo que ese proyecto usó, `skills` es lo que se ofrece hoy. Está documentado en `types/project.ts`.

Resuelve de paso un pendiente de `linkedin-notes.md`: el uso de Supabase en la web de Cloudnet Solutions quedó confirmado por el usuario.

**Capturas (2026-08-09):** las once cargadas y normalizadas a 1280×800 WebP, el 16:10 del thumbnail. El material de origen venía en dos familias, con ratios (2.02 y 1.33) y formatos (PNG, AVIF) distintos, y se trató distinto cada una:

- **Los seis con link público son capturas de navegador a sangre.** Se recortan con `cover` anclado arriba, que conserva nav y hero y descarta el pie.
- **Los cinco sin link son mockups de dispositivo** (laptop, tablet, dos celulares) sobre fondo transparente. Se recortan sus márgenes vacíos y se conservan con canal alfa, para que el `bg-background-2` del contenedor se vea por detrás: el dispositivo flota sobre la superficie del sitio en vez de traer su propio rectángulo de fondo.

Peso total: 12 MB → 852 KB. Los originales sin procesar se movieron a `design-assets/proyectos-originales/` (gitignorado) para poder regenerarlos con otro encuadre si hace falta; estaban dentro de `public/`, donde se habrían deployado sin usarse.

**Campo de fondo para los mockups (2026-08-09).** A pedido del usuario, las cinco miniaturas de mockup llevan por detrás un gradiente de negro con cian muy oscuro (`mockup-field` en `globals.css`), en vez del gris plano del contenedor. El campo se aplica según un campo propio del tipo, `imageKind`, y no derivándolo de `href === null` aunque hoy coincidan: que un sistema privado se publique mañana no debería cambiar cómo se enmarca su imagen. Ver `design-referencia-estilo.md` §9.4 punto 5 para por qué esto no rompe la regla de "el acento emite, no pinta".

**Límite conocido:** esto empareja tamaño, ratio, formato y fondo, pero no el *estilo*. Un mockup de dispositivo y una captura a sangre se van a seguir leyendo distinto por más que compartan marco. La única forma de uniformarlos de verdad es recapturar: el usuario tiene acceso a los cinco sistemas privados y podría sacarles capturas planas como las de los otros seis (la de Up Logix ya usa datos demo, así que no habría exposición de datos de cliente).

Pendiente: completar `tech` de Cerco Digital, el único sin verificar contra el repo.

## Agregados menores al stack

`PWA` (Frontend) y `Git` (Datos & Cloud): ambos con respaldo directo en el análisis real de repos y ausentes por omisión. Se decidió **no** sumar Material-UI, Syncfusion, Bootstrap ni jQuery — son reales pero legacy, y diluirían una lista cuyo valor es estar curada.
