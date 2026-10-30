import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { skillCategories } from "@/data/skills";
import { contactEmail, socialLinks } from "@/data/social";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    /*
      `summary` renderiza una miniatura cuadrada chica al costado del texto y
      recorta la tarjeta de 1200x630 a un cuadrado ilegible. Con imagen propia
      corresponde `summary_large_image`, que la muestra completa y a lo ancho.
    */
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

/*
  Datos estructurados de Persona. Todo lo que va acá tiene que coincidir exacto
  con lo que dice el sitio y el resto del perfil (`linkedin-notes.md`): un
  jobTitle que no matchea la experiencia declarada es justamente el tipo de
  inconsistencia que Google penaliza y que un reclutador detecta al cruzar.

  `knowsAbout` es la lista curada de tecnologías con respaldo real en código
  propio; se lee de `skillCategories` para que no pueda desincronizarse de lo
  que muestra la sección de Habilidades.
*/
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gonzalo Quiroga",
  jobTitle: "Desarrollador Full Stack",
  description: siteDescription,
  url: siteUrl,
  email: `mailto:${contactEmail}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arroyito",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  worksFor: {
    "@type": "Organization",
    name: "Cloudnet Solutions",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Instituto Superior Politécnico Córdoba (ISPC)",
  },
  knowsAbout: skillCategories.flatMap((category) => category.skills),
  sameAs: socialLinks.map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
