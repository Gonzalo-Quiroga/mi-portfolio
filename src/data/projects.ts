import type { Project } from "@/types/project";

/**
 * Los once proyectos que el usuario seleccionó y ordenó para LinkedIn el
 * 2026-07-31 (ver `linkedin-notes.md`, sección Proyectos), más dos sumados el
 * 2026-10-20: el sistema de leads con IA y Gastly. Las descripciones mantienen
 * la atribución honesta ("junto al equipo", "en un equipo de tres") que es
 * justamente el criterio que rige todo el perfil. No reescribirlas para que
 * suenen más individuales de lo que fueron.
 *
 * La atribución de cada descripción se cotejó contra el historial de git de
 * su repo: lo que dice cada fila es lo que muestran los commits. Cuando el
 * trabajo fue compartido, la descripción lo dice.
 *
 * El orden es el que eligió el usuario, no cronológico, y se mantiene a
 * propósito: queda `link, link, link · siete sin link · link, link, link`, así
 * que hay salida al principio y al final y el bloque sin acceso público queda
 * contenido en el medio. Los dos sumados van intercalados dentro de ese bloque
 * (Gastly antes de DataCrops, el de leads antes de Manisel), también por
 * elección del usuario.
 *
 * Son trece de más de veinte proyectos entregados: es una selección, y la
 * sección lo aclara al pie. No es la lista completa ni pretende serlo.
 *
 * `tech` lista solo aquello con lo que el usuario interactuó de primera mano,
 * no el stack completo de cada proyecto. Es registro histórico de ese trabajo,
 * no la lista de lo que ofrece hoy — por eso acá aparecen Material UI,
 * Bootstrap y jQuery, que quedaron deliberadamente fuera de `data/skills.ts`.
 *
 * Nombres normalizados al vocabulario del sitio ("React", no "React.js";
 * "CSS", no "Hojas de estilos en cascada").
 *
 * `image`: todas normalizadas a 1280x800 WebP (el 16:10 del thumbnail). El
 * material de origen venía en dos familias y se trató distinto cada una:
 *
 * - Los seis proyectos con link público son capturas de navegador a sangre y
 *   opacas: se recortan con `cover` anclado arriba, que conserva nav y hero.
 * - Los cinco sistemas de cliente sin link son mockups de dispositivo sobre
 *   fondo transparente: se recortan sus márgenes vacíos y se dejan con alfa.
 *   `imageKind: "mockup"` hace que el contenedor les ponga por detrás el campo
 *   `mockup-field` (ver globals.css) en vez del gris plano.
 *
 * Los dos sumados el 2026-10-20 siguen las mismas dos familias:
 * - Gastly es un mockup de teléfono con los datos de ejemplo del repo. Al ser
 *   vertical, se centra con alfa en el 16:10 en vez de llenarlo.
 * - El sistema de leads muestra solo el formulario público de captación, sin
 *   el panel: así no aparece ningún dato de prospectos. Cloudnet autorizó
 *   publicarla.
 */
export const projects: Project[] = [
  {
    id: "cloudnet-solutions",
    title: "Cloudnet Solutions",
    client: "Cloudnet Solutions",
    description:
      "Propuse la web corporativa de Cloudnet Solutions y la diseñé completa. El desarrollo lo compartí con el equipo.",
    href: "https://cloudnetsolutions.com.ar",
    repo: null,
    image: "/proyectos/cloudnet-solutions.webp",
    imageKind: "screenshot",
    tech: ["Astro", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vite"],
  },
  {
    id: "cordoba-outfitters",
    title: "Córdoba Outfitters",
    client: "Freelance",
    description:
      "Desarrollé de cero, en español, inglés e italiano, el sitio de Córdoba Outfitters, una empresa que vende experiencias de caza. En sus dos primeras semanas lo visitaron 202 personas de 23 países.",
    href: "https://cordobaoutfitters.com",
    repo: null,
    image: "/proyectos/cordoba-outfitters.webp",
    imageKind: "screenshot",
    tech: ["Astro", "React", "Tailwind CSS", "Vercel", "Resend"],
  },
  {
    id: "domexa",
    title: "Domexa",
    client: "Cloudnet Solutions",
    description:
      "Sistema de gestión para inmobiliarias. Definí la identidad visual completa a partir del logo del cliente y mejoré el frontend, incluidos los paneles de propietario e inquilino.",
    href: "https://domexa.com.ar",
    repo: null,
    image: "/proyectos/domexa.webp",
    imageKind: "screenshot",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
    ],
  },
  {
    id: "up-logix",
    title: "Up Logix",
    client: "Cloudnet Solutions",
    description:
      "Junto al equipo, armé la base del frontend de un sistema de gestión para una empresa de logística y transporte, a partir de la plantilla interna, y resolví el responsive general.",
    href: null,
    repo: null,
    image: "/proyectos/up-logix.webp",
    imageKind: "mockup",
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Redux Toolkit",
    ],
  },
  {
    id: "gastly",
    title: "Gastly",
    client: "Proyecto propio",
    description:
      "App de gastos compartidos que diseñé y desarrollé por mi cuenta, terminada y en uso real: Row Level Security en Supabase, notificaciones push programadas, cierre de mes con un registro inmutable y tests con Vitest.",
    href: null,
    repo: null,
    image: "/proyectos/gastly.webp",
    imageKind: "mockup",
    tech: ["Next.js", "TypeScript", "Supabase", "PWA", "Vitest", "Vercel"],
  },
  {
    id: "datacrops",
    title: "DataCrops",
    client: "Cloudnet Solutions",
    description:
      "Me encargué de la base estructural del frontend de una aplicación para la gestión de campos agropecuarios, a partir del branding y diseño provistos por el cliente.",
    href: null,
    repo: null,
    image: "/proyectos/datacrops.webp",
    imageKind: "mockup",
    tech: [
      "React",
      "Tailwind CSS",
      "Material UI",
      "Syncfusion",
      "Redux Toolkit",
    ],
  },
  {
    id: "leads-ia",
    title: "Captación de leads con IA",
    client: "Cloudnet Solutions",
    description:
      "Idea propia: diseñé y construí la primera versión de un sistema que capta clientes potenciales, analiza su presencia digital con IA y los presenta en un panel. Lo documenté para el traspaso y la empresa lo adoptó para sus campañas.",
    href: null,
    repo: null,
    image: "/proyectos/leads-ia.webp",
    imageKind: "screenshot",
    tech: ["OpenAI API", "Supabase", "Deno", "TypeScript", "React"],
  },
  {
    id: "manisel",
    title: "Manisel",
    client: "Cloudnet Solutions",
    description:
      "Desarrollé la base estructural y el diseño visual del frontend de un sistema para registrar y controlar las visitas a una fábrica de maní, en colaboración con el equipo en las funcionalidades más complejas.",
    href: null,
    repo: null,
    image: "/proyectos/manisel.webp",
    imageKind: "mockup",
    tech: [
      "React",
      "Tailwind CSS",
      "Material UI",
      "Syncfusion",
      "Redux Toolkit",
      "TanStack Query",
    ],
  },
  {
    id: "daguia-futbol",
    title: "DaGuia Fútbol",
    client: "Cloudnet Solutions",
    description:
      "Colaboré en el frontend de la web app de reservas de DaGuia Fútbol, con foco en la base estructural y en una experiencia pensada para reservar desde el celular.",
    href: null,
    repo: null,
    image: "/proyectos/daguia-futbol.webp",
    imageKind: "mockup",
    tech: [
      "React",
      "Bootstrap",
      "Material UI",
      "Syncfusion",
      "Redux Toolkit",
      "TanStack Query",
    ],
  },
  {
    id: "cerco-digital",
    title: "Cerco Digital",
    client: "Cloudnet Solutions",
    description:
      "Sistema de gestión pesquera para un cliente del sector. Definí la identidad visual completa a partir del logo del cliente y desarrollé la landing y varios módulos del sistema.",
    href: null,
    repo: null,
    image: "/proyectos/cerco-digital.webp",
    imageKind: "mockup",
    tech: ["React", "Bootstrap", "Redux Toolkit"],
  },
  {
    id: "alambres-tandil",
    title: "Alambres Tandil",
    client: "Cloudnet Solutions",
    description:
      "Armé la estructura del sitio web de Alambres Tandil y desarrollé sus secciones principales y el responsive, en un equipo de tres.",
    href: "https://alambrestandil.com.ar",
    repo: null,
    image: "/proyectos/alambres-tandil.webp",
    imageKind: "screenshot",
    tech: ["React", "Bootstrap", "jQuery", "Vite"],
  },
  {
    id: "indah",
    title: "Indah",
    client: "Cloudnet Solutions",
    description:
      "Arranqué el frontend del sitio web de una agencia de viajes y fui su principal desarrollador, con foco en la base estructural y el diseño.",
    href: "https://www.indah.tur.ar",
    repo: null,
    image: "/proyectos/indah.webp",
    imageKind: "screenshot",
    tech: [
      "React",
      "Bootstrap",
      "Material UI",
      "Syncfusion",
      "Redux Toolkit",
    ],
  },
  {
    id: "jaspe",
    title: "Jaspe",
    client: "Cloudnet Solutions",
    description:
      "Desarrollé el sitio web de Jaspe, marca de alimentos para mascotas, a partir del diseño en Figma, y lo mantuve durante dos años y medio, con campañas mensuales y formularios para sorteos.",
    href: "https://jaspe-nutricion.com.ar",
    repo: null,
    image: "/proyectos/jaspe.webp",
    imageKind: "screenshot",
    tech: ["HTML5", "CSS", "Bootstrap", "JavaScript"],
  },
];
