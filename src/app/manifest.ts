import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASTRA 2K27 | Don Bosco College Mampetta",
    short_name: "ASTRA 2K27",
    description:
      "Official website of ASTRA 2K27, the National Inter-College Youth Conclave at Don Bosco College Mampetta, Kozhikode.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#FF4D00",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
