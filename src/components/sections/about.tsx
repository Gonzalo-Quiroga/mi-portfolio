import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Bracketed, Marker, SectionHeader } from "@/components/ui/section-header";

/**
 * Foto de Sobre Mí, definitiva (2026-08-10). Segunda versión: recorte más
 * cerrado y desenfoque aplicado sobre las pantallas, que en la anterior
 * dejaban ver el contenido. Verificado al 100%: el texto es ilegible.
 *
 * Original PNG sin pérdida de 1540x2050. Ese ancho da 3.2x sobre los ~480px de
 * la columna, así que cubre incluso pantallas 3x sin agrandar nada.
 *
 * Sustituye a una primera versión de 1086x1448 y, antes de esa, a ocho
 * candidatas que venían recomprimidas por un mensajero — 960x1280 a 0.26-0.44
 * bits por pixel y sin EXIF — que mostraban bloques de JPEG a tamaño de
 * pantalla. Ambas anteriores quedan archivadas junto al original.
 *
 * Servida como WebP q95: 195 KB contra 3501 KB del PNG, PSNR 45.4 dB. El
 * original queda en `design-assets/about-original/`, fuera de `public/` para
 * no deployar 3.5 MB que nadie descarga.
 *
 * **El sufijo `-v2` del archivo no es decorativo: al reemplazar la foto hay
 * que subir el número.** La primera vez se sobrescribió `about.webp` con la
 * imagen nueva manteniendo el nombre, y como `/_next/image?url=...` queda
 * idéntico, tanto el navegador como la caché de imágenes de Next siguieron
 * sirviendo la vieja. Cambiar el nombre cambia la URL y es la única forma
 * confiable de invalidar esa caché, también en el CDN después de deployar.
 */
const aboutPhoto = "/about/about-v2.webp";

/**
 * Tratamiento de color, para que la foto no sea el elemento más saturado de la
 * página. Sin esto el azul de la luz de fondo la vuelve el único bloque de
 * color fuerte del sitio y pelea con el acento.
 *
 * Medido sobre el archivo: tono dominante 215.5°, con el 66% del peso del
 * color entre 210° y 220° — un azul muy concentrado. El cian del sitio
 * (`--a1`, #06fcee) está en 176.6°.
 *
 * **Los grados no son una rotación de tono.** `hue-rotate()` de CSS no rota
 * nada: aplica una matriz lineal fija del spec de Filter Effects que mueve
 * cada tono una cantidad distinta y ni siquiera preserva la luminancia. Un
 * `hue-rotate(-28deg)` sobre este azul lo movía apenas 8°. Los valores de acá
 * salen de simular esas matrices sobre la imagen real y medir el resultado:
 *
 *   sin filtro   215.5°      -40deg  185.0°
 *   -42deg       182.0°      -45deg  178.5°   <- el elegido
 *   -70deg       149.0°  (verde, pasado de largo)
 *
 * Si se retoca, medir el resultado en vez de razonar en grados: la intuición
 * de "rotar N grados mueve el tono N grados" es falsa acá.
 *
 * Se aplica por CSS y nunca horneado en el archivo, así el original queda
 * intacto y esto sigue siendo una línea para ajustar.
 */
const aboutPhotoFilter = "hue-rotate(-45deg) saturate(0.6) brightness(0.78)";

/*
  "Tech Lead Frontend" salió de acá por la misma razón por la que salió del CV,
  del Acerca de de LinkedIn y del banner (ver `linkedin-notes.md`): el rol real
  fue informal y acotado a mentoría y revisión de código de un par de juniors,
  sin autoridad formal ni alcance de arquitectura. No se sostiene como título en
  una entrevista, y las actividades concretas ya están en los párrafos de abajo.

  El cuarto dato (freelance desde 2022) es el que le habla al cliente que entra
  al sitio: los otros tres solo tienen sentido para un reclutador.
*/
const facts = [
  {
    label: "Rol actual",
    value: "Desarrollador Full Stack",
    detail: "Cloudnet Solutions · Remoto",
  },
  {
    label: "Freelance",
    value: "Desde 2022",
    detail: "Proyectos de punta a punta",
  },
  {
    label: "Formación",
    value: "Tec. Sup. en Desarrollo Web",
    detail: "ISPC · en curso",
  },
  {
    label: "Ubicación",
    value: "Arroyito, Córdoba",
    detail: "Argentina · GMT-3",
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
              Las marcas de esquina son el encuadre tipo prueba de imprenta de
              la referencia (§5).

              Sin viñeta y sin blanco y negro. El plan preveía B/N para integrar
              la foto con la paleta, pero acá el color *es* la foto: el encaje
              se resuelve corrigiendo el tono hacia el cian del sitio en vez de
              matarlo. Ver `aboutPhotoFilter` arriba.

              `sizes` tiene que declarar el ancho real de esta columna, no uno
              aproximado: con `max-w-340` (1360px), padding de 32px y la grilla
              `1fr_1.5fr` con gap de 96px, la columna de la foto mide ~480px
              (30rem). Declararla más chica hace que Next sirva una variante
              menor y el navegador la agrande — que es exactamente por qué la
              foto se veía de mala calidad, no por ningún filtro.

              El origen es 3:4 y el marco 4:5, así que object-cover recorta un
              poco arriba y abajo.
            */}
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden bg-background-2">
                <Image
                  src={aboutPhoto}
                  alt="Gonzalo Quiroga"
                  fill
                  sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw"
                  quality={90}
                  className="object-cover"
                  style={{ filter: aboutPhotoFilter }}
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
              Plural deliberado en "desarrollamos y mantenemos": varias de estas
              tecnologías (Sequelize, PostgreSQL/SQL Server, JWT/Auth0, Azure)
              son del equipo en conjunto, no aporte 100% individual. Es una
              decisión ya tomada y marcada como "no perder al reescribir" en
              `linkedin-notes.md` — el párrafo siguiente, que sí es aporte
              individual y verificable, vuelve a primera persona del singular.
            */}
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Trabajo en Cloudnet Solutions, donde desarrollamos y mantenemos
              aplicaciones para múltiples clientes: APIs REST con Express y
              Sequelize sobre PostgreSQL y SQL Server, autenticación con JWT y
              Auth0, testing con Jest y despliegue continuo en Microsoft Azure
              con GitHub Actions.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Tengo trato directo con clientes y stakeholders para traducir
              necesidades de negocio en soluciones técnicas, reviso código y
              acompaño a los desarrolladores junior del equipo frontend.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              También desarrollo proyectos freelance de punta a punta para
              emprendedores y pequeñas empresas.
            </p>
            <p className="text-base leading-[1.72] font-light text-muted-foreground text-pretty">
              Incorporo asistentes de IA como Claude Code en mi flujo de trabajo
              para acelerar el desarrollo sin resignar calidad, y sigo
              formándome en la Tecnicatura Superior en Desarrollo Web y
              Aplicaciones Digitales del ISPC.
            </p>
            {/*
              El párrafo de cierre del "Acerca de" de LinkedIn, bajado a
              registro micro con marcador en vez de un cuarto párrafo: es
              metadata de estado, no prosa. Le habla al reclutador, mientras que
              el link de abajo le habla al cliente.
            */}
            <p className="mt-1 flex items-start gap-3 font-mono text-[10.5px] leading-[1.7] tracking-[0.14em] text-muted-foreground/80 uppercase">
              <Marker className="mt-[0.42em] bg-muted-foreground/50" />
              <span>
                Abierto a nuevas oportunidades como Full Stack, Frontend o
                Backend Developer
              </span>
            </p>
            <a
              href="#contacto"
              className="flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>Si tenés un proyecto en mente, escribime</Bracketed>
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
