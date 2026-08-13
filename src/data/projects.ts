import type { Project } from "@/types/project";

/**
 * Los once proyectos que el usuario seleccionó y ordenó para LinkedIn el
 * 2026-07-31 (ver `linkedin-notes.md`, sección Proyectos). Las descripciones
 * son las suyas, tal cual: mantienen la atribución honesta ("colaboré en",
 * "participé como uno de los principales desarrolladores", "junto al equipo")
 * que es justamente el criterio que rige todo el perfil. No reescribirlas para
 * que suenen más individuales de lo que fueron.
 *
 * El orden es el que eligió el usuario, no cronológico, y se mantiene a
 * propósito: queda `link, link, link · cinco sin link · link, link, link`, así
 * que hay salida al principio y al final y el bloque sin acceso público queda
 * contenido en el medio. Se evaluó agrupar las filas con link arriba y se
 * descartó — las cinco sin link son los sistemas de gestión, que son el
 * trabajo más fuerte; al fondo quedarían enterradas.
 *
 * Son once de más de veinte proyectos entregados: es una selección, y la
 * sección lo aclara al pie. No es la lista completa ni pretende serlo.
 *
 * `tech` lista solo aquello con lo que el usuario interactuó de primera mano,
 * no el stack completo de cada proyecto. Es registro histórico de ese trabajo,
 * no la lista de lo que ofrece hoy — por eso acá aparecen Material UI,
 * Syncfusion, Bootstrap y jQuery, que quedaron deliberadamente fuera de
 * `data/skills.ts` por ser legacy.
 *
 * Nombres normalizados al vocabulario del sitio ("React", no "React.js";
 * "CSS", no "Hojas de estilos en cascada").
 *
 * `image`: todas normalizadas a 1280x800 WebP (el 16:10 del thumbnail). El
 * material de origen venía en dos familias y se trató distinto cada una:
 *
 * - Los seis proyectos con link público son capturas de navegador a sangre y
 *   opacas: se recortan con `cover` anclado arriba, que conserva nav y hero.
 * - Los cinco sin link son mockups de dispositivo sobre fondo transparente:
 *   se recortan sus márgenes vacíos y se dejan con alfa. `imageKind: "mockup"`
 *   hace que el contenedor les ponga por detrás el campo `mockup-field` (ver
 *   globals.css) en vez del gris plano, así el dispositivo se apoya sobre una
 *   superficie propia y no queda flotando en un rectángulo vacío.
 *
 * Todas las listas de `tech` están confirmadas por el usuario. La de Cerco
 * Digital es la única que no se cruzó contra su repo: React y Redux Toolkit
 * salen de las aptitudes que él mismo etiquetó en LinkedIn, PWA de su
 * descripción, y Bootstrap lo confirmó aparte (2026-08-10). Si algún día se
 * abre ese repo, vale completarla.
 */
export const projects: Project[] = [
  {
    id: "cloudnet-solutions",
    title: "Cloudnet Solutions",
    client: "Cloudnet Solutions",
    description:
      "Desarrollé la web corporativa de Cloudnet Solutions de punta a punta, desde el diseño hasta la implementación.",
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
      "Desarrollé de cero el sitio web de Córdoba Outfitters, una empresa dedicada a la venta de experiencias de caza, con soporte multi-idioma.",
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
      "Sistema de gestión para inmobiliarias. Me encargué de la identidad visual y mejora del frontend.",
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
      "Co-desarrollé el frontend de un sistema de gestión para una empresa de logística y transporte, junto al equipo, enfocado en la base estructural y el diseño de interfaz.",
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
      "Socket.IO",
    ],
  },
  {
    id: "daguia-futbol",
    title: "DaGuia Fútbol",
    client: "Cloudnet Solutions",
    description:
      "Colaboré en el frontend de su web app de reservas, enfocado en la base estructural y el diseño de la experiencia para que los clientes puedan reservar desde el celular.",
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
      "Socket.IO",
      "Mercado Pago",
    ],
  },
  {
    id: "cerco-digital",
    title: "Cerco Digital",
    client: "Cloudnet Solutions",
    description:
      "Sistema de gestión pesquera para un cliente del sector. Me encargué del desarrollo web y la identidad visual, con soporte offline mediante funcionalidad de aplicación web progresiva (PWA).",
    href: null,
    repo: null,
    image: "/proyectos/cerco-digital.webp",
    imageKind: "mockup",
    tech: ["React", "Bootstrap", "Redux Toolkit", "PWA"],
  },
  {
    id: "alambres-tandil",
    title: "Alambres Tandil",
    client: "Cloudnet Solutions",
    description: "Desarrollé de cero el sitio web de Alambres Tandil.",
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
      "Participé como uno de los principales desarrolladores del frontend del sitio web de una agencia de viajes, con foco en la base estructural y el diseño.",
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
      "Desarrollé el sitio web de Jaspe, marca de alimentos para mascotas, a partir del diseño en Figma, incluyendo campañas mensuales con formularios para sorteos.",
    href: "https://jaspe-nutricion.com.ar",
    repo: null,
    image: "/proyectos/jaspe.webp",
    imageKind: "screenshot",
    tech: ["HTML5", "CSS", "Bootstrap", "JavaScript"],
  },
];
