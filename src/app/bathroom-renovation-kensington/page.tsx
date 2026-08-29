import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const kensingtonLocality: LocalityConfig = {
  slug: "kensington",
  name: "Kensington",
  eyebrow: "Premium bathroom renovation contractors in Kensington",
  h1: "Bathroom renovations in Kensington, done with conservation rules in mind.",
  intro:
    "Kensington's stucco-fronted townhouses, red-brick mansion blocks and portered apartments around W8 mean most renovations involve conservation area rules, managing agent sign-off, or careful work around original plasterwork and period detailing. Maycor plans around all of it, so the finished bathroom fits a Kensington property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-kensington/",
};

const title = "Bathroom Renovations in Kensington, W8";
const description =
  "Premium bathroom renovation in Kensington, W8. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-kensington/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-kensington/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Kensington by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationKensingtonPage() {
  return <BathroomLandingPage locality={kensingtonLocality} />;
}
