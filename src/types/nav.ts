export interface NavLink {
  label: string;
  href: string;
  /**
   * Destaca el ítem en el header: corchetes y color pleno en vez de gris. Uno
   * solo por nav — si se destacan dos, no se destaca ninguno.
   */
  emphasis?: boolean;
}
