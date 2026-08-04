import { Reveal } from "@/components/motion/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="habilidades"
      className="hairline-top relative bg-background-2"
    >
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-5">
          <SectionEyebrow index="02" title="Habilidades" />
        </Reveal>
        <Reveal
          delay={0.06}
          className="mb-10 max-w-155 text-xl leading-snug tracking-[-0.02em] text-balance sm:text-2xl lg:mb-14"
        >
          <p>
            Stack que uso a diario, en proyectos que están corriendo en
            producción.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.id}
              delay={(i % 4) * 0.055}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-muted-foreground/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[17px] font-medium tracking-[-0.01em]">
                  {category.title}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                  {String(category.skills.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[5px] border border-border px-2.25 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
