import type { Metadata } from "next";
import { DentalRefurbLandingPage } from "@/components/DentalRefurbLandingPage";

const title = "Dental Practice Refurbishment & Fit-Out Contractors";
const description =
  "HTM 01-05 compliant decontamination rooms, CQC-ready surgery fit-outs, X-ray room lead lining and full dental practice refurbishment. London and UK-wide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dental.maycor.co.uk/",
  },
  openGraph: {
    title,
    description,
    url: "https://dental.maycor.co.uk/",
    images: [{ url: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg", width: 1200, height: 1500, alt: "Dental practice refurbishment by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg"],
  },
};

export default function DentalPracticeRefurbishmentLondonPage() {
  return <DentalRefurbLandingPage />;
}
