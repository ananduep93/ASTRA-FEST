import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "ASTRA 2027 | Inter-College Festival | Don Bosco College, Kozhikode",
  description:
    "ASTRA 2027 is the premier inter-college youth festival hosted by Don Bosco College, Mampetta, Mukkam, Kozhikode, bringing students together in Dance, Music, Photography, and Coding.",
  keywords: ["ASTRA", "ASTRA 2027", "Don Bosco College", "Mampetta", "Mukkam", "Kozhikode", "college fest", "inter-college festival", "dance", "music", "coding"],
  openGraph: {
    title: "ASTRA 2027 | Inter-College Festival",
    description: "The premier inter-college youth festival hosted by Don Bosco College, Mampetta, Mukkam, Kozhikode.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} dark`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { --background: #060607; --foreground: #f5f2eb; }
              html, body { background-color: #060607; color: #f5f2eb; color-scheme: dark; }
              #scroll-sentinel { position: absolute; top: 0; left: 0; width: 100%; height: 20px; pointer-events: none; z-index: -10; }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-void text-stellar-100 font-sans antialiased selection:bg-gold/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
