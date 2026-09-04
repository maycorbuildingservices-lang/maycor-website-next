import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const westHampsteadLocality: LocalityConfig = {
  slug: "west-hampstead",
  name: "West Hampstead",
  eyebrow: "Premium bathroom renovation contractors in West Hampstead",
  h1: "Bathroom renovations in West Hampstead, fitted around period conversion flats.",
  intro:
    "West Hampstead's NW6 streets are dominated by Victorian and Edwardian houses split into conversion flats and mansion blocks, rather than the full houses more common a mile away in Hampstead itself. That means most bathroom renovations here involve shared pipework, lease conditions and managing agent sign-off as much as the room itself. Maycor plans around all of it, so the finished bathroom fits a West Hampstead flat as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-west-hampstead",
};

const title = "Bathroom Renovations in West Hampstead, NW6";
const description =
  "Premium bathroom renovation in West Hampstead, NW6. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-west-hampstead",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-west-hampstead",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in West Hampstead by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationWestHampsteadPage() {
  return <BathroomLandingPage locality={westHampsteadLocality} />;
}
