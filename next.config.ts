import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Next 16 solo sirve las calidades declaradas acá (por defecto, solo 75) y
      cae silenciosamente a 75 para cualquier otra: sin esto, el `quality={90}`
      de la foto de Sobre Mí se ignora sin ningún error visible. 90 es para esa
      foto, que es el único JPEG grande del sitio; 75 se mantiene para el resto.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
