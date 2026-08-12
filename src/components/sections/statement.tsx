import { Reveal } from "@/components/motion/reveal";
import { Marker } from "@/components/ui/section-header";

/**
 * Bloque de declaración a ancho completo, entre Sobre Mí y Habilidades.
 *
 * Es el recurso más fuerte de la referencia (design-referencia-estilo.md §3.3
 * y §5): texto centrado, grande, a dos tonos, con rieles de marcador en los
 * márgenes que acotan el ancho del bloque. Le da al scroll un momento de
 * respiro entre dos secciones densas.
 *
 * La frase no es nueva: sale del párrafo de Sobre Mí, donde estaba enterrada
 * entre otras tres. Promoverla a su propio bloque no agrega contenido, le da
 * el peso que ya merecía.
 *
 * "Y reparación de equipos informáticos" se había perdido al mover la frase.
 * Está en el "Acerca de" aprobado (`linkedin-notes.md`) y es lo que sostiene
 * "resolución práctica de problemas": sin eso, la segunda mitad de la oración
 * no tiene de dónde agarrarse.
 */
export function Statement() {
  return (
    <section className="hairline-top relative bg-background">
      {/*
        Los rieles de marcador se esconden en teléfono: entre los dos y sus
        gaps se llevaban 68px de los ~327 disponibles, más de un quinto de la
        medida, para acotar un bloque que ahí ya está acotado por la pantalla.
      */}
      <div className="mx-auto flex max-w-340 items-center gap-0 px-6 py-24 sm:gap-6 sm:px-8 lg:gap-12 lg:py-36">
        <span className="hidden sm:block">
          <Marker className="bg-muted-foreground/50" />
        </span>
        <Reveal className="flex-1">
          <p className="mx-auto max-w-215 text-center text-[clamp(1.35rem,2.9vw,2.35rem)] leading-[1.22] font-normal tracking-[-0.025em] text-balance">
            Complemento mi perfil técnico con diseño de interfaces y reparación
            de equipos informáticos.{" "}
            <span className="text-muted-foreground">
              Eso me da una mirada integral: funcionalidad, experiencia de
              usuario y resolución práctica de problemas.
            </span>
          </p>
        </Reveal>
        <span className="hidden sm:block">
          <Marker className="bg-muted-foreground/50" />
        </span>
      </div>
    </section>
  );
}
