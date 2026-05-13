import type { Metadata } from "next";
import { BathroomLandingPage } from "@/components/BathroomLandingPage";

export const metadata: Metadata = {
  title: "Bathroom Renovations London",
  description:
    "Plan your London bathroom renovation with Maycor. Get a quick range, see what is included, and request a full breakdown from one coordinated team.",
  alternates: {
    canonical: "/bathroom-renovations-london/",
  },
};

export default function BathroomRenovationsLondonPage() {
  return <BathroomLandingPage />;
}
