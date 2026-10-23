import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_PROGRAMS } from "@/data/events.mock";
import { FEST_CONFIG } from "@/config/fest.config";
import { EventDetailClient } from "./event-detail-client";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return MOCK_PROGRAMS.map((prog) => ({
    slug: prog.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const prog = MOCK_PROGRAMS.find((p) => p.slug === params.slug);
  if (!prog) {
    return {
      title: "Event Not Found | ASTRA 2K27",
    };
  }

  return {
    title: `${prog.name} — Rules, Prizes & Registration | ASTRA 2K27`,
    description: `${prog.tagline}. Prize Pool: ${prog.prize}. Held at ${prog.venue}, Don Bosco College Mampetta. Register now.`,
    openGraph: {
      title: `${prog.name} | ASTRA 2K27`,
      description: prog.tagline,
      images: [prog.image],
    },
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const prog = MOCK_PROGRAMS.find((p) => p.slug === params.slug);

  if (!prog) {
    notFound();
  }

  // JSON-LD Structured Data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${prog.name} - ASTRA 2K27`,
    description: prog.description,
    startDate: FEST_CONFIG.festDate,
    endDate: FEST_CONFIG.festDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${prog.venue}, Don Bosco College Mampetta`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mampetta, Mukkam",
        addressLocality: "Kozhikode",
        addressRegion: "Kerala",
        postalCode: "673602",
        addressCountry: "IN",
      },
    },
    image: [prog.image],
    offers: {
      "@type": "Offer",
      price: prog.fee.toString(),
      priceCurrency: "INR",
      availability:
        prog.seatsStatus === "Full"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      url: `https://astrafest.live/events/${prog.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: "Don Bosco College Mampetta",
      url: "https://astrafest.live",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetailClient program={prog} />
    </>
  );
}
