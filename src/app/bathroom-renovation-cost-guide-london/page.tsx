import type { Metadata } from "next";
import { CostGuideArticle } from "@/components/CostGuideArticle";

const title = "Bathroom Renovation Cost Guide for London";
const description =
  "Full London bathroom renovations typically cost £6,000–£20,000+ (WC refits from £3,900). Real price ranges by room size and finish, and what moves the cost.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bathroom-renovation-cost-guide-london",
  },
  openGraph: {
    title,
    description,
    url: "/bathroom-renovation-cost-guide-london",
    images: [{ url: "/images/story-dark-tile-vanity.jpg", width: 1200, height: 1500, alt: "Bathroom renovation cost guide by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/story-dark-tile-vanity.jpg"],
  },
};

export default function BathroomRenovationCostGuideLondonPage() {
  return <CostGuideArticle />;
}
