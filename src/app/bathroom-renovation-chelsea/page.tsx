import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const chelseaLocality: LocalityConfig = {
  slug: "chelsea",
  name: "Chelsea",
  eyebrow: "Premium bathroom renovation contractors in Chelsea",
  h1: "Bathroom renovations in Chelsea, fitted around period features and tight access.",
  intro:
    "Chelsea's Georgian and Victorian terraces, mews houses and King's Road conversions around SW3 and SW10 come with their own mix of conservation area constraints, tight access, and period features worth protecting. Maycor plans around all of it, so the finished bathroom fits a Chelsea property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-chelsea/",
};

const title = "Bathroom Renovations in Chelsea, SW3";
const description =
  "Premium bathroom renovation in Chelsea, SW3. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-chelsea/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-chelsea/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Chelsea by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationChelseaPage() {
  return <BathroomLandingPage locality={chelseaLocality} />;
}
