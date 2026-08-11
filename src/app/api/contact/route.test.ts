import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Tests del endpoint de contacto, centrados en las defensas contra abuso: son
 * la lógica del sitio donde una regresión no se nota mirando la pantalla.
 *
 * El rate limit vive en un módulo con estado, así que cada test hace
 * `resetModules` y reimporta para arrancar con el contador limpio.
 */

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

/** Cada llamada usa una IP distinta para no chocar con el rate limit. */
let ipSeq = 0;
function post(body: unknown, ip = `10.0.0.${++ipSeq}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valido = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Quiero charlar sobre un proyecto.",
};

async function loadRoute() {
  vi.resetModules();
  return (await import("./route")).POST;
}

beforeEach(() => {
  send.mockReset().mockResolvedValue({ error: null });
  vi.stubEnv("RESEND_API_KEY", "test-key");
  // Sin CONTACT_FROM el endpoint avisa por consola; se silencia salvo donde
  // el aviso es justamente lo que se está probando.
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("envía el mail cuando los datos son válidos", async () => {
    const POST = await loadRoute();
    const res = await POST(post(valido));

    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
  });

  it("descarta el envío si el honeypot viene completo, sin delatar el motivo", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...valido, website: "http://spam.example" }));

    // 200 a propósito: un error le diría al bot qué campo ajustar.
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("corta al cuarto envío desde la misma IP", async () => {
    const POST = await loadRoute();
    const ip = "203.0.113.7";

    for (let i = 0; i < 3; i++) {
      expect((await POST(post(valido, ip))).status).toBe(200);
    }

    const res = await POST(post(valido, ip));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("600");
    expect(send).toHaveBeenCalledTimes(3);
  });

  it("no mezcla el contador entre IPs distintas", async () => {
    const POST = await loadRoute();

    for (let i = 0; i < 3; i++) await POST(post(valido, "198.51.100.1"));
    const otra = await POST(post(valido, "198.51.100.2"));

    expect(otra.status).toBe(200);
  });

  it("recorta los campos largos en vez de reenviarlos enteros", async () => {
    const POST = await loadRoute();
    await POST(post({ ...valido, message: "x".repeat(9000) }));

    const { text } = send.mock.calls[0]![0];
    expect(text).toContain("x".repeat(5000));
    expect(text).not.toContain("x".repeat(5001));
  });

  it("aplana los saltos de línea del asunto, que van al header del mail", async () => {
    const POST = await loadRoute();
    await POST(post({ ...valido, subject: "Hola\r\nBcc: victima@example.com" }));

    const { subject } = send.mock.calls[0]![0];
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toBe("Portfolio: Hola Bcc: victima@example.com");
  });

  it("avisa en los logs cuando cae al remitente de prueba de Resend", async () => {
    const POST = await loadRoute();
    await POST(post(valido));

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("CONTACT_FROM no está configurada"),
    );
    expect(send.mock.calls[0]![0].from).toContain("onboarding@resend.dev");
  });

  it("usa CONTACT_FROM cuando está definida, sin avisar", async () => {
    vi.stubEnv("CONTACT_FROM", "Portfolio <hola@ejemplo.dev>");
    const POST = await loadRoute();
    await POST(post(valido));

    expect(send.mock.calls[0]![0].from).toBe("Portfolio <hola@ejemplo.dev>");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("rechaza email con formato inválido", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...valido, email: "no-es-un-email" }));

    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("no expone la falta de API key como detalle al cliente", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const POST = await loadRoute();

    const res = await POST(post(valido));
    const body = (await res.json()) as { error: string };

    expect(res.status).toBe(500);
    expect(body.error).not.toMatch(/RESEND|key/i);
    errorSpy.mockRestore();
  });
});
