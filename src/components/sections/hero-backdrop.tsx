"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Atmósfera del hero: grilla, líneas de eje que se dibujan, puntos que laten,
 * halo que sigue al cursor y onda al hacer clic.
 *
 * Inspirado en "Digital Serenity" de Le Thanh (21st.dev/@minhxthanh). No es una
 * copia: ese componente resuelve todo mutando el DOM a mano con
 * `document.querySelectorAll`, engancha los listeners a `document` (con lo cual
 * el clic dispara ondas en toda la página, no solo en el hero), pone las capas
 * en `position: fixed` —que las deja flotando sobre el resto del sitio al
 * scrollear— y manda los ripples a `z-index: 9999`, por encima del header
 * sticky. Acá las técnicas se reimplementaron declarativamente, acotadas a la
 * sección y con la paleta del proyecto.
 *
 * Todo es decorativo: `aria-hidden` y `pointer-events-none` en la raíz, así no
 * aparece en el árbol de accesibilidad ni bloquea los CTA que tiene encima.
 */

/** Posiciones de las líneas de eje, en porcentaje del alto/ancho. */
const H_LINES = [
  { at: "20%", delay: "0.4s", opacity: 0.5 },
  { at: "80%", delay: "0.75s", opacity: 0.5 },
  { at: "50%", delay: "1.45s", opacity: 0.22 },
];
const V_LINES = [
  { at: "20%", delay: "1.1s", opacity: 0.5 },
  { at: "80%", delay: "1.25s", opacity: 0.5 },
  { at: "50%", delay: "1.6s", opacity: 0.22 },
];

/** Puntos en las intersecciones de las líneas fuertes, más el centro. */
const DOTS = [
  { cx: "20%", cy: "20%", r: 2, delay: "1.9s" },
  { cx: "80%", cy: "20%", r: 2, delay: "2.05s" },
  { cx: "20%", cy: "80%", r: 2, delay: "2.2s" },
  { cx: "80%", cy: "80%", r: 2, delay: "2.35s" },
  { cx: "50%", cy: "50%", r: 1.5, delay: "2.6s" },
];

/*
  Acá vivían cinco partículas a la deriva. Se quitaron: eran la segunda
  animación infinita del hero, junto con el latido de los puntos, y dos ciclos
  perpetuos superpuestos en la primera pantalla son lo contrario de lo que el
  resto del sitio declara.

  Entre las dos se eligió cortar esta. El latido está anclado a las
  intersecciones de las líneas de eje, o sea que pertenece a la grilla y refuerza
  la estructura; las partículas eran polvo genérico, el recurso más visto y el
  único elemento del fondo que no se apoyaba en el vocabulario del sistema.

  Queda entonces: grilla, líneas que se dibujan una vez, puntos que laten,
  marcas de esquina y el halo del cursor.
*/

const CORNERS = [
  "top-6 left-6 border-t border-l sm:top-8 sm:left-8",
  "top-6 right-6 border-t border-r sm:top-8 sm:right-8",
  "bottom-6 left-6 border-b border-l sm:bottom-8 sm:left-8",
  "bottom-6 right-6 border-r border-b sm:bottom-8 sm:right-8",
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /*
      El halo se mueve escribiendo custom properties sobre el nodo, no con
      estado de React: un `setState` por evento de puntero re-renderiza el
      árbol entero decenas de veces por segundo. El rAF además garantiza como
      máximo una lectura de layout (`getBoundingClientRect`) por frame, en vez
      de una por evento, que es lo que provoca thrashing.
    */
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const apply = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const x = lastX - rect.left;
      const y = lastY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      root.style.setProperty("--hero-glow-opacity", inside ? "1" : "0");
      if (!inside) return;
      root.style.setProperty("--hero-glow-x", `${x}px`);
      root.style.setProperty("--hero-glow-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => root.style.setProperty("--hero-glow-opacity", "0");

    const onClick = (event: MouseEvent) => {
      /*
        Nada de ondas cuando se toca algo que hace algo. El clic sobre los CTA
        del hero disparaba una onda que competía con la respuesta real del
        botón, y con la página scrolleada el header sticky queda por encima del
        rectángulo del hero: tocar el nav prendía una onda debajo del header,
        que se leía como un glitch.
      */
      const target = event.target as Element | null;
      if (target?.closest("a, button, input, textarea, label, header")) return;

      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      const id = Date.now() + Math.random();
      setRipples((current) => [...current, { id, x, y }]);
      window.setTimeout(
        () => setRipples((current) => current.filter((r) => r.id !== id)),
        900,
      );
    };

    /*
      Los listeners viven en `window`, así que sin este control seguían activos
      con el hero fuera de pantalla: mover el mouse leyendo Proyectos disparaba
      un `getBoundingClientRect` por frame para posicionar un halo que nadie
      podía ver. El observer los engancha y desengancha según la sección esté o
      no en el viewport.

      El halo se apaga al desenganchar: si no, al volver a subir se lo encuentra
      encendido en la última posición conocida, que ya no tiene nada que ver con
      dónde está el cursor.
    */
    let attached = false;

    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("click", onClick);
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      root.style.setProperty("--hero-glow-opacity", "0");
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) attach();
      else detach();
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      detach();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-hero-backdrop
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/*
            Trama de fondo. A 64px y con el color de `--border` queda por
            debajo del umbral de "patrón decorativo": no se mira, da textura.
          */}
          <pattern
            id="hero-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.5"
              opacity="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />

        {/*
          Líneas de eje: entran dibujándose con stroke-dashoffset. El dash de
          5 5 las deja punteadas, que es el registro de "guía de maqueta" y no
          el de una regla sólida — no compiten con las hairlines reales del
          sitio, que sí son estructura.
        */}
        {H_LINES.map((line) => (
          <line
            key={`h-${line.at}`}
            x1="0"
            y1={line.at}
            x2="100%"
            y2={line.at}
            stroke="var(--muted-foreground)"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            data-hero-line
            opacity="0"
            style={{
              ["--hero-line-opacity" as string]: line.opacity,
              animation: `hero-line-draw 2s ease-out ${line.delay} forwards`,
            }}
          />
        ))}
        {V_LINES.map((line) => (
          <line
            key={`v-${line.at}`}
            x1={line.at}
            y1="0"
            x2={line.at}
            y2="100%"
            stroke="var(--muted-foreground)"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            data-hero-line
            opacity="0"
            style={{
              ["--hero-line-opacity" as string]: line.opacity,
              animation: `hero-line-draw 2s ease-out ${line.delay} forwards`,
            }}
          />
        ))}

        {DOTS.map((dot) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--muted-foreground)"
            data-hero-dot
            opacity="0"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `hero-dot-pulse 4s ease-in-out ${dot.delay} infinite`,
            }}
          />
        ))}
      </svg>

      {/*
        Marcas de esquina. En el original son cuadrados cerrados de 40px; acá
        son ángulos abiertos, que es la forma que ya usa el encuadre de la foto
        de Sobre Mí (§5) — el mismo recurso, no uno nuevo.
      */}
      {CORNERS.map((corner, i) => (
        <span
          key={corner}
          data-hero-corner
          className={`absolute size-9 border-border opacity-0 ${corner}`}
          style={{
            animation: `hero-fade-in 1s ease-out ${2.8 + i * 0.12}s forwards`,
          }}
        />
      ))}

      {/*
        Halo del cursor. Es el uso canónico del acento —emite, no pinta— y el
        único elemento del fondo que lleva cian. Arranca invisible: sin puntero
        (mobile, o antes del primer movimiento) no se ve nada.

        Se mueve con `transform` y no con `left`/`top`. La diferencia no es de
        estilo: `left` y `top` son propiedades de layout, así que cada frame de
        puntero forzaba al navegador a recalcular posición y volver a pintar un
        gaussiano de 384px — el trabajo más caro del hero, repetido a la
        frecuencia del mouse. `transform` lo resuelve el compositor, sin tocar
        layout ni pintura. El `willChange` viejo (`left, top`) además no servía
        para nada: esas propiedades no se pueden promover a capa.

        El `translate3d` posiciona y el `translate(-50%, -50%)` que le sigue
        centra el círculo sobre ese punto — los porcentajes de `translate` son
        del propio elemento, por eso el orden importa.
      */}
      <div
        className="absolute top-0 left-0 size-96 rounded-full blur-3xl"
        style={{
          opacity: "var(--hero-glow-opacity, 0)",
          transform:
            "translate3d(var(--hero-glow-x, 0px), var(--hero-glow-y, 0px), 0) translate(-50%, -50%)",
          background:
            "radial-gradient(circle, var(--a1-bloom), transparent 70%)",
          transition: "opacity 400ms ease-out",
          willChange: "transform",
        }}
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute size-6 rounded-full border border-a1-line"
          style={{
            left: ripple.x,
            top: ripple.y,
            animation: "hero-ripple 900ms ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
