"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { navLinks } from "@/data/nav";
import { Bracketed } from "@/components/ui/section-header";

/**
 * Sección visible, para marcar el ítem de nav correspondiente.
 *
 * Un nav de anclas sin indicador obliga al visitante a acordarse de dónde
 * quedó: es la diferencia entre un menú decorativo y uno que orienta.
 *
 * Se resuelve con IntersectionObserver y no escuchando `scroll`: el observer
 * solo despierta cuando una sección cruza la banda, mientras que un listener de
 * scroll corre en cada frame de la rueda midiendo secciones que no se movieron.
 *
 * `rootMargin: "-22% 0px -70% 0px"` recorta el viewport a una franja fina cerca
 * del borde superior, justo debajo del header sticky. Sin esa franja, con
 * secciones de alto muy distinto, hay varias intersecando a la vez casi siempre
 * y el criterio de desempate manda más que la medición.
 *
 * Cuando dos secciones cruzan la franja al mismo tiempo (el límite entre ambas
 * está ahí adentro) gana la última en orden del documento: es la que está
 * entrando, que es la que el ojo ya está leyendo.
 *
 * El hero queda afuera a propósito: no tiene ítem en el nav, así que arriba de
 * todo no hay nada marcado y eso es correcto.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const crossing = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        /*
          Sin nadie en la franja no se apaga el indicador: pasa al scrollear
          entre dos secciones largas o al llegar al footer, y apagarlo ahí
          parpadea. Se mantiene el último válido.
        */
        const last = [...ids].reverse().find((id) => crossing.has(id));
        if (last) setActive(last);
      },
      { rootMargin: "-22% 0px -70% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* Fuera del componente: array estable, así el efecto de arriba no se re-suscribe en cada render. */
const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /*
    Cerrar el panel con Escape y tocando fuera. Un menú que solo cierra con su
    propio botón deja al visitante atrapado si lo abrió sin querer, que en
    teléfono pasa seguido.

    El foco vuelve al botón solo en el caso de Escape: ahí el usuario está en el
    teclado y perder el foco lo manda al principio del documento. Al tocar
    afuera, en cambio, ya eligió otro punto de la página y devolvérselo al botón
    sería arrebatárselo.

    `pointerdown` y no `click`: dispara antes, así el panel no queda un
    instante abierto tapando lo que la persona quiso tocar.
  */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && headerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    /*
      Todos los destinos del header son anclas de esta misma página, así que van
      con `<a>` y no con `next/link`: el router de Next resuelve el hash con un
      salto propio que ignora el `scroll-behavior: smooth` del documento. Con el
      ancla nativa el desplazamiento suave lo hace el navegador.
    */
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background/72 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-340 items-center justify-between px-6 sm:px-8">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/gq-mark.png"
            alt=""
            width={22}
            height={22}
            className="shrink-0"
          />
          Gonzalo Quiroga
        </a>

        {/*
          Nav en registro micro separado por el marcador `▪`.

          El CTA "Hablemos" que iba al lado apuntaba al mismo `#contacto` que
          el ítem de nav: dos entradas al mismo destino a 20px una de otra no
          suman llamada a la acción, restan claridad. En vez de eliminarlo sin
          más, su tratamiento — corchetes y color pleno — pasó al ítem de
          Contacto, que ahora hace de destacado sin duplicar nada.
        */}
        {/*
          El nav aparece recién en `md` (768px) y no en `sm`: los cuatro ítems
          en mono con tracking ancho miden ~430px, el logo ~157px y el padding
          48px — a 640px eso no entra, y el nav terminaba pegado al nombre.
        */}
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link, i) => {
            const isActive = active === sectionIds[i];

            return (
              <div key={link.href} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden className="block size-1 bg-muted-foreground/40" />
                )}
                {/*
                  La marca de sección activa es una hairline de 1px en
                  `--a1-line`, no un cambio de color: el ítem de Contacto ya va
                  en blanco pleno por ser el destacado, así que subirle el tono
                  no lo distinguiría de su estado normal. La línea funciona
                  igual en los cuatro y es el uso del acento que el sistema ya
                  tiene (emite, no pinta).

                  Va con `after:` y opacidad y no montando el elemento: así la
                  aparición se puede transicionar y el ancho de la línea no
                  depende de que el nodo exista.
                */}
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative font-mono text-[11px] tracking-[0.14em] uppercase transition-[color,opacity] after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-a1-line after:opacity-0 after:transition-opacity after:duration-300 ${
                    isActive ? "after:opacity-100" : ""
                  } ${
                    link.emphasis || isActive
                      ? "text-foreground hover:opacity-70"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.emphasis ? <Bracketed>{link.label}</Bracketed> : link.label}
                </a>
              </div>
            );
          })}
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
        >
          {/*
            Las tres líneas viven en 4px, 8px y 12px, y la cruz se arma llevando
            las de los extremos al centro con `translate-y`. Antes se movía la
            propiedad `top`, que `transition-transform` no cubre: el giro se
            animaba pero el desplazamiento saltaba de golpe.
          */}
          <span className="relative block h-4 w-4">
            <span
              className={`absolute top-1 left-0 h-px w-4 bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`absolute top-1/2 left-0 h-px w-4 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute top-3 left-0 h-px w-4 bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/*
        El panel se despliega animando la altura, no montándose de golpe.
        `AnimatePresence` es lo que permite animar también el cierre: sin él,
        React desmonta el nodo en el mismo frame y no hay nada que animar.

        La altura lleva la curva larga del sistema y la opacidad una más corta,
        así el contenido termina de aparecer antes de que el panel frene — al
        revés se ve como una persiana. La separación con el header la da el
        `border-b` que este ya tiene, así el panel no aporta ninguna línea que
        quede colgando cuando su altura llega a cero.

        Va flotando (`absolute`) y no en el flujo del header: al tocar un link
        el panel se cierra con el scroll suave ya en camino, y desde el flujo
        eso correría toda la página ~200px mientras el navegador viaja hacia una
        posición que calculó antes del cambio — el destino aterrizaría movido.
      */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    height: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2 },
                  }
            }
            className="absolute inset-x-0 top-full overflow-hidden bg-background/92 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-3">
              {navLinks.map((link, i) => {
                const isActive = active === sectionIds[i];

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2.5 font-mono text-[12px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground/4 ${
                      link.emphasis || isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.emphasis ? <Bracketed>{link.label}</Bracketed> : link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
