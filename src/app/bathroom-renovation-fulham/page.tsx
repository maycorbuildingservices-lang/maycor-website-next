import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const fulhamLocality: LocalityConfig = {
  slug: "fulham",
  name: "Fulham",
  eyebrow: "Premium bathroom renovation contractors in Fulham",
  h1: "Bathroom renovations in Fulham, fitted around period terraces and riverside flats.",
  intro:
    "Fulham's Victorian terraces converted into flats sit alongside newer riverside developments around SW6, each with their own mix of shared pipework and managing agent sign-off to plan around. Maycor plans around all of it, so the finished bathroom fits a Fulham property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-fulham/",
};

const title = "Bathroom Renovations in Fulham, SW6";
const description =
  "Premium bathroom renovation in Fulham, SW6. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-fulham/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-fulham/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Fulham by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationFulhamPage() {
  return <BathroomLandingPage locality={fulhamLocality} />;
}
