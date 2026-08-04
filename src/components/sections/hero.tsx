import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
    >
      {/*
        Fondo de la sección: foto editada pendiente (la pone Gonzalo más
        adelante). Placeholder explícito para no dejarlo vacío mientras
        tanto — reemplazar por next/image con object-cover + overlay de
        legibilidad cuando esté la foto real.
      */}
      <div
        className="absolute inset-0 flex items-end justify-end p-4"
        style={{
          backgroundColor: "var(--background-2)",
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.025) 0 10px, transparent 10px 20px)",
        }}
      >
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          Foto de fondo — sección completa
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 15% -5%, var(--a1-ambient), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-340 px-6 pt-28 pb-16 sm:px-8 lg:pt-45 lg:pb-37.5">
        <div className="flex max-w-195 flex-col gap-8">
          {/*
            El badge era un pill de acento sólido: 240px de cian puro, la
            parte más "template" del diseño. Ahora el color queda solo en el
            punto de 5px (único lugar donde --a1 crudo no molesta) y el resto
            es borde tenue + halo. Ver design-referencia-estilo.md §9.5.
          */}
          <Reveal className="glow-a1 flex w-fit items-center gap-1.75 rounded-full border border-a1-line bg-a1-ambient py-1.25 pr-3 pl-2.5">
            <span className="glow-a1-point block h-1.25 w-1.25 rounded-full bg-a1" />
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-foreground uppercase">
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
              <span className="font-mono text-[11px] opacity-80">PDF</span>
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
      </div>
    </section>
  );
}
