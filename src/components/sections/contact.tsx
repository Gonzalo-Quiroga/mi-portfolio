import { Reveal } from "@/components/motion/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
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
            <SectionEyebrow index="04" title="Contacto" />
            <p className="text-3xl leading-tight font-medium tracking-[-0.03em] text-balance sm:text-4xl">
              ¿Tenés un proyecto en mente?
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

            <div className="mt-2 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center justify-center rounded-md border border-border px-3.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-muted-foreground/40 hover:text-foreground"
                >
                  {social.label}
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
