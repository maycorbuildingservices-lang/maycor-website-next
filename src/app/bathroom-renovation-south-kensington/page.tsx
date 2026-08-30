import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const southKensingtonLocality: LocalityConfig = {
  slug: "south-kensington",
  name: "South Kensington",
  eyebrow: "Premium bathroom renovation contractors in South Kensington",
  h1: "Bathroom renovations in South Kensington, fitted around stucco terraces and museum-quarter flats.",
  intro:
    "South Kensington's stucco-fronted terraces and garden squares around SW7, close to the museum quarter, are largely split into flats, so most renovations involve shared freeholds, period plasterwork and careful planning around original layouts. Maycor plans around all of it, so the finished bathroom fits a South Kensington property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-south-kensington/",
};

const title = "Bathroom Renovations in South Kensington, SW7";
const description =
  "Premium bathroom renovation in South Kensington, SW7. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-south-kensington/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-south-kensington/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in South Kensington by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationSouthKensingtonPage() {
  return <BathroomLandingPage locality={southKensingtonLocality} />;
}
