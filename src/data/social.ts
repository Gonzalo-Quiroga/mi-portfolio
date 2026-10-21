import type { SocialLink } from "@/types/social";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Gonzalo-Quiroga" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gonzalo-quiroga-83165913a/",
  },
];

export const contactEmail = "gonzaloquiroga488@gmail.com";
export const whatsappHref = "https://wa.me/5493576476025";
/*
  El 9 va incluido, igual que en el CV y en el link de wa.me. Sin él, el número
  que se ve en pantalla no es discable desde el exterior: en Argentina el 9 es
  lo que marca que la línea es un celular.
*/
export const whatsappDisplay = "+54 9 3576 476025";
export const cvHref = "/cv/CV_Gonzalo_Quiroga.pdf";
