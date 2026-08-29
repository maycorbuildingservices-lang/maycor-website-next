import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovations-london/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-notting-hill/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-kensington/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-chelsea/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-hampstead/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://bathroom-renovations.maycor.co.uk/dental-practice-refurbishment-london/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
