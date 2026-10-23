import { Metadata } from "next";
import { ScheduleClient } from "./schedule-client";

export const metadata: Metadata = {
  title: "Official Schedule & Stage Timeline | ASTRA 2K27",
  description:
    "Live stage schedule and timeline for ASTRA 2K27 at Don Bosco College Mampetta. Explore happening now, up next, and stage slots.",
};

export default function SchedulePage() {
  return <ScheduleClient />;
}
