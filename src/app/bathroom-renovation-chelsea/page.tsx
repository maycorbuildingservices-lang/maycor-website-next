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

export const metadata: Metadata = {
  title: "Bathroom Renovations in Chelsea, SW3",
  description:
    "Premium bathroom renovation in Chelsea, SW3. One coordinated Maycor team — strip-out to finish, quick estimate range online.",
  alternates: {
    canonical: "/bathroom-renovation-chelsea/",
  },
};

export default function BathroomRenovationChelseaPage() {
  return <BathroomLandingPage locality={chelseaLocality} />;
}
