import Image from "next/image";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-top relative overflow-hidden">
      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-4 px-6 pt-9 pb-4 sm:px-8">
        <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          <Image src="/brand/gq-mark.png" alt="" width={14} height={14} className="opacity-70" />
          © {year} Gonzalo Quiroga
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          Next.js · TypeScript · Tailwind CSS · shadcn/ui
        </span>
      </div>

      {/*
        Firma de cierre (design-referencia-estilo.md §8.1 punto 7): el nombre
        en tipografía gigante, sangrado por el borde inferior. Va como texto y
        no como el PNG del mark, que es de 22px y ampliado se pixelaría.

        Se descarta la deformación de la referencia (§8.3 punto 4): pide un
        asset dibujado a mano. Acá el recurso equivalente es el degradado a
        transparente, que disuelve el wordmark en la página en vez de
        apoyarlo encima.

        Decorativo: el nombre ya está en el header y en el copyright de
        arriba, así que queda fuera del árbol de accesibilidad.
      */}
      <div
        aria-hidden
        className="mx-auto max-w-340 px-6 select-none sm:px-8"
      >
        <p className="mb-[-0.19em] bg-linear-to-b from-foreground/14 to-transparent bg-clip-text text-center text-[clamp(2.5rem,12.5vw,10.5rem)] leading-[0.8] font-medium tracking-[-0.035em] text-transparent uppercase">
          Gonzalo Quiroga
        </p>
      </div>
    </footer>
  );
}
