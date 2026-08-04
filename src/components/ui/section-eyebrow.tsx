interface SectionEyebrowProps {
  /** Numeración de sección, dos dígitos: "01", "02"… */
  index: string;
  title: string;
}

/**
 * Etiqueta de sección en registro micro: marcador `▪ ▪`, número y título en
 * mayúsculas con tracking ancho (design-referencia-estilo.md §3.1 y §5).
 *
 * El marcador es el ornamento base del sistema y se repite en captions y
 * separadores; es decorativo, por eso queda fuera del árbol de accesibilidad.
 * El título sigue siendo el `h2` real de la sección: acá es chico a propósito,
 * el peso tipográfico lo lleva el statement que va debajo.
 */
export function SectionEyebrow({ index, title }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex items-center gap-1">
        <span className="block size-1 bg-muted-foreground" />
        <span className="block size-1 bg-muted-foreground" />
      </span>
      <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
        {index}
      </span>
      <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        {title}
      </h2>
    </div>
  );
}
