import Image from "next/image";
import Link from "next/link";

import { navLinks } from "@/data/nav";
import { contactEmail, cvHref, socialLinks } from "@/data/social";
import { Bracketed } from "@/components/ui/section-header";

const directLinks = [
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "Descargar CV", href: cvHref },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-top relative overflow-hidden">
      {/*
        Columnas de links en corchetes, como el cierre de la referencia (§6.4):
        la navegación completa vuelve a estar disponible al final del scroll,
        sin que el usuario tenga que subir al header.
      */}
      <div className="mx-auto grid max-w-340 grid-cols-2 gap-x-8 gap-y-10 px-6 pt-16 pb-12 sm:grid-cols-3 sm:px-8 lg:pt-20">
        <nav className="flex flex-col gap-3" aria-label="Secciones">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>{link.label}</Bracketed>
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3" aria-label="Redes">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>{social.label}</Bracketed>
            </a>
          ))}
        </nav>

        <nav
          className="col-span-2 flex flex-col gap-3 sm:col-span-1"
          aria-label="Contacto directo"
        >
          {directLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-fit font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Bracketed>{link.label}</Bracketed>
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-4 border-t border-border px-6 pt-6 pb-4 sm:px-8">
        <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          <Image
            src="/brand/gq-mark.png"
            alt=""
            width={14}
            height={14}
            className="opacity-70"
          />
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
      <div aria-hidden className="mx-auto max-w-340 px-6 select-none sm:px-8">
        <p className="mb-[-0.19em] bg-linear-to-b from-foreground/14 to-transparent bg-clip-text text-center text-[clamp(2.5rem,12.5vw,10.5rem)] leading-[0.8] font-medium tracking-[-0.035em] text-transparent uppercase">
          Gonzalo Quiroga
        </p>
      </div>
    </footer>
  );
}
