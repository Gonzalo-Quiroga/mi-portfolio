import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/social";

const githubHref = socialLinks.find((s) => s.label === "GitHub")?.href ?? "#";

export function Projects() {
  return (
    <section
      id="proyectos"
      className="hairline-top relative bg-background"
    >
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-14">
          <div className="flex flex-col gap-5">
            <SectionEyebrow index="03" title="Proyectos" />
            <p className="max-w-155 text-xl leading-snug tracking-[-0.02em] text-balance sm:text-2xl">
              Trabajos seleccionados, del problema al deploy.
            </p>
          </div>
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Ver todo en GitHub <span className="text-accent">↗</span>
          </a>
        </Reveal>

        {/*
          Índice tabular en vez de grilla de cards (design-referencia-estilo.md
          §6.1): filas full-width con divisor de 1px, metadata en registro micro
          y el año a la derecha. Lee como créditos editoriales y sostiene mejor
          una lista que crece que tres cards sueltas.

          La miniatura se conserva porque el formato de contenido decidido es
          "imagen, link y descripción corta" (portfolio-rebuild-plan.md); con
          `image: null` cae al placeholder rayado, que es el estado esperado
          hasta que estén las capturas definitivas.
        */}
        <div className="border-t border-border">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 4) * 0.055}>
              <a
                href={project.href}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-5 gap-y-4 border-b border-border px-2 py-5 transition-colors hover:bg-foreground/2 lg:grid-cols-[9rem_minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:gap-x-8 lg:py-6"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-[3px] border border-border bg-background-2 transition-colors group-hover:border-a1-line">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 9rem, 7rem"
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
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] transition-colors group-hover:text-accent lg:text-[19px]">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-[1.6] font-light text-muted-foreground text-pretty">
                    {project.description}
                  </p>
                </div>

                {project.tech.length > 0 && (
                  <p className="col-span-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase lg:col-span-1">
                    {project.tech.join(" · ")}
                  </p>
                )}

                <div className="col-span-2 flex items-center justify-between gap-4 lg:col-span-1 lg:justify-end lg:gap-5">
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground">
                    {project.year}
                  </span>
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
