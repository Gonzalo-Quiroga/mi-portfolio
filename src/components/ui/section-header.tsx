import type { ReactNode } from "react";

/** Marcador `▪ ▪`, ornamento base del sistema (§5). Decorativo. */
export function Marker({ className = "bg-muted-foreground" }: { className?: string }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center gap-1">
      <span className={`block size-1 ${className}`} />
      <span className={`block size-1 ${className}`} />
    </span>
  );
}

/**
 * Corchetes como affordance de link, en lugar de un botón con fondo (§5, §8.2
 * punto 1). Es el detalle más característico de la referencia y el que más
 * barato resulta portar.
 */
export function Bracketed({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden className="text-muted-foreground/55">
        [
      </span>
      {children}
      <span aria-hidden className="text-muted-foreground/55">
        ]
      </span>
    </>
  );
}

interface SectionHeaderProps {
  /** Numeración de sección, dos dígitos. */
  index: string;
  /** Nombre de la sección, va grande y en mayúsculas. */
  title: string;
  /** Frase de apertura, en la columna derecha. */
  statement?: ReactNode;
  /** Contenido opcional bajo el statement (links, metadata). */
  aside?: ReactNode;
}

/**
 * Cabecera de sección asimétrica (design-referencia-estilo.md §4): etiqueta
 * micro y título grande en las columnas 1-4, statement en las 6-12, con la
 * columna 5 vacía a propósito. El vacío entre ambas es lo que da la sensación
 * de composición deliberada que el layout centrado anterior no tenía.
 */
export function SectionHeader({
  index,
  title,
  statement,
  aside,
}: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-7 lg:grid-cols-12">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <div className="flex items-center gap-3">
          <Marker />
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {index}
          </span>
        </div>
        <h2 className="text-[clamp(1.75rem,3.1vw,2.6rem)] leading-[0.94] font-medium tracking-[-0.025em] uppercase">
          {title}
        </h2>
      </div>

      {statement && (
        <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
          {statement}
          {aside}
        </div>
      )}
    </div>
  );
}
