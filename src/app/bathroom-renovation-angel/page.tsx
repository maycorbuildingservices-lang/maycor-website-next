import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const angelLocality: LocalityConfig = {
  slug: "angel",
  name: "Angel",
  eyebrow: "Premium bathroom renovation contractors in Angel",
  h1: "Bathroom renovations in Angel, fitted around Georgian terraces and canal-side conversions.",
  intro:
    "Angel's Georgian and Victorian terraces, many close to the Regent's Canal around N1, are largely split into flats, so most renovations involve shared freeholds and careful planning around an older building's layout and pipe runs. Maycor plans around all of it, so the finished bathroom fits an Angel property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-angel/",
};

const title = "Bathroom Renovations in Angel, N1";
const description =
  "Premium bathroom renovation in Angel, N1. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-angel/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-angel/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in Angel by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationAngelPage() {
  return <BathroomLandingPage locality={angelLocality} />;
}
