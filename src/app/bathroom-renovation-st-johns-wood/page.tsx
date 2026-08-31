import type { Metadata } from "next";
import { BathroomLandingPage, type LocalityConfig } from "@/components/BathroomLandingPage";

const stJohnsWoodLocality: LocalityConfig = {
  slug: "st-johns-wood",
  name: "St John's Wood",
  eyebrow: "Premium bathroom renovation contractors in St John's Wood",
  h1: "Bathroom renovations in St John's Wood, fitted around period villas and mansion blocks.",
  intro:
    "St John's Wood's Regency and Victorian villas alongside grand mansion blocks around NW8 mean renovations often involve managing agent sign-off, lift access or careful work around original period detailing. Maycor plans around all of it, so the finished bathroom fits a St John's Wood property as much as it fits your brief.",
  canonicalPath: "/bathroom-renovation-st-johns-wood",
};

const title = "Bathroom Renovations in St John's Wood, NW8";
const description =
  "Premium bathroom renovation in St John's Wood, NW8. One coordinated Maycor team — strip-out to finish, quick estimate range online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-st-johns-wood",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-st-johns-wood",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Bathroom renovation in St John's Wood by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationStJohnsWoodPage() {
  return <BathroomLandingPage locality={stJohnsWoodLocality} />;
}
