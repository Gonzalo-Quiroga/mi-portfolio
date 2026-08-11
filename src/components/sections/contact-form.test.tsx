import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("envía los datos del formulario y muestra el mensaje de éxito", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nombre"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Mensaje"),
      "Quiero charlar sobre un proyecto.",
    );
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        // `website` es el honeypot: una persona lo deja vacío siempre.
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          subject: "",
          message: "Quiero charlar sobre un proyecto.",
          website: "",
        }),
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByText("Mensaje enviado. Te respondo a la brevedad."),
      ).toBeInTheDocument(),
    );
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
  });

  it("muestra el error del servidor cuando el envío falla", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "El formulario no está disponible en este momento." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nombre"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Mensaje"), "Hola.");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() =>
      expect(
        screen.getByText("El formulario no está disponible en este momento."),
      ).toBeInTheDocument(),
    );
    // Con error no se limpia el formulario, para que el usuario no pierda lo escrito.
    expect(screen.getByLabelText("Nombre")).toHaveValue("Ada Lovelace");
  });
});
