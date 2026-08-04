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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 4) * 0.055} className="h-full">
            <a
              href={project.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,transform] hover:-translate-y-0.75 hover:border-muted-foreground/40"
            >
              <div className="relative aspect-[16/10] border-b border-border bg-background-2">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full items-end p-3.5"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.03) 0 10px, transparent 10px 20px)",
                    }}
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                      Captura del proyecto — 16:10
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5.5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[16.5px] font-medium tracking-[-0.01em]">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">↗</span>
                </div>
                <p className="flex-1 text-sm leading-[1.62] font-light text-muted-foreground text-pretty">
                  {project.description}
                </p>
                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[4px] bg-foreground/5 px-1.75 py-0.75 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
