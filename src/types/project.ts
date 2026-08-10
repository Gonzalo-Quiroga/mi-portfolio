export interface Project {
  id: string;
  title: string;
  /**
   * El "Asociado con" de LinkedIn: bajo qué figura se hizo el trabajo.
   * Distingue el trabajo de agencia del freelance, que es información que les
   * sirve a los dos públicos del sitio — el reclutador ve experiencia
   * profesional, el cliente ve que toma proyectos por su cuenta.
   */
  client: string;
  description: string;
  /**
   * Link al producto en producción. `null` cuando no hay acceso público
   * (sistemas de gestión detrás de login, sitios de uso interno del cliente).
   * Una fila sin `href` no se renderiza como link: no hay links muertos.
   */
  href: string | null;
  /**
   * Repo público, solo para proyectos propios. Es `null` en todo el trabajo de
   * cliente y de Cloudnet, y eso no es un hueco a tapar: el código es del
   * cliente, publicarlo sería incumplir contrato. La sección lo declara una
   * vez en su nota, en vez de repetir "privado" en once filas.
   */
  repo: string | null;
  /** Ruta en /public/proyectos, null mientras no haya captura definitiva. */
  image: string | null;
  /**
   * Qué tipo de imagen es, que decide cómo se la enmarca:
   *
   * - `screenshot`: captura de navegador a sangre y opaca. Llena el cuadro.
   * - `mockup`: dispositivo sobre fondo transparente. Necesita el campo
   *   `mockup-field` por detrás, o queda flotando sobre el gris plano del
   *   contenedor mientras las capturas llenan el suyo.
   *
   * Es un campo propio y no se deriva de `href === null` aunque hoy coincida:
   * que un sistema privado se publique mañana no debería cambiar cómo se
   * enmarca su imagen.
   */
  imageKind: "screenshot" | "mockup";
  /**
   * Tecnologías del proyecto. Es registro histórico de lo que ese trabajo usó,
   * no la lista de lo que se ofrece hoy — por eso acá sí aparecen Bootstrap o
   * jQuery, que quedaron deliberadamente fuera de `data/skills.ts`.
   */
  tech: string[];
}

/*
  Sin `year`, por decisión del usuario (2026-08-07). La referencia fecha su
  índice (`design-referencia-estilo.md` §6.1: NOMBRE | ROL | AÑO), pero una
  columna con once guiones comunica menos que no tenerla: el campo se saca en
  vez de quedar vacío. El rol de columna de metadata lo cumple el "Asociado
  con", que además varía entre filas.
*/
