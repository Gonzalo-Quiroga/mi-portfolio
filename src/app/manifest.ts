import type { MetadataRoute } from "next";

import { siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Gonzalo Quiroga",
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
