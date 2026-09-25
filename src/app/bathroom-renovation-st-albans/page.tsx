import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const stAlbansLocality: LocalityConfig = {
  slug: "st-albans",
  name: "St Albans",
  eyebrow: "Premium bathroom renovation contractors in St Albans",
  h1: "Bathroom renovations in St Albans, done properly, start to finish.",
  intro:
    "St Albans' Georgian and Victorian homes around the Cathedral and city centre, along with the wider commuter-belt streets further out, each bring their own quirks — period plumbing runs, conservation area considerations, or simply a layout that's never been touched since the house was built. Maycor plans around all of it, so the finished bathroom fits a St Albans property as much as it fits your brief. We also cover nearby Harpenden.",
  canonicalPath: "/bathroom-renovation-st-albans",
  region: "hertfordshire",
  areaServedOverride: ["St Albans", "Harpenden", "Hertfordshire"],
  priceLow: "£4,000",
  priceHigh: "£15,000+",
};

const title = "Bathroom Renovations in St Albans";
const description =
  "Bathroom renovation in St Albans and Harpenden — period homes and modern extensions, handled by one coordinated Maycor team. Quick estimate, full breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-st-albans",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-st-albans",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in St Albans by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationStAlbansPage() {
  return <BathroomLandingPage locality={stAlbansLocality} />;
}
