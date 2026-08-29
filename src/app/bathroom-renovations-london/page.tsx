import type { Metadata } from "next";
import { BathroomLandingPage } from "@/components/BathroomLandingPage";

const title = "Bathroom Renovations London";
const description =
  "Plan your London bathroom renovation with Maycor. Get a quick range, see what is included, and request a full breakdown from one coordinated team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovations-london/",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovations-london/",
    images: [{ url: "/images/hero-bathroom-vanity-mirror.jpg", width: 1200, height: 1500, alt: "Modern London bathroom renovation by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bathroom-vanity-mirror.jpg"],
  },
};

export default function BathroomRenovationsLondonPage() {
  return <BathroomLandingPage />;
}
