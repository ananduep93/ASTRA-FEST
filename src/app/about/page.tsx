import { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Conclave & Leadership Matrix | ASTRA 2K27",
  description:
    "Learn about ASTRA 2K27, Don Bosco College Mampetta, festival leadership led by Anandu EP, campus directions, and official FAQs.",
};

export default function AboutPage() {
  return <AboutClient />;
}
