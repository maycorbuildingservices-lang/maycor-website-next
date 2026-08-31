import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const putneyLocality: LocalityConfig = {
  slug: "putney",
  name: "Putney",
  eyebrow: "Premium bathroom renovation contractors in Putney",
  h1: "Bathroom renovations in Putney, fitted around period layouts and river-facing flats.",
  intro:
    "Putney's mix of Victorian and Edwardian terraces, riverside conversions and purpose-built flats around SW15 each come with their own layout quirks, whether that's an awkward period pipe run or lift access for a mansion block. Maycor plans around all of it, so the finished bathroom fits a Putney property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-putney",
};

const title = "Bathroom Renovations in Putney, SW15";
const description =
  "Premium bathroom renovation in Putney, SW15. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-putney",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-putney",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Putney by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationPutneyPage() {
  return <BathroomLandingPage locality={putneyLocality} />;
}
