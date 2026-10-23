import { MetadataRoute } from "next";
import { MOCK_PROGRAMS } from "@/data/events.mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://astrafest.live";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/status`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const programRoutes: MetadataRoute.Sitemap = MOCK_PROGRAMS.map((prog) => ({
    url: `${baseUrl}/events/${prog.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticRoutes, ...programRoutes];
}
