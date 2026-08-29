import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const hampsteadLocality: LocalityConfig = {
  slug: "hampstead",
  name: "Hampstead",
  eyebrow: "Premium bathroom renovation contractors in Hampstead",
  h1: "Bathroom renovations in Hampstead, planned around original pipework and layout.",
  intro:
    "Hampstead's Victorian and Edwardian family houses around NW3, many within one of London's largest conservation areas, often still have original pipework and layouts that need careful planning before anything is stripped out. Maycor plans around all of it, so the finished bathroom fits a Hampstead property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-hampstead/",
};

export const metadata: Metadata = {
  title: "Bathroom Renovations in Hampstead, NW3",
  description:
    "Premium bathroom renovation in Hampstead, NW3. One coordinated Maycor team — strip-out to finish, quick estimate range online.",
  alternates: {
    canonical: "/bathroom-renovation-hampstead/",
  },
};

export default function BathroomRenovationHampsteadPage() {
  return <BathroomLandingPage locality={hampsteadLocality} />;
}
