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

export const metadata: Metadata = {
  title: "Bathroom Renovations in Kensington, W8",
  description:
    "Premium bathroom renovation in Kensington, W8. One coordinated Maycor team — strip-out to finish, quick estimate range online.",
  alternates: {
    canonical: "/bathroom-renovation-kensington/",
  },
};

export default function BathroomRenovationKensingtonPage() {
  return <BathroomLandingPage locality={kensingtonLocality} />;
}
