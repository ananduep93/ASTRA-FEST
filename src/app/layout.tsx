import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import { FEST_CONFIG } from "@/config/fest.config";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF4D00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://astrafest.live"),
  title: {
    default: "ASTRA 2K27 | National Inter-College Youth Conclave | Don Bosco College Mampetta",
    template: "%s | ASTRA 2K27",
  },
  description:
    "Official portal of ASTRA 2K27, the premier one-day national inter-college fest of Don Bosco College Mampetta, Kozhikode. 15 competitive arenas across Stage, Tech, Media, and Management.",
  keywords: [
    "ASTRA 2K27",
    "ASTRA Fest",
    "Don Bosco College Mampetta",
    "Kozhikode College Fest",
    "Kerala Inter-college Fest",
    "Anandu EP",
    "Dance Battle",
    "Ramp Walk",
    "Battle of Bands",
    "BGMI Tournament",
    "Coding Competition",
  ],
  authors: [{ name: "ASTRA Technical Committee" }],
  creator: "Don Bosco College Mampetta",
  publisher: "Don Bosco College Mampetta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://astrafest.live",
    siteName: "ASTRA 2K27 Don Bosco Mampetta",
    title: "ASTRA 2K27 | National Inter-College Youth Conclave",
    description:
      "15 Competitive Arenas, ₹50K+ Prize Pool, 50+ Colleges. One Epic Day at Don Bosco College Mampetta, Kozhikode.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ASTRA 2K27 Don Bosco Mampetta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASTRA 2K27 | Don Bosco College Mampetta",
    description:
      "15 Competitive Arenas, ₹50K+ Prize Pool, 50+ Colleges. One Epic Day at Don Bosco College Mampetta.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Don Bosco College, Mampetta",
    url: "https://astrafest.live",
    logo: "https://astrafest.live/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mampetta, Mukkam",
      addressLocality: "Kozhikode",
      addressRegion: "Kerala",
      postalCode: "673602",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.2588",
      longitude: "75.7804",
    },
    event: {
      "@type": "Festival",
      name: "ASTRA 2K27",
      startDate: FEST_CONFIG.festDate,
      endDate: FEST_CONFIG.festDate,
      url: "https://astrafest.live",
    },
  };

  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${bebas.variable} ${syne.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] font-sans antialiased selection:bg-[#FF4D00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
