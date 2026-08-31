import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") || "";
  const isDental = host.includes("dental.maycor.co.uk");
  const base = isDental ? "https://dental.maycor.co.uk" : "https://bathroom-renovations.maycor.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
