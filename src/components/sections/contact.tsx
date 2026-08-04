import { Reveal } from "@/components/motion/reveal";
import { Bracketed, Marker } from "@/components/ui/section-header";
import {
  contactEmail,
  cvHref,
  socialLinks,
  whatsappDisplay,
  whatsappHref,
} from "@/data/social";

import { ContactForm } from "./contact-form";

const contactLinks = [
  { label: "Email", value: contactEmail, href: `mailto:${contactEmail}` },
  { label: "WhatsApp", value: whatsappDisplay, href: whatsappHref },
  { label: "CV", value: "Descargar PDF ↓", href: cvHref },
];

export function Contact() {
  return (
    <section
      id="contacto"
      className="hairline-top relative bg-background-2"
    >
      <div className="mx-auto max-w-340 px-6 py-20 sm:px-8 lg:py-30">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Marker />
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                04
              </span>
              <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Contacto
              </h2>
            </div>
            {/*
              Cierre grande, como el "LET'S CREATE SOMETHING MEANINGFUL" de la
              referencia: la última sección merece el mismo peso tipográfico
              que el hero, no el de un subtítulo (§3.1).
            */}
            <p className="text-[clamp(2rem,4.6vw,3.5rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance uppercase">
              ¿Tenés un proyecto
              <br />
              en mente?
            </p>
            <p className="max-w-105 text-base leading-relaxed font-light text-muted-foreground text-pretty">
              Contame qué necesitás y te respondo con una propuesta clara:
              alcance, tiempos y cómo lo llevo a producción.
            </p>

            <div className="mt-4 flex flex-col border-t border-border">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    {link.label}
                  </span>
                  <span className="text-[15px]">{link.value}</span>
                </a>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center justify-center font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  <Bracketed>{social.label}</Bracketed>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
