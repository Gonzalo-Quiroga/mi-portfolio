import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteDomain } from "@/lib/site";

/**
 * Tarjeta que ven LinkedIn, WhatsApp o cualquier cliente al compartir el link.
 *
 * Se genera en build (`force-static`), no por request: el contenido es fijo, y
 * así la lectura de las fuentes ocurre donde los archivos seguro existen, sin
 * depender del sistema de archivos en runtime.
 *
 * Se descartó usar una captura del sitio. En el feed de LinkedIn la tarjeta se
 * renderiza a ~552px de ancho, poco más de un cuarto del viewport capturado:
 * a esa escala el párrafo de apoyo y la línea de metadata del hero caen a ~3px
 * y quedan ilegibles, el nav se lee como ruido, y el aire del hero —que a
 * pantalla completa es lo que le da presencia— se convierte en 60% de negro
 * vacío que en un feed claro se percibe como imagen rota.
 *
 * Esta composición dice lo mismo pero dimensionada para 1200x630: tipografía
 * pensada para leerse a un cuarto de tamaño, el nombre presente (en la captura
 * solo aparecía diminuto en el header) y el dominio, que es lo que convierte
 * la tarjeta en algo accionable.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Gonzalo Quiroga — Desarrollador Full Stack. React, Next.js y TypeScript.";
export const dynamic = "force-static";

const BG = "#0a0a0a"; // --background
const FG = "#fafafa"; // --foreground
const MUTED = "#b4b4b8"; // --muted-foreground
const BORDER = "#3a3a3d"; // --border, un punto más claro: a 1px sobre PNG se pierde
const A1 = "#06fcee"; // --a1

/** Marca de esquina: ángulo abierto, el mismo recurso que usa el sitio. */
function Corner({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 44,
        height: 44,
        borderColor: BORDER,
        ...style,
      }}
    />
  );
}

export default async function Image() {
  const [sans, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/geist-sans-500.woff")),
    readFile(join(process.cwd(), "src/assets/fonts/geist-mono-400.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: BG,
          fontFamily: "Geist",
        }}
      >
        {/*
          Halo del acento, muy tenue y arriba al centro: es el mismo recurso de
          "el acento emite, no pinta" del hero. Le saca a la tarjeta el aspecto
          de rectángulo negro plano sin agregar un bloque de color.
        */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 600,
            height: 520,
            borderRadius: 600,
            background: "rgba(6, 252, 238, 0.10)",
            filter: "blur(90px)",
          }}
        />

        <Corner style={{ top: 40, left: 40, borderTop: "1px solid", borderLeft: "1px solid" }} />
        <Corner style={{ top: 40, right: 40, borderTop: "1px solid", borderRight: "1px solid" }} />
        <Corner style={{ bottom: 40, left: 40, borderBottom: "1px solid", borderLeft: "1px solid" }} />
        <Corner style={{ bottom: 40, right: 40, borderBottom: "1px solid", borderRight: "1px solid" }} />

        {/* Nombre, en registro micro con marcador — el mismo patrón del sitio. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Geist Mono",
            fontSize: 25,
            letterSpacing: 4,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 7, height: 7, background: MUTED }} />
          <div style={{ width: 7, height: 7, background: MUTED }} />
          <div style={{ marginLeft: 6 }}>Gonzalo Quiroga</div>
        </div>

        {/* Titular: el mismo que el h1 del sitio. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 30,
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: -3.5,
            color: FG,
            textTransform: "uppercase",
          }}
        >
          <div>Desarrollador</div>
          <div>Full Stack</div>
        </div>

        {/* Hairline con el centro encendido: recurso del sistema. */}
        <div
          style={{
            display: "flex",
            width: 320,
            height: 1,
            marginTop: 48,
            background: `linear-gradient(90deg, transparent, ${A1}, transparent)`,
            opacity: 0.55,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Geist Mono",
            fontSize: 25,
            letterSpacing: 3.5,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          React · Next.js · TypeScript · Supabase
        </div>

        {/* El dominio es lo que vuelve la tarjeta accionable. */}
        <div
          style={{
            position: "absolute",
            bottom: 62,
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 21,
            letterSpacing: 3,
            color: "#7c7c80",
            textTransform: "uppercase",
          }}
        >
          {siteDomain}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
