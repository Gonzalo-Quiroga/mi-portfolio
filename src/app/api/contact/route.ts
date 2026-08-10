import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactEmail } from "@/data/social";

/**
 * Endpoint del formulario de contacto.
 *
 * Es el único punto de escritura del sitio, así que concentra toda la
 * superficie de abuso: sin control, cualquiera puede hacer POST en loop y
 * quemar la cuota de Resend, inundar la casilla o hacer que Resend marque la
 * cuenta. Las defensas de acá van en ese orden de importancia.
 */

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: ver HONEYPOT_FIELD. */
  website?: unknown;
}

/**
 * Campo trampa. Está oculto en el formulario, así que una persona nunca lo
 * completa; los bots que rellenan todos los inputs, sí. Si viene con algo, se
 * responde 200 como si se hubiera enviado: devolver un error le diría al bot
 * qué ajustar.
 */
const HONEYPOT_FIELD = "website";

/** Topes de longitud. El de email es el máximo de la RFC 5321. */
const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 } as const;

/** Ventana de rate limit por IP. */
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 } as const;

/**
 * Registro en memoria de envíos por IP.
 *
 * Limitación conocida y aceptada: en serverless cada instancia tiene su propio
 * mapa y se pierde cuando la instancia se recicla, así que esto no frena un
 * ataque distribuido. Sí frena lo que realmente pasa en un sitio así — un
 * script casero en loop, un bot de formularios, o el doble clic de alguien
 * impaciente. Para algo más fuerte haría falta un store compartido (Vercel KV,
 * Upstash), que es infraestructura extra difícil de justificar acá.
 */
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "desconocida";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const since = now - RATE_LIMIT.windowMs;

  // Purga entradas viejas de todas las IPs: sin esto el mapa crece sin techo.
  for (const [key, times] of hits) {
    const vigentes = times.filter((t) => t > since);
    if (vigentes.length === 0) hits.delete(key);
    else hits.set(key, vigentes);
  }

  const times = hits.get(ip) ?? [];
  if (times.length >= RATE_LIMIT.max) return true;

  hits.set(ip, [...times, now]);
  return false;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Quita saltos de línea. `name` y `subject` terminan dentro del asunto del
 * mail: un `\r\n` ahí es el vector clásico de inyección de encabezados. Resend
 * recibe JSON y muy probablemente ya lo sanitice, pero no cuesta nada no
 * depender de eso.
 */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function readField(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados envíos seguidos. Probá de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  // Honeypot: se corta acá, sin gastar una llamada a Resend.
  if (readField(body?.[HONEYPOT_FIELD], 1)) {
    return NextResponse.json({ ok: true });
  }

  const name = singleLine(readField(body?.name, LIMITS.name));
  const email = readField(body?.email, LIMITS.email);
  const subject = singleLine(readField(body?.subject, LIMITS.subject));
  const message = readField(body?.message, LIMITS.message);

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Completá nombre, un email válido y un mensaje." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    return NextResponse.json(
      { error: "El formulario no está disponible en este momento." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    /*
      `onboarding@resend.dev` es el remitente de prueba de Resend: cae en spam
      seguido y solo permite enviar al dueño de la cuenta. Cuando el dominio
      propio esté verificado en Resend, basta con setear CONTACT_FROM.
    */
    from:
      process.env.CONTACT_FROM ??
      "Portfolio Gonzalo Quiroga <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: subject ? `Portfolio: ${subject}` : `Nuevo mensaje de ${name}`,
    text: `De: ${name} <${email}>\nAsunto: ${subject || "(sin asunto)"}\n\n${message}`,
  });

  if (error) {
    console.error("Error enviando email con Resend:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Probá de nuevo en un momento." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
