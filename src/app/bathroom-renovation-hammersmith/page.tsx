import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const hammersmithLocality: LocalityConfig = {
  slug: "hammersmith",
  name: "Hammersmith",
  eyebrow: "Premium bathroom renovation contractors in Hammersmith",
  h1: "Bathroom renovations in Hammersmith, fitted around period flats and riverside blocks.",
  intro:
    "Hammersmith's Victorian and Edwardian terraces converted into flats, alongside newer riverside developments near the Thames around W6, each bring their own access and layout considerations, from shared freeholds to lift-access apartments. Maycor plans around all of it, so the finished bathroom fits a Hammersmith property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-hammersmith/",
};

const title = "Bathroom Renovations in Hammersmith, W6";
const description =
  "Premium bathroom renovation in Hammersmith, W6. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-hammersmith/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-hammersmith/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Hammersmith by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationHammersmithPage() {
  return <BathroomLandingPage locality={hammersmithLocality} />;
}
