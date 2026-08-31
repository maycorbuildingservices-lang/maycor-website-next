import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const belgraviaLocality: LocalityConfig = {
  slug: "belgravia",
  name: "Belgravia",
  eyebrow: "Premium bathroom renovation contractors in Belgravia",
  h1: "Bathroom renovations in Belgravia, fitted around grand stucco terraces and garden squares.",
  intro:
    "Belgravia's grand Regency stucco terraces around Belgrave Square and SW1X are among London's most protected properties, so renovations need careful conservation-area planning, managing agent sign-off and precise work around period detailing. Maycor plans around all of it, so the finished bathroom fits a Belgravia property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-belgravia",
};

const title = "Bathroom Renovations in Belgravia, SW1X";
const description =
  "Premium bathroom renovation in Belgravia, SW1X. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-belgravia",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-belgravia",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Belgravia by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationBelgraviaPage() {
  return <BathroomLandingPage locality={belgraviaLocality} />;
}
