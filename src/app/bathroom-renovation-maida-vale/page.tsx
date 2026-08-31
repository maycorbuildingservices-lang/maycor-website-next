import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const maidaValeLocality: LocalityConfig = {
  slug: "maida-vale",
  name: "Maida Vale",
  eyebrow: "Premium bathroom renovation contractors in Maida Vale",
  h1: "Bathroom renovations in Maida Vale, fitted around grand mansion blocks and period flats.",
  intro:
    "Maida Vale's wide tree-lined avenues of red-brick mansion blocks around W9 mean most renovations involve managing agent approval, lift access and shared pipework running through a much older building. Maycor plans around all of it, so the finished bathroom fits a Maida Vale property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-maida-vale",
};

const title = "Bathroom Renovations in Maida Vale, W9";
const description =
  "Premium bathroom renovation in Maida Vale, W9. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-maida-vale",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-maida-vale",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Maida Vale by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationMaidaValePage() {
  return <BathroomLandingPage locality={maidaValeLocality} />;
}
