import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const shepherdsBushLocality: LocalityConfig = {
  slug: "shepherds-bush",
  name: "Shepherd's Bush",
  eyebrow: "Premium bathroom renovation contractors in Shepherd's Bush",
  h1: "Bathroom renovations in Shepherd's Bush, fitted around period conversions and new builds.",
  intro:
    "Shepherd's Bush's Victorian terraces split into flats sit alongside newer developments around W12, each with their own mix of shared pipework, leasehold sign-off and layout constraints to plan around. Maycor plans around all of it, so the finished bathroom fits a Shepherd's Bush property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-shepherds-bush/",
};

const title = "Bathroom Renovations in Shepherd's Bush, W12";
const description =
  "Premium bathroom renovation in Shepherd's Bush, W12. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-shepherds-bush/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-shepherds-bush/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Shepherd's Bush by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationShepherdsBushPage() {
  return <BathroomLandingPage locality={shepherdsBushLocality} />;
}
