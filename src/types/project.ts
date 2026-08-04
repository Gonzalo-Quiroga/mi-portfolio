export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Ruta en /public, null mientras no haya captura definitiva. */
  image: string | null;
  tech: string[];
  /** Año de entrega, cuatro dígitos. Ordena y fecha el índice de proyectos. */
  year: string;
}
