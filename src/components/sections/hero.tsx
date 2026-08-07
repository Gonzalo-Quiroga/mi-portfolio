import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Bracketed, Marker } from "@/components/ui/section-header";

export function Hero() {
  return (
    <section id="home" className="relative min-h-svh overflow-hidden">
      {/*
        Fondo por capas, con el negro como base y el gris solo como halo
        (§2): el degradé claro se concentra donde va a ir la foto recortada,
        de modo que el sujeto parezca emerger de la oscuridad en vez de estar
        pegado sobre un rectángulo. Todo muere en --background contra los
        bordes, así la sección se funde con la siguiente sin corte.
      */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(68% 58% at 72% 42%, oklch(0.34 0.004 285 / 0.55), transparent 72%)",
            "radial-gradient(52% 42% at 78% 30%, oklch(0.44 0.004 285 / 0.22), transparent 68%)",
            "radial-gradient(820px 400px at 10% 6%, var(--a1-ambient), transparent 70%)",
            "linear-gradient(to bottom, oklch(0.185 0.002 285) 0%, var(--background) 58%)",
          ].join(", "),
        }}
      />
      {/* Viñeta: oscurece los cuatro bordes para que nada termine en filo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 105% at 50% 45%, transparent 42%, var(--background) 100%)",
        }}
      />

      {/*
        Contenido en el tercio superior, no anclado abajo: el peso visual va
        arriba y el espacio libre de abajo queda para la foto, que entra
        después como PNG recortado detrás de este bloque (el z-10 de acá ya
        deja preparada la oclusión del §4.1).

        Margen exterior fino, más ancho que el resto de las secciones: el
        titular arranca cerca del borde como en la referencia, en vez de
        respetar la caja centrada de 1360px (§4).
      */}
      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-6 pt-30 pb-28 sm:px-8 lg:pt-[17vh] lg:pb-40">
        <div className="flex flex-col gap-9">
          {/*
            Era un pill con punto y borde: el patrón de badge de estado que
            hoy trae por defecto cualquier landing generada. Baja al mismo
            registro micro con marcador que usan las cabeceras de sección
            (§3.1 y §5), así deja de ser un componente y pasa a ser una línea
            de metadata más del sistema.
          */}
          <Reveal className="flex w-fit items-center gap-3">
            <Marker className="bg-muted-foreground/60" />
            {/*
              Cubre los dos públicos que entran al sitio: el cliente que busca
              a alguien que le haga el proyecto y el reclutador que busca
              contratar. El "Acerca de" de LinkedIn ya declara ambas cosas
              (`linkedin-notes.md`), así que decirlo acá no agrega nada nuevo.
            */}
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
              Disponible para proyectos freelance y nuevas oportunidades
            </span>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col gap-8">
            <h1 className="text-[clamp(2.25rem,8.2vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.03em] uppercase">
              Desarrollador
              <br />
              Full Stack
            </h1>
            {/*
              El párrafo baja a registro micro, como la copy de apoyo de la
              referencia: se comporta como metadata y deja que el titular sea
              lo único que se lee de lejos. Medida angosta a propósito — el
              uppercase con tracking ancho necesita renglones cortos.
            */}
            <p className="max-w-115 font-mono text-[11px] leading-[1.75] tracking-[0.12em] text-muted-foreground uppercase">
              Construyo aplicaciones web de punta a punta con{" "}
              <span className="text-foreground">
                React, Node.js y TypeScript
              </span>
              . Trabajo en Cloudnet Solutions y tomo proyectos freelance para
              emprendedores y pequeñas empresas.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="flex flex-wrap items-center gap-5">
            <a
              href="/cv/CV_Gonzalo_Quiroga.pdf"
              download
              className="flex h-10 items-center gap-2 rounded-md bg-foreground px-4.5 font-mono text-[11px] tracking-[0.14em] text-background uppercase transition-opacity hover:opacity-90"
            >
              Descargar CV
              <span className="opacity-60">PDF</span>
            </a>
            {/*
              Secundario en corchetes en vez de caja: el primario conserva el
              peso que necesita una descarga de CV y el resto de la navegación
              baja a la jerarquía de link (§8.2 punto 1).
            */}
            <Link
              href="#proyectos"
              className="flex h-10 items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>Ver proyectos</Bracketed>
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Micro-copy de esquina, como los bloques sueltos de la referencia (§4). */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-6 z-10 hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60 uppercase sm:left-8 lg:block"
      >
        Arroyito, Córdoba, Argentina · Remoto GMT-3
      </span>
    </section>
  );
}
