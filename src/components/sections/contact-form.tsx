"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "No se pudo enviar el mensaje.");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo enviar el mensaje. Revisá tu conexión.");
    }
  }

  const note =
    status === "success"
      ? "Mensaje enviado. Te respondo a la brevedad."
      : status === "error"
        ? errorMessage
        : "Respondo en menos de 24 h.";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4.5 rounded-lg border border-border bg-card p-7"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.75">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Nombre</span>
          <input
            type="text"
            required
            placeholder="Tu nombre"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-9.5 rounded-md border border-border bg-foreground/2 px-2.75 text-sm outline-none focus:border-accent focus:bg-foreground/4"
          />
        </label>
        <label className="flex flex-col gap-1.75">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Email</span>
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-9.5 rounded-md border border-border bg-foreground/2 px-2.75 text-sm outline-none focus:border-accent focus:bg-foreground/4"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.75">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Asunto</span>
        <input
          type="text"
          placeholder="Sitio web, aplicación, consultoría…"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="h-9.5 rounded-md border border-border bg-foreground/2 px-2.75 text-sm outline-none focus:border-accent focus:bg-foreground/4"
        />
      </label>
      <label className="flex flex-col gap-1.75">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Mensaje</span>
        <textarea
          rows={5}
          required
          placeholder="Contame brevemente el proyecto y los plazos."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="resize-y rounded-md border border-border bg-foreground/2 px-2.75 py-2.5 font-sans text-sm leading-relaxed outline-none focus:border-accent focus:bg-foreground/4"
        />
      </label>
      <div className="mt-0.5 flex items-center justify-between gap-4">
        <span
          role="status"
          aria-live="polite"
          className={`font-mono text-[10.5px] tracking-[0.14em] uppercase ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}
        >
          {note}
        </span>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-10 shrink-0 rounded-md bg-foreground px-5 text-sm font-medium whitespace-nowrap text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}
