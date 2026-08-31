import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const bathroomUrls = [
  { path: "bathroom-renovations-london", priority: 1 },
  { path: "bathroom-renovation-notting-hill", priority: 0.9 },
  { path: "bathroom-renovation-kensington", priority: 0.9 },
  { path: "bathroom-renovation-chelsea", priority: 0.9 },
  { path: "bathroom-renovation-hampstead", priority: 0.9 },
  { path: "bathroom-renovation-putney", priority: 0.9 },
  { path: "bathroom-renovation-hammersmith", priority: 0.9 },
  { path: "bathroom-renovation-shepherds-bush", priority: 0.9 },
  { path: "bathroom-renovation-earls-court", priority: 0.9 },
  { path: "bathroom-renovation-fulham", priority: 0.9 },
  { path: "bathroom-renovation-battersea", priority: 0.9 },
  { path: "bathroom-renovation-chiswick", priority: 0.9 },
  { path: "bathroom-renovation-south-kensington", priority: 0.9 },
  { path: "bathroom-renovation-belgravia", priority: 0.9 },
  { path: "bathroom-renovation-maida-vale", priority: 0.9 },
  { path: "bathroom-renovation-st-johns-wood", priority: 0.9 },
  { path: "bathroom-renovation-angel", priority: 0.9 },
  { path: "bathroom-renovation-cost-guide-london", priority: 0.9 },
];

const dentalUrls = [
  { path: "", priority: 1 },
  { path: "htm-01-05-decontamination-room-guide", priority: 0.9 },
  { path: "cqc-regulation-15-checklist", priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") || "";
  const isDental = host.includes("dental.maycor.co.uk");

  const base = isDental ? "https://dental.maycor.co.uk" : "https://bathroom-renovations.maycor.co.uk";
  const entries = isDental ? dentalUrls : bathroomUrls;

  return entries.map(({ path, priority }) => ({
    url: `${base}/${path}${path ? "/" : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));
}
