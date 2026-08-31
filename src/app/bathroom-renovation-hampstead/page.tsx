import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const hampsteadLocality: LocalityConfig = {
  slug: "hampstead",
  name: "Hampstead",
  eyebrow: "Premium bathroom renovation contractors in Hampstead",
  h1: "Bathroom renovations in Hampstead, planned around original pipework and layout.",
  intro:
    "Hampstead's Victorian and Edwardian family houses around NW3, many within one of London's largest conservation areas, often still have original pipework and layouts that need careful planning before anything is stripped out. Maycor plans around all of it, so the finished bathroom fits a Hampstead property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-hampstead",
};

const title = "Bathroom Renovations in Hampstead, NW3";
const description =
  "Premium bathroom renovation in Hampstead, NW3. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-hampstead",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-hampstead",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Hampstead by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationHampsteadPage() {
  return <BathroomLandingPage locality={hampsteadLocality} />;
}
