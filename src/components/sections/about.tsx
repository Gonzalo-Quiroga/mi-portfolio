import { Reveal } from "@/components/motion/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

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
    <section
      id="sobre-mi"
      className="hairline-top relative bg-background"
    >
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <Reveal className="mb-10 lg:mb-14">
          <SectionEyebrow index="01" title="Sobre mí" />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-30">
          <Reveal>
            {/* Sin foto de perfil definida todavía: placeholder explícito, reemplazar por next/image cuando exista. */}
            <div
              className="flex aspect-4/5 items-end rounded-lg border border-border bg-background-2 p-4"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.025) 0 10px, transparent 10px 20px)",
              }}
            >
              <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                Foto de perfil — 4:5
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex max-w-170 flex-col gap-6">
            {/*
              Titular a dos tonos (§3.3): la frase arranca en blanco y se
              enfría a --a1-text. Acá el corte cae en el punto y no a mitad de
              oración como en la referencia — forzarlo en prosa en español se
              leería como un error de maquetado, no como una decisión.
            */}
            <p className="text-[26px] leading-tight font-normal tracking-[-0.02em] text-balance sm:text-[30px]">
              Empecé estudiando Ing. Electrónica y en 2020 di el salto a la
              programación.{" "}
              <span className="text-accent">
                Hoy soy Desarrollador Full Stack con foco en React, Node.js y
                TypeScript.
              </span>
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Lidero técnicamente al equipo frontend en Cloudnet Solutions,
              donde desarrollo y mantengo aplicaciones para múltiples
              clientes: APIs REST con Express y Sequelize sobre PostgreSQL y
              SQL Server, autenticación con JWT y Auth0, testing con Jest y
              despliegue continuo en Microsoft Azure con GitHub Actions.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              También desarrollo proyectos freelance de punta a punta para
              emprendedores y pequeñas empresas, y complemento mi perfil
              técnico con diseño de interfaces, lo que me da una mirada
              integral: funcionalidad, experiencia de usuario y resolución
              práctica de problemas.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Incorporo asistentes de IA en mi flujo de trabajo para acelerar
              el desarrollo sin resignar calidad, y sigo formándome en la
              Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales
              del ISPC.
            </p>
            <a
              href="#contacto"
              className="mt-2 flex h-10 w-fit items-center gap-2 rounded-md border border-border bg-foreground/3 px-4.5 text-sm font-medium transition-colors hover:border-muted-foreground/40 hover:bg-foreground/7"
            >
              Si tenés un proyecto en mente, escribime
              <span className="text-accent">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={0.12}
          className="mt-16 border-t border-border pt-12 lg:mt-24 lg:pt-14"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center gap-1.5 px-6 text-center"
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-accent uppercase">
                  {fact.label}
                </span>
                <span className="text-lg font-medium tracking-[-0.02em] sm:text-xl">
                  {fact.value}
                </span>
                <span className="font-mono text-[12px] text-muted-foreground">
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
