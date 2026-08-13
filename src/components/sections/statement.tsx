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
 * La frase sale del "Acerca de" aprobado (`linkedin-notes.md`), donde va como
 * párrafo de fondo, y conserva su estructura y su voz. Tres retoques, todos
 * del 2026-08-13 y todos por lo mismo — que acá el texto va a 2.35rem y cada
 * palabra se lee sola, mientras que en LinkedIn se diluye en el párrafo:
 *
 * 1. Se cae "y reparación de equipos informáticos". No por falsa — es
 *    experiencia real y sigue en el CV y en LinkedIn — sino porque a tamaño de
 *    titular compite con el rol en vez de sumarle, y ningún proyecto ni
 *    habilidad del sitio la sostiene.
 * 2. "Complemento mi perfil técnico con" pasa a "Al desarrollo le sumo": el
 *    original es lenguaje de formulario y gastaba cuatro palabras de trámite
 *    antes de llegar al contenido.
 * 3. "Resolución práctica de problemas" pasa a "un resultado que llega a
 *    producción". Esa tercera pata la sostenía la reparación de equipos; al
 *    sacarla quedaba sin respaldo en ningún lado del sitio. El reemplazo sí lo
 *    tiene: el despliegue continuo en Azure que detalla Sobre Mí.
 *
 * El diseño de interfaces, en cambio, sí tiene respaldo a la vista: en seis de
 * los once proyectos de `data/projects.ts` el aporte declarado lo incluye.
 *
 * Se probaron cuatro reescrituras completas y se volvió a esta, que es la que
 * el usuario reconoce como propia. Quedan anotadas para no repetirlas:
 * "diseño la interfaz y después la construyo", "un proyecto de punta a punta
 * con un solo interlocutor", "llevo cada proyecto de punta a punta" y
 * "construyo productos digitales completos". El reparo sobre las tres últimas
 * era el mismo: sonaban a agencia, no a él.
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
            Al desarrollo le sumo el diseño de interfaces.{" "}
            <span className="text-muted-foreground">
              Eso me da una mirada integral: funcionalidad, experiencia de
              usuario y un resultado que llega a producción.
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
