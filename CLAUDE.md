# Portfolio de Gonzalo Quiroga — instrucciones del proyecto

## Contexto obligatorio
Antes de cualquier tarea, si todavía no los leíste en esta sesión, leé:
- `portfolio-rebuild-plan.md` — stack, orden de desarrollo y decisiones ya tomadas.
- `portfolio-content-brief.md` — contenido real de texto para Hero, Sobre Mí, Habilidades y Contacto.
- `design-referencia-estilo.md` — **sistema visual vigente**: paleta, escala tipográfica, ornamento y reglas del acento. Manda sobre `design-handoff/` donde haya conflicto. No está versionado (está en `.gitignore`): si no existe en el working tree, regirse por las reglas de abajo, que son autosuficientes.
- `design-handoff/` — export original de Claude Design. Sigue valiendo para tokens de base, pero varias decisiones (dos acentos alternando, cards de proyecto, chips de habilidades) fueron reemplazadas.

## Reglas de diseño no negociables
- **Un solo acento, el cian.** No reintroducir el lima `#d1ff6f` ni la alternancia por sección.
- **El acento emite, no pinta.** Nunca `background` de acento sobre un área: solo hover, foco y el centro de las hairlines. Si un elemento estático necesita destacarse, se resuelve con tamaño, peso o gris — no con color.
- **Sin cards nuevas.** La información se ordena con reglas de 1px y espacio, no con recuadros con fondo.
- Antes de agregar un elemento decorativo, revisar si ya existe en el vocabulario: marcador `▪ ▪`, corchetes `[ ]`, hairline, marcas de esquina.

## Regla de Git — obligatoria, sin excepciones
- Está bien, y se espera, que avises cuándo conviene hacer un commit y que sugieras el mensaje.
- Nunca ejecutes `git push`, ni crees o gestiones remotos, ni ninguna acción que suba cambios a GitHub. Todo lo que sea subir a GitHub lo hace el usuario manualmente.
- `git init`, `git add` y `git commit` locales están bien si el usuario los pide, pero nada que toque el remoto.

## Stack del proyecto
Next.js + TypeScript + Tailwind CSS + shadcn/ui + Radix. Deploy en Vercel. Formulario de contacto con Resend vía API route de Next.js. Sin backend/CMS para el contenido de proyectos — array tipado en TypeScript.

## Otras decisiones a respetar
- Landing de una sola página (home/about/skills/proyectos/contacto por ancla), sin páginas de "caso de estudio" separadas.
- Sección de Proyectos: contenido definitivo queda para el final, con placeholder explícito mientras tanto (no vacío ni oculto).
- Foto personal: todavía no hay una definida, diseñar "Sobre Mí" para funcionar con o sin foto, sin inventar una de relleno.
