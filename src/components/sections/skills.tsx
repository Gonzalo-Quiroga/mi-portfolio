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
        <div className="grid grid-cols-1 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 sm:gap-x-0 sm:divide-x sm:divide-border lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.id}
              delay={(i % 4) * 0.055}
              className="flex flex-col gap-5 sm:px-7 sm:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">
                  {category.title}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/60">
                  {String(category.skills.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-[15px] font-light tracking-[-0.01em] text-muted-foreground"
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
