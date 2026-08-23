import type { Metadata } from "next";
import { DentalRefurbLandingPage } from "@/components/DentalRefurbLandingPage";

export const metadata: Metadata = {
  title: "Dental Practice Refurbishment & Fit-Out Contractors",
  description:
    "HTM 01-05 compliant decontamination rooms, CQC-ready surgery fit-outs, X-ray room lead lining and full dental practice refurbishment. London and UK-wide.",
  alternates: {
    canonical: "/dental-practice-refurbishment-london/",
  },
};

export default function DentalPracticeRefurbishmentLondonPage() {
  return <DentalRefurbLandingPage />;
}
