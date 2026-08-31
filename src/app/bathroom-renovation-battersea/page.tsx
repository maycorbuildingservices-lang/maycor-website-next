import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const batterseaLocality: LocalityConfig = {
  slug: "battersea",
  name: "Battersea",
  eyebrow: "Premium bathroom renovation contractors in Battersea",
  h1: "Bathroom renovations in Battersea, fitted around period conversions and new-build flats.",
  intro:
    "Battersea's Victorian terraces split into flats sit alongside the newer developments around Battersea Power Station and SW11, each bringing a different mix of shared freeholds, building management sign-off and layout constraints. Maycor plans around all of it, so the finished bathroom fits a Battersea property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-battersea",
};

const title = "Bathroom Renovations in Battersea, SW11";
const description =
  "Premium bathroom renovation in Battersea, SW11. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-battersea",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-battersea",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Battersea by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationBatterseaPage() {
  return <BathroomLandingPage locality={batterseaLocality} />;
}
