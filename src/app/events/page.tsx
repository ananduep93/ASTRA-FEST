import { Metadata } from "next";
import { EventsCatalogClient } from "./events-client";

export const metadata: Metadata = {
  title: "15 Arenas & Competitions | ASTRA 2K27",
  description:
    "Explore all 15 competitive arenas at ASTRA 2K27, Don Bosco College Mampetta. Stage, Tech, Gaming, Media, and Management events with live seat status.",
  openGraph: {
    title: "15 Arenas & Competitions | ASTRA 2K27",
    description:
      "Explore all 15 competitive arenas at ASTRA 2K27, Don Bosco College Mampetta. Register now before seats fill up.",
    images: ["/og-image.jpg"],
  },
};

export default function EventsPage() {
  return <EventsCatalogClient />;
}
