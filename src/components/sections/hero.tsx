import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";

const stats = [
  {
    label: "Rol",
    value: "Tech Lead",
    detail: "Frontend · Cloudnet Solutions",
  },
  {
    label: "Producción",
    value: "Cloud & CI/CD",
    detail: "Azure · GitHub Actions",
  },
  {
    label: "Freelance",
    value: "Punta a punta",
    detail: "Web & apps",
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-340 px-6 pt-28 pb-16 sm:px-8 lg:pt-45 lg:pb-37.5"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 15% -5%, color-mix(in srgb, var(--a1) 7%, transparent), transparent 70%)",
        }}
      />
      <div className="relative grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-24">
        <div className="flex max-w-195 flex-col gap-8">
          <Reveal className="flex w-fit items-center gap-1.75 rounded-full bg-accent py-1.25 pr-3 pl-2.5">
            <span className="block h-1.25 w-1.25 rounded-full bg-background" />
            <span className="font-mono text-[11.5px] font-medium tracking-[0.04em] text-accent-foreground uppercase">
              Disponible para proyectos freelance
            </span>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col gap-5">
            <h1 className="text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-[76px]">
              Desarrollador
              <br />
              Full Stack
            </h1>
            <p className="max-w-160 text-base leading-relaxed font-light text-muted-foreground text-pretty lg:text-[19px]">
              Lidero técnicamente el frontend en{" "}
              <span className="font-normal text-foreground">
                Cloudnet Solutions
              </span>{" "}
              y desarrollo proyectos freelance de punta a punta, con React,
              Node.js y TypeScript en producción.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="flex flex-wrap items-center gap-3">
            <a
              href="/cv/CV_Gonzalo_Quiroga.pdf"
              download
              className="flex h-10 items-center gap-2 rounded-md bg-foreground px-4.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Descargar CV
              <span className="font-mono text-[11px] opacity-55">PDF</span>
            </a>
            <Link
              href="#proyectos"
              className="flex h-10 items-center gap-2 rounded-md border border-border bg-foreground/3 px-4.5 text-sm font-medium transition-colors hover:border-muted-foreground/40 hover:bg-foreground/7"
            >
              Ver proyectos
              <span className="text-accent">→</span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.22} className="flex flex-col border-t border-border">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1.25 border-b border-border py-5 last:border-b-0"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                {stat.label}
              </span>
              <span className="text-xl font-normal tracking-[-0.02em]">
                {stat.value}
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.02em] text-muted-foreground">
                {stat.detail}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
