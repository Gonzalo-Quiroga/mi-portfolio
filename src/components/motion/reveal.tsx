"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay del stagger, en segundos. */
  delay?: number;
  className?: string;
}

/**
 * Rise-in 14px / 700ms del sistema visual del handoff, disparado al entrar
 * en viewport (una sola vez). Sin movimiento si el usuario pidió reduced motion.
 *
 * Siempre se renderiza el mismo `motion.div`, también con reduced motion: lo
 * único que cambia es la transición, que pasa a ser instantánea. Antes, con
 * reduced motion se devolvía un `<div>` plano, y eso rompía la hidratación:
 * en el servidor `useReducedMotion()` no conoce la preferencia y renderiza el
 * `motion.div` con `opacity: 0` del estado inicial; en el cliente salía el
 * `<div>` sin animación, React detectaba el desajuste de atributos y no lo
 * corregía, así que el `opacity: 0` del servidor quedaba pegado y el contenido
 * podía no verse justo para quien pidió menos movimiento (2026-10-20).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
