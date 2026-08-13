import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Bracketed, Marker, SectionHeader } from "@/components/ui/section-header";

/**
 * Foto de Sobre Mí. Fondo negro neutro y sin dominante de color, así que va sin
 * ningún tratamiento: la versión anterior necesitaba un filtro para domar un
 * azul que peleaba con el acento, esta no.
 *
 * **Al reemplazarla hay que cambiar el nombre del archivo, no sobrescribirlo.**
 * Con el mismo nombre la URL de `/_next/image?url=...` queda idéntica y tanto
 * el navegador como la caché de imágenes de Next siguen sirviendo la vieja.
 *
 * Fuente en `design-assets/about-original/`, fuera de `public/` para no
 * deployar megas que nadie descarga.
 */
const aboutPhoto = "/about/about-v3.webp";

/* "Tech Lead Frontend" no está acá por lo mismo que no está en el CV ni en
   LinkedIn (ver `linkedin-notes.md`): el rol es informal, sin autoridad ni
   alcance de arquitectura, y no se sostiene como título en una entrevista.

   El foco actual en frontend tampoco se nombra acá: en una ficha que titula
   "Desarrollador Full Stack", agregar "Frontend" al lado se lee como una
   contradicción y no como un matiz. Eso se cuenta en los párrafos, que tienen
   espacio para explicarlo.

   El dato de freelance es el único que le habla al cliente; los otros tres son
   para el reclutador. */
const facts = [
  {
    label: "Rol actual",
    value: "Desarrollador Full Stack",
    /*
      Empresa y antigüedad en renglones separados, no unidas por el `·`: son
      dos datos de distinto orden y el punto medio los leía como uno solo. De
      paso la ficha llega a tres líneas, como la de formación.
    */
    detail: (
      <>
        Cloudnet Solutions
        <br />
        Desde 2023
      </>
    ),
  },
  {
    label: "Freelance",
    value: "Desde 2022",
    detail: "Proyectos de punta a punta",
  },
  {
    /*
      El nombre completo es "Tecnicatura Superior en Desarrollo Web y
      Aplicaciones Digitales". Entero en `value` ocupa cinco líneas y rompe la
      grilla de cuatro columnas, así que se parte: la carrera arriba y el grado
      con la institución abajo. No se abrevia — es el título formal.
    */
    label: "Formación",
    value: "Desarrollo Web y Aplicaciones Digitales",
    detail: "Tecnicatura Superior · ISPC · en curso",
  },
  {
    label: "Ubicación",
    value: "Arroyito, Córdoba",
    /* "Argentina" no sobra: existe una Córdoba en España y hay quien filtra por país. */
    detail: "Argentina · Remoto · GMT-3",
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
              /* Dos tonos: el apagado sobre el origen, el blanco sobre el presente. */
              <p className="text-[26px] leading-tight font-normal tracking-[-0.02em] text-balance sm:text-[32px]">
                <span className="text-muted-foreground">
                  Empecé estudiando Ing. Electrónica y en 2022 di el salto a la
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
              `sizes` declara el ancho real de esta columna, no uno aproximado:
              con `max-w-340` (1360px), padding de 32px y la grilla `1fr_1.5fr`
              con gap de 96px, la columna mide ~480px (30rem). Declararla más
              chica hace que Next sirva una variante menor y el navegador la
              agrande — era eso, y no ningún filtro, lo que hacía ver la foto de
              mala calidad. Debajo de `lg` el ancho lo fija el `max-w-96` del
              contenedor, así que son 24rem exactos y no un porcentaje del
              viewport.

              El origen es 1:1 y el marco 4:5, así que object-cover recorta a
              los lados.
            */}
            {/*
              El ancho se topea hasta `lg`: en tablet la grilla colapsa a una
              columna y la foto pasaba a ocupar los 704px de ancho útil, que con
              `aspect-4/5` son 880px de alto — una pantalla entera de retrato
              antes de llegar al texto. Desde `lg` manda la columna de la grilla.
            */}
            <div className="relative mx-auto w-full max-w-96 lg:max-w-none">
              <div className="relative aspect-4/5 overflow-hidden bg-background-2">
                <Image
                  src={aboutPhoto}
                  alt="Gonzalo Quiroga"
                  fill
                  sizes="(min-width: 1024px) 30rem, 24rem"
                  quality={90}
                  className="object-cover"
                />
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
            {/*
              Los cuatro párrafos iban en `font-light text-muted-foreground`.
              Los dos ajustes van juntos porque el problema era uno solo: sobre
              #0a0a0a un peso light se afina y el trazo se deshilacha, y encima
              el gris apagado lo alejaba todavía más del fondo mínimo de lectura
              cómoda. Este es el cuerpo de texto más largo del sitio — el único
              lugar donde alguien lee de corrido en vez de escanear — y era el
              peor tratado.

              Pasan a peso normal y a `foreground/80`, el mismo escalón medio
              que el párrafo del hero. `muted-foreground` queda reservado para
              lo que sí es metadata: labels, índices, contadores y la línea de
              estado de más abajo, que por contraste ahora se lee como otro
              nivel y no como más de lo mismo.
            */}
            {/*
              Plural deliberado en "desarrollamos y mantenemos": varias de estas
              tecnologías son aporte del equipo, no 100% individual. El párrafo
              siguiente, que sí es propio y verificable, vuelve al singular.
            */}
            <p className="text-base leading-[1.72] text-foreground/80 text-pretty">
              Trabajo en Cloudnet Solutions, donde desarrollamos y mantenemos
              aplicaciones para múltiples clientes: APIs REST con Express y
              Sequelize sobre PostgreSQL y SQL Server, autenticación con JWT y
              Auth0, testing con Jest y despliegue continuo en Microsoft Azure
              con GitHub Actions.
            </p>
            {/*
              "Doy la aprobación final" es la formulación ya validada en
              `linkedin-notes.md`: dice lo mismo que "lidero el equipo" pero
              nombra la responsabilidad concreta en vez de un cargo que no
              existe en el organigrama, y se defiende con ejemplos en una
              entrevista.
            */}
            <p className="text-base leading-[1.72] text-foreground/80 text-pretty">
              Tengo trato directo con clientes y stakeholders para traducir
              necesidades de negocio en soluciones técnicas. Hoy mi trabajo está
              enfocado en el frontend: reviso el código del equipo, doy la
              aprobación final de los cambios que entran y acompaño a los
              desarrolladores junior.
            </p>
            <p className="text-base leading-[1.72] text-foreground/80 text-pretty">
              También desarrollo proyectos freelance de punta a punta para
              emprendedores y pequeñas empresas.
            </p>
            <p className="text-base leading-[1.72] text-foreground/80 text-pretty">
              Incorporo asistentes de IA como Claude Code en mi flujo de trabajo
              para acelerar el desarrollo sin resignar calidad, y sigo
              formándome en la Tecnicatura Superior en Desarrollo Web y
              Aplicaciones Digitales del ISPC.
            </p>
            {/*
              Registro micro y no un cuarto párrafo: esto es metadata de estado
              para el reclutador. El inglés va acá porque en búsquedas remotas
              suele ser un filtro duro.
            */}
            <p className="mt-1 flex items-start gap-3 font-mono text-[10.5px] leading-[1.7] tracking-[0.14em] text-muted-foreground/80 uppercase">
              <Marker className="mt-[0.42em] bg-muted-foreground/50" />
              <span>
                Abierto a nuevas oportunidades como Full Stack, Frontend o
                Backend Developer · Inglés B1
              </span>
            </p>
            <a
              href="#contacto"
              className="flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>
                Si tenés un proyecto o una propuesta en mente, escribime
              </Bracketed>
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-8 border-t border-border pt-12 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border lg:pt-14">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center gap-1.5 px-6 text-center"
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                  {fact.label}
                </span>
                <span className="text-[17px] font-medium tracking-[-0.02em] text-balance sm:text-lg">
                  {fact.value}
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/80">
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
