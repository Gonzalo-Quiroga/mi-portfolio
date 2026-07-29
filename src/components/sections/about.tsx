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
      className="border-t border-border bg-background"
      style={{ "--accent": "var(--a1)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <div className="mb-10 flex items-center gap-3 lg:mb-14">
          <span className="font-mono text-[11.5px] tracking-[0.08em] text-accent uppercase">
            01
          </span>
          <h2 className="text-sm font-medium tracking-[0.02em] text-muted-foreground uppercase">
            Sobre mí
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-30">
          <div className="flex max-w-170 flex-col gap-6">
            <p className="text-2xl leading-snug font-normal tracking-[-0.02em] text-balance sm:text-[26px]">
              Empecé estudiando Ing. Electrónica y en 2020 di el salto a la
              programación. Hoy soy Desarrollador Full Stack con foco en
              React, Node.js y TypeScript.
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
          </div>

          <div className="flex flex-col gap-3">
            {/* Sin foto de perfil definida todavía: placeholder explícito, reemplazar por next/image cuando exista. */}
            <div
              className="flex aspect-[4/5] items-end rounded-lg border border-border bg-background-2 p-4"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.025) 0 10px, transparent 10px 20px)",
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.03em] text-muted-foreground">
                foto de perfil — 4:5
              </span>
            </div>

            <div className="flex flex-col gap-4.5 rounded-lg border border-border bg-card p-5.5">
              {facts.map((fact, i) => (
                <div key={fact.label} className="contents">
                  {i > 0 && <div className="h-px bg-border" />}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
                      {fact.label}
                    </span>
                    <span className="text-[15px]">{fact.value}</span>
                    <span className="text-[13.5px] text-muted-foreground">
                      {fact.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
