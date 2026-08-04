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
 */
export function Statement() {
  return (
    <section className="hairline-top relative bg-background">
      <div className="mx-auto flex max-w-340 items-center gap-6 px-6 py-24 sm:px-8 lg:gap-12 lg:py-36">
        <Marker className="bg-muted-foreground/50" />
        <Reveal className="flex-1">
          <p className="mx-auto max-w-215 text-center text-[clamp(1.35rem,2.9vw,2.35rem)] leading-[1.22] font-normal tracking-[-0.025em] text-balance">
            Complemento mi perfil técnico con diseño de interfaces.{" "}
            <span className="text-muted-foreground">
              Eso me da una mirada integral: funcionalidad, experiencia de
              usuario y resolución práctica de problemas.
            </span>
          </p>
        </Reveal>
        <Marker className="bg-muted-foreground/50" />
      </div>
    </section>
  );
}
