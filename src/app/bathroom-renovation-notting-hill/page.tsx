import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const nottingHillLocality: LocalityConfig = {
  slug: "notting-hill",
  name: "Notting Hill",
  eyebrow: "Premium bathroom renovation contractors in Notting Hill",
  h1: "Bathroom renovations in Notting Hill, built around period detail and access.",
  intro:
    "Notting Hill's mix of Victorian terraces, garden flats and portered mansion blocks around W11 means every renovation has its own access, planning and period-detail considerations. Maycor plans around all of it, so the finished bathroom fits the property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-notting-hill",
  featuredTestimonial: "Sophie Bower",
};

const title = "Bathroom Renovations in Notting Hill, W11";
const description =
  "Premium bathroom renovation in Notting Hill, W11. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-notting-hill",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-notting-hill",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Notting Hill by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationNottingHillPage() {
  return <BathroomLandingPage locality={nottingHillLocality} />;
}
