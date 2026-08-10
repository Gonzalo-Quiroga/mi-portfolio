import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Bracketed, Marker } from "@/components/ui/section-header";

import { HeroBackdrop } from "./hero-backdrop";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/*
        Fondo por capas, con el negro como base y el gris solo como halo (§2).
        Todo muere en --background contra los bordes, así la sección se funde
        con la siguiente sin corte.

        Los dos halos grises estaban descentrados a la derecha (72%/42% y
        78%/30%) para que la foto recortada del hero pareciera emerger de la
        oscuridad. Esa foto se descartó (2026-08-10): alcanza con la de Sobre
        Mí. Sin sujeto que iluminar, esas coordenadas quedaban huérfanas y
        tiraban del ojo hacia la derecha peleando con el texto ya centrado, así
        que se centran. Provisorio: este fondo se reemplaza en el paso
        siguiente.
      */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(68% 58% at 50% 46%, oklch(0.34 0.004 285 / 0.55), transparent 72%)",
            "radial-gradient(52% 42% at 50% 34%, oklch(0.44 0.004 285 / 0.22), transparent 68%)",
            "radial-gradient(820px 400px at 50% 4%, var(--a1-ambient), transparent 70%)",
            "linear-gradient(to bottom, oklch(0.185 0.002 285) 0%, var(--background) 58%)",
          ].join(", "),
        }}
      />
      {/*
        Atmósfera: grilla, líneas de eje, puntos, partículas y halo del cursor.
        Va entre el fondo y la viñeta a propósito — la viñeta la atenúa contra
        los bordes igual que a los degradados, así el decorado no termina en
        filo contra la sección siguiente.
      */}
      <HeroBackdrop />

      {/* Viñeta: oscurece los cuatro bordes para que nada termine en filo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 105% at 50% 45%, transparent 42%, var(--background) 100%)",
        }}
      />

      {/*
        Composición centrada (2026-08-10). Antes el bloque iba pegado al borde
        izquierdo y anclado al tercio superior, dejando libre el espacio de
        abajo a la derecha para la foto recortada; descartada esa foto, el hero
        pasa a tener un solo foco y el titular se queda con todo el eje.

        El centrado es en los dos ejes: `items-center` en la sección resuelve
        el vertical contra el `min-h-svh`, y `items-center` + `text-center` acá
        el horizontal. El ancho baja de 110rem a 64rem porque una medida de
        1760px centrada deja el párrafo y los CTA nadando lejos del titular.
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-9 px-6 py-24 text-center sm:px-8 lg:py-32">
        {/*
          Era un pill con punto y borde: el patrón de badge de estado que hoy
          trae por defecto cualquier landing generada. Baja al mismo registro
          micro con marcador que usan las cabeceras de sección (§3.1 y §5), así
          deja de ser un componente y pasa a ser una línea de metadata más del
          sistema.
        */}
        <Reveal className="flex items-center gap-3">
          <Marker className="bg-muted-foreground/60" />
          {/*
            Cubre los dos públicos que entran al sitio: el cliente que busca a
            alguien que le haga el proyecto y el reclutador que busca contratar.
            El "Acerca de" de LinkedIn ya declara ambas cosas
            (`linkedin-notes.md`), así que decirlo acá no agrega nada nuevo.
          */}
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
            Disponible para proyectos freelance y nuevas oportunidades
          </span>
        </Reveal>

        <Reveal delay={0.06} className="flex flex-col items-center gap-8">
          <h1 className="text-[clamp(2.25rem,8.2vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.03em] uppercase">
            Desarrollador
            <br />
            Full Stack
          </h1>
          {/*
            El párrafo baja a registro micro, como la copy de apoyo de la
            referencia: se comporta como metadata y deja que el titular sea lo
            único que se lee de lejos. Medida angosta a propósito — el uppercase
            con tracking ancho necesita renglones cortos, y centrado necesita
            `text-balance` para que no queden renglones desparejos.
          */}
          <p className="max-w-115 font-mono text-[11px] leading-[1.75] tracking-[0.12em] text-balance text-muted-foreground uppercase">
            Construyo aplicaciones web de punta a punta con{" "}
            <span className="text-foreground">React, Node.js y TypeScript</span>
            . Trabajo en Cloudnet Solutions y tomo proyectos freelance para
            emprendedores y pequeñas empresas.
          </p>
        </Reveal>

        <Reveal
          delay={0.14}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="/cv/CV_Gonzalo_Quiroga.pdf"
            download
            className="flex h-10 items-center gap-2 rounded-md bg-foreground px-4.5 font-mono text-[11px] tracking-[0.14em] text-background uppercase transition-opacity hover:opacity-90"
          >
            Descargar CV
            <span className="opacity-60">PDF</span>
          </a>
          {/*
            Secundario en corchetes en vez de caja: el primario conserva el peso
            que necesita una descarga de CV y el resto de la navegación baja a
            la jerarquía de link (§8.2 punto 1).
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

      {/*
        Ubicación anclada al piso del hero, centrada sobre el mismo eje que el
        resto del bloque.

        Antes iba en la esquina inferior izquierda, como los bloques sueltos de
        la referencia (§4). Dejó de funcionar por dos motivos: el backdrop puso
        ahí una marca de esquina y las líneas la atravesaban, y con la
        composición ya centrada era el único elemento que rompía el eje.

        No se elimina porque el dato sirve arriba de todo: un reclutador de
        búsquedas remotas ve país y huso horario sin scrollear.

        `bottom-8` en vez del `bottom-6 sm:left-8` anterior, que corregía el eje
        horizontal pero no el vertical y dejaba la línea a 24px del piso contra
        los 32px de las marcas de esquina.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden text-center font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60 uppercase lg:block"
      >
        Arroyito, Córdoba, Argentina · Remoto GMT-3
      </span>
    </section>
  );
}
