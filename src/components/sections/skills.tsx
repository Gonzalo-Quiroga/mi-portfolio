import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="habilidades" className="hairline-top relative bg-background-2">
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-14 lg:mb-20">
          <SectionHeader
            index="02"
            title="Habilidades"
            statement={
              <p className="text-[26px] leading-tight font-normal tracking-[-0.02em] text-balance sm:text-[32px]">
                Stack que uso a diario,{" "}
                <span className="text-muted-foreground">
                  en proyectos que están corriendo en producción.
                </span>
              </p>
            }
          />
        </Reveal>

        {/*
          Sin cards: cuatro columnas separadas por una línea, con las
          tecnologías apiladas como una lista de créditos. La referencia no
          tiene un solo recuadro con fondo — la información se ordena con
          reglas y espacio, no con cajas (§4, §8.1 punto 3).
        */}
        {/*
          Los divisores van por `nth-child` y no con `divide-x`: esa utilidad
          pone borde izquierdo a todos los hijos menos el primero de la lista,
          no el primero de cada fila. En las dos columnas de tablet, la tercera
          categoría abría la fila 2 con una línea vertical suelta a su izquierda.

          Con dos columnas la línea va en los pares; con cuatro, en todos menos
          el primero — de ahí la regla extra para el tercero en `lg`. El padding
          sigue al borde: sin línea a la izquierda, no hay nada de qué separarse.
        */}
        <div className="grid grid-cols-1 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 sm:gap-x-0 sm:*:px-7 sm:[&>*:nth-child(2n)]:border-l sm:[&>*:nth-child(2n)]:border-border sm:[&>*:nth-child(2n)]:pr-0 sm:[&>*:nth-child(2n+1)]:pl-0 lg:grid-cols-4 lg:[&>*:nth-child(2)]:pr-7 lg:[&>*:nth-child(4n+3)]:border-l lg:[&>*:nth-child(4n+3)]:border-border lg:[&>*:nth-child(4n+3)]:pl-7">
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.id}
              delay={(i % 4) * 0.055}
              className="flex flex-col gap-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">
                  {category.title}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/80">
                  {String(category.skills.length).padStart(2, "0")}
                </span>
              </div>
              {/*
                Peso normal y no light: son 32 nombres cortos de una lista
                apilada, el caso donde un trazo fino sobre negro más se
                deshilacha. El tono queda un escalón por debajo del cuerpo
                (`/70` contra `/80`) porque acá el título de categoría en
                blanco es el que ordena la columna.
              */}
              <ul className="flex flex-col gap-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-[15px] tracking-[-0.01em] text-foreground/70"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
