import { skillCategories } from "@/data/skills";

/** Fuente única: el mismo stack que lista Habilidades, aplanado. */
const stack = skillCategories.flatMap((category) => category.skills);

/**
 * Banda horizontal con el stack en loop, entre Habilidades y Proyectos.
 *
 * Es la adaptación sobria de las cintas diagonales de la referencia
 * (design-referencia-estilo.md §8.2 punto 3): una sola, sin rotar, sin 3D.
 * Corta el ritmo de bloques apilados parejos que era una de las carencias
 * del diseño anterior.
 *
 * Decorativa y `aria-hidden`: son las mismas 32 tecnologías que la sección
 * de Habilidades ya expone agrupadas y con contexto; repetirlas en una tira
 * plana solo agrega ruido en un lector de pantalla.
 */
export function StackMarquee() {
  return (
    <div
      aria-hidden
      className="hairline-top marquee-mask relative overflow-hidden bg-background py-4.5"
    >
      <div className="marquee-track flex w-max">
        {/*
          Dos copias idénticas: la animación recorre exactamente la mitad de
          la pista, por lo que al reiniciar el contenido coincide y el salto
          es invisible.
        */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {stack.map((item) => (
              <li
                key={item}
                className="flex items-center gap-7 pr-7 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase"
              >
                {item}
                <span className="block size-1 shrink-0 bg-muted-foreground/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
