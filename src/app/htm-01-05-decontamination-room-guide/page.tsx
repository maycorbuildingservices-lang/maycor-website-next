import type { Metadata } from "next";
import { HtmGuideArticle } from "@/components/HtmGuideArticle";

const title = "HTM 01-05 Decontamination Room Guide for Dental Practices";
const description =
  "What HTM 01-05 actually requires: the dirty-to-clean workflow, two-room split vs single Instrument Processing Area, equipment sequence, and surface requirements.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/htm-01-05-decontamination-room-guide/",
  },
  openGraph: {
    title,
    description,
    url: "/htm-01-05-decontamination-room-guide/",
    images: [{ url: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg", width: 1200, height: 1500, alt: "Dental decontamination room fit-out by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg"],
  },
};

export default function HtmDecontaminationRoomGuidePage() {
  return <HtmGuideArticle />;
}
