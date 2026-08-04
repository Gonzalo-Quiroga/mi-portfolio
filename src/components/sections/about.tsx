import { Reveal } from "@/components/motion/reveal";
import { Bracketed, SectionHeader } from "@/components/ui/section-header";

const facts = [
  {
    label: "Rol actual",
    value: "Tech Lead Frontend",
    detail: "Cloudnet Solutions",
  },
  {
    label: "Formación",
    value: "Tec. Sup. en Desarrollo Web",
    detail: "ISPC · en curso",
  },
  {
    label: "Ubicación",
    value: "Córdoba, Argentina",
    detail: "Remoto · GMT-3",
  },
];

export function About() {
  return (
    <section id="sobre-mi" className="hairline-top relative bg-background">
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-14 lg:mb-20">
          <SectionHeader
            index="01"
            title="Sobre mí"
            statement={
              /*
                Titular a dos tonos (§3.3). El apagado cae sobre el origen y
                el blanco sobre el presente: el recurso de la referencia, pero
                usado donde el contraste dice algo y no solo decora.
              */
              <p className="text-[26px] leading-tight font-normal tracking-[-0.02em] text-balance sm:text-[32px]">
                <span className="text-muted-foreground">
                  Empecé estudiando Ing. Electrónica y en 2020 di el salto a la
                  programación.
                </span>{" "}
                Hoy soy Desarrollador Full Stack con foco en React, Node.js y
                TypeScript.
              </p>
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <Reveal>
            {/*
              Sin foto de perfil definida todavía: placeholder explícito,
              reemplazar por next/image cuando exista. Las marcas de esquina
              son el encuadre tipo prueba de imprenta de la referencia (§5).
            */}
            <div className="relative">
              <div
                className="flex aspect-4/5 items-end bg-background-2 p-4"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.025) 0 10px, transparent 10px 20px)",
                }}
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                  Foto de perfil — 4:5
                </span>
              </div>
              <span
                aria-hidden
                className="absolute -top-px -left-px block size-1.5 bg-muted-foreground"
              />
              <span
                aria-hidden
                className="absolute -top-px -right-px block size-1.5 bg-muted-foreground"
              />
              <span
                aria-hidden
                className="absolute -bottom-px -left-px block size-1.5 bg-muted-foreground"
              />
              <span
                aria-hidden
                className="absolute -right-px -bottom-px block size-1.5 bg-muted-foreground"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex max-w-170 flex-col gap-6">
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Lidero técnicamente al equipo frontend en Cloudnet Solutions,
              donde desarrollo y mantengo aplicaciones para múltiples clientes:
              APIs REST con Express y Sequelize sobre PostgreSQL y SQL Server,
              autenticación con JWT y Auth0, testing con Jest y despliegue
              continuo en Microsoft Azure con GitHub Actions.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              También desarrollo proyectos freelance de punta a punta para
              emprendedores y pequeñas empresas.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Incorporo asistentes de IA en mi flujo de trabajo para acelerar
              el desarrollo sin resignar calidad, y sigo formándome en la
              Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales
              del ISPC.
            </p>
            <a
              href="#contacto"
              className="mt-2 flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>Si tenés un proyecto en mente, escribime</Bracketed>
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-8 border-t border-border pt-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border lg:pt-14">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center gap-1.5 px-6 text-center"
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                  {fact.label}
                </span>
                <span className="text-lg font-medium tracking-[-0.02em] sm:text-xl">
                  {fact.value}
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/70">
                  {fact.detail}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
