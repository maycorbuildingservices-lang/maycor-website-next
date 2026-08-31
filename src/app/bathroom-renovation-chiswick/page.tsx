import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const chiswickLocality: LocalityConfig = {
  slug: "chiswick",
  name: "Chiswick",
  eyebrow: "Premium bathroom renovation contractors in Chiswick",
  h1: "Bathroom renovations in Chiswick, fitted around Georgian and Victorian family homes.",
  intro:
    "Chiswick's Georgian and Victorian houses around W4, many close to the river and within conservation areas, often still have original layouts and pipework that need careful planning before anything is stripped out. Maycor plans around all of it, so the finished bathroom fits a Chiswick property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-chiswick",
};

const title = "Bathroom Renovations in Chiswick, W4";
const description =
  "Premium bathroom renovation in Chiswick, W4. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-chiswick",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-chiswick",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Chiswick by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationChiswickPage() {
  return <BathroomLandingPage locality={chiswickLocality} />;
}
