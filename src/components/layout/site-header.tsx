"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { navLinks } from "@/data/nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/72 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-340 items-center justify-between px-6 sm:px-8">
        <Link
          href="#home"
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/gq-mark.png"
            alt=""
            width={22}
            height={22}
            className="shrink-0"
          />
          Gonzalo Quiroga
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:bg-foreground/4 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="ml-3 rounded-md border border-border bg-foreground/3 px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-[background-color,border-color,box-shadow] hover:glow-a1 hover:border-a1-line hover:bg-foreground/[0.07]"
          >
            Hablemos
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border sm:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-foreground transition-transform ${open ? "top-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-4 bg-foreground transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-foreground transition-transform ${open ? "top-1/2 -rotate-45" : "top-3.25"}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-border px-6 py-3 sm:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:bg-foreground/4 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md border border-border bg-foreground/3 px-3.5 py-2.5 text-center font-mono text-[12px] tracking-[0.14em] uppercase"
          >
            Hablemos
          </Link>
        </div>
      )}
    </header>
  );
}
