import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactEmail } from "@/data/social";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

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
    from: "Portfolio Gonzalo Quiroga <onboarding@resend.dev>",
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
