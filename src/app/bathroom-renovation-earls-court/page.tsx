import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const earlsCourtLocality: LocalityConfig = {
  slug: "earls-court",
  name: "Earls Court",
  eyebrow: "Premium bathroom renovation contractors in Earls Court",
  h1: "Bathroom renovations in Earls Court, fitted around stucco terraces and garden squares.",
  intro:
    "Earls Court's grand stucco-fronted terraces and garden squares around SW5 are largely split into flats, so most renovations involve shared freeholds, period plasterwork or awkward pipe runs from a much older layout. Maycor plans around all of it, so the finished bathroom fits an Earls Court property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-earls-court/",
};

const title = "Bathroom Renovations in Earls Court, SW5";
const description =
  "Premium bathroom renovation in Earls Court, SW5. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-earls-court/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-earls-court/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Earls Court by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationEarlsCourtPage() {
  return <BathroomLandingPage locality={earlsCourtLocality} />;
}
