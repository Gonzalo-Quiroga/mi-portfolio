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
        `mockup-field` es un degradado gris neutro, sin acento (ver globals.css).
      */}
      {/*
        En teléfono la imagen va a ancho completo, arriba del texto.

        Pasó por dos versiones peores. Primero fue una miniatura de 80px al
        costado: a ese tamaño una captura de sitio no muestra nada y encima
        dejaba ~195px para título y descripción, que se partían en escalera.
        Después se ocultó del todo, que era peor por una razón que no se estaba
        pesando: cinco de los once proyectos no tienen link público, así que la
        imagen es la única evidencia de que ese producto existe. Sin ella esas
        cinco filas son texto afirmando cosas, y en un portfolio de frontend
        —abierto casi siempre desde el teléfono cuando el link llega por
        LinkedIn— la prueba visual es el producto.

        La conclusión fue que el problema nunca fue mostrarla, sino el tamaño:
        el arreglo es agrandarla, no sacarla. A ancho completo se lee, y el
        texto recupera la fila entera. El costo es una sección larga, que para
        once proyectos con imagen es simplemente lo que ese contenido mide.
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
            /*
              En teléfono la imagen ocupa el ancho de la fila: el viewport menos
              los 48px de padding de la sección (`px-6`) y los 8px de la fila
              (`px-1`), o sea 3.5rem en total. Declararlo exacto importa — con
              el `7rem` de antes el navegador bajaba una variante de 112px y la
              estiraba a 343, que es la receta de la imagen borrosa.

              Los originales son de 1280x800, así que hay margen de sobra para
              servir 640w o 750w en pantallas de densidad doble.
            */
            sizes="(min-width: 1024px) 9rem, (min-width: 640px) 7rem, calc(100vw - 3.5rem)"
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
        {/*
          Peso normal y `foreground/70`: la descripción es lo único de la fila
          que se lee como texto y no como etiqueta, así que necesita separarse
          del `client` y del stack, que sí quedan en `muted-foreground`.
        */}
        <p className="text-sm leading-[1.6] text-foreground/70 text-pretty">
          {project.description}
        </p>
      </div>

      {/*
        En pantallas chicas el stack y el estado comparten un renglón al pie de
        la fila; antes ocupaban uno cada uno y la fila crecía a cuatro. En `lg`
        el wrapper pasa a `display: contents` y sus dos hijos vuelven a ser
        celdas de la grilla, como si este div no existiera.
      */}
      {/*
        `col-span-full` y no `col-span-2`: en teléfono la grilla es de una sola
        columna y un span fijo de 2 la forzaría a inventar una segunda.
      */}
      <div className="col-span-full flex items-center justify-between gap-4 lg:contents">
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
                  Selección de trece entre más de veinte proyectos entregados:
                  sistemas de gestión, sitios corporativos, productos propios y
                  un sistema con IA, en industria, agro, logística y turismo.
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
            /*
              En teléfono la fila se apila: una sola columna, con la imagen a
              ancho completo arriba y el texto abajo. Desde `sm` la imagen
              vuelve al costado y la fila recupera el formato de índice.

              El aire crece con la imagen (`gap-y-4 py-6` contra los `gap-y-3
              py-4` de antes): con una miniatura al costado la fila era una
              línea de una lista, con la imagen a ancho completo pasa a ser un
              bloque, y un bloque necesita separarse del de al lado o la lista
              se lee como una tira continua de capturas.
            */
            const rowClass =
              "group grid grid-cols-1 items-center gap-x-4 gap-y-4 border-b border-border px-1 py-6 transition-[background-color,box-shadow] hover:glow-a1 hover:bg-foreground/2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-5 sm:gap-y-3 sm:px-2 sm:py-5 lg:grid-cols-[9rem_minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:gap-x-8 lg:py-6";

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
              El código de los proyectos de clientes es propiedad de cada uno y
              sus repositorios son privados. Los links llevan al producto en
              producción.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
