import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio A by Nancy",
    short_name: "Studio A",
    description:
      "Bespoke interior design - residential and commercial - concierge from concept to installation.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#F7F4EE",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
