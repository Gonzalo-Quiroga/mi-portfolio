import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Marker, SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

/**
 * Contenido de una fila del índice. Se extrae del wrapper porque el wrapper
 * cambia de elemento según haya o no producto público que visitar: `<a>` si
 * hay `href`, `<div>` si no. Una fila que parece link y no lleva a ningún lado
 * es peor que una fila que no lo parece.
 */
function ProjectRow({ project }: { project: Project }) {
  const isLink = project.href !== null;

  return (
    <>
      {/*
        Los mockups vienen con fondo transparente, así que necesitan un campo
        propio por detrás: sin él el dispositivo flota sobre el gris plano del
        contenedor mientras las capturas de navegador llenan el suyo a sangre.
        `mockup-field` es negro con una inclinación mínima hacia el hue del
        acento y un bloom de --a1-ambient desde abajo (ver globals.css).
      */}
      <div
        className={`relative aspect-16/10 overflow-hidden rounded-[3px] border border-border transition-colors group-hover:border-a1-line ${
          project.imageKind === "mockup" ? "mockup-field" : "bg-background-2"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 9rem, (min-width: 640px) 7rem, 5rem"
            className="object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.03) 0 10px, transparent 10px 20px)",
            }}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        {/*
          El "Asociado con" de LinkedIn, en registro micro sobre el título:
          separa el trabajo de agencia del freelance sin gastar una columna.
        */}
        <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground/80 uppercase">
          {project.client}
        </span>
        <h3
          className={`text-[17px] font-medium tracking-[-0.01em] lg:text-[19px] ${
            isLink ? "transition-colors group-hover:text-accent" : ""
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-[1.6] font-light text-muted-foreground text-pretty">
          {project.description}
        </p>
      </div>

      {/*
        En pantallas chicas el stack y el estado comparten un renglón al pie de
        la fila; antes ocupaban uno cada uno y la fila crecía a cuatro. En `lg`
        el wrapper pasa a `display: contents` y sus dos hijos vuelven a ser
        celdas de la grilla, como si este div no existiera.
      */}
      <div className="col-span-2 flex items-center justify-between gap-4 lg:contents">
        {project.tech.length > 0 && (
          <p className="min-w-0 font-mono text-[10.5px] leading-[1.6] tracking-[0.14em] text-muted-foreground uppercase">
            {project.tech.join(" · ")}
          </p>
        )}

        <div className="ml-auto flex shrink-0 items-center justify-end gap-4 lg:gap-5">
          {isLink ? (
            <span
              aria-hidden
              className="text-sm text-muted-foreground transition-colors group-hover:text-accent"
            >
              ↗
            </span>
          ) : (
            /*
              Sin link no queda un hueco: se dice por qué. La mayoría de estos
              son sistemas de gestión detrás de login, no proyectos abandonados.
            */
            <span className="font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-muted-foreground/80 uppercase">
              Acceso privado
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="hairline-top relative bg-background">
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-14 lg:mb-20">
          <SectionHeader
            index="03"
            title="Proyectos"
            statement={
              <p className="text-[26px] leading-tight font-normal tracking-[-0.02em] text-balance sm:text-[32px]">
                Trabajos seleccionados,{" "}
                <span className="text-muted-foreground">
                  del problema al deploy.
                </span>
              </p>
            }
            aside={
              /*
                La escala va antes de la lista y no después: sin este dato, once
                filas se leen como "todo lo que hizo", y el visitante ya se formó
                esa idea para cuando llega al pie. Puesto acá, convierte la lista
                en una decisión editorial desde la primera fila.

                Los dos tipos de producto y los cuatro rubros no son adorno: son
                lo que un cliente usa para saber si su caso se parece a alguno, y
                cada uno se verifica en las filas de abajo — gestión inmobiliaria,
                logística, agro, fábrica, pesquera y reservas por un lado; sitios
                corporativos y de marca por el otro.

                No se dice "e-commerce": ninguna de las once descripciones declara
                tienda ni pagos. Mercado Pago está en el stack, pero no en estos
                proyectos.
              */
              <p className="flex items-start gap-3 font-mono text-[10.5px] leading-[1.7] tracking-[0.14em] text-muted-foreground/80 uppercase">
                <Marker className="mt-[0.42em] bg-muted-foreground/50" />
                <span>
                  Selección de once entre más de veinte proyectos entregados:
                  sistemas de gestión y sitios corporativos, en industria, agro,
                  logística y turismo.
                </span>
              </p>
            }
          />
        </Reveal>

        {/*
          Índice tabular en vez de grilla de cards (design-referencia-estilo.md
          §6.1): filas full-width con divisor de 1px, metadata en registro micro
          y la afordancia de link a la derecha. Lee como créditos editoriales y
          sostiene mejor una lista de once que tres cards sueltas.

          Sin columna de año, por decisión del usuario: ver la nota en
          `types/project.ts`.

          Con `image: null` la miniatura cae al placeholder rayado, que es el
          estado esperado hasta que estén las capturas definitivas.
        */}
        <div className="border-t border-border">
          {projects.map((project, i) => {
            /*
              La miniatura arranca en 5rem y no en 7rem: en un teléfono de
              375px, con el padding de la sección, 7rem dejaba ~195px para
              título y descripción y el texto se partía en escalera.
            */
            /*
              El hover vive acá y no en el `<a>`: las filas sin producto
              público lo comparten, porque una lista donde solo la mitad de las
              filas reacciona al mouse se lee como un error de estilo, no como
              una distinción. Lo que no se comparte es el cursor — el `<div>` no
              lo cambia — ni el acento sobre el título, que sí es señal de link.
            */
            const rowClass =
              "group grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-border px-1 py-4 transition-[background-color,box-shadow] hover:glow-a1 hover:bg-foreground/2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-5 sm:px-2 sm:py-5 lg:grid-cols-[9rem_minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:gap-x-8 lg:py-6";

            return (
              <Reveal key={project.id} delay={(i % 4) * 0.055}>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} — abrir en una pestaña nueva`}
                    className={rowClass}
                  >
                    <ProjectRow project={project} />
                  </a>
                ) : (
                  <div className={rowClass}>
                    <ProjectRow project={project} />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        {/*
          Cierre de sección, y reemplazo del link "[ Ver todo en GitHub ]" que
          había acá: ese link mandaba a un perfil casi vacío, porque el código
          de estos proyectos es del cliente o de Cloudnet y sus repos son
          privados. Va al pie y no en la cabecera porque responde una pregunta
          que recién aparece después de recorrer la lista y ver que varias filas
          no llevan a ningún lado. Declararlo una vez acá es más honesto que un
          link que no cumple lo que promete, y más limpio que repetir "privado"
          en once filas.
        */}
        <Reveal delay={0.06}>
          <p className="mt-8 flex items-start gap-3 font-mono text-[10.5px] leading-[1.7] tracking-[0.14em] text-muted-foreground/80 uppercase lg:mt-10">
            <Marker className="mt-[0.42em] bg-muted-foreground/40" />
            <span>
              El código es propiedad de cada cliente y sus repositorios son
              privados. Los links llevan al producto en producción.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
