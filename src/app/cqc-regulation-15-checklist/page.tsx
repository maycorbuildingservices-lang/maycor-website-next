import type { Metadata } from "next";
import { CqcChecklistArticle } from "@/components/CqcChecklistArticle";

const title = "CQC Regulation 15 Checklist for Dental Practices";
const description =
  "What CQC Regulation 15 (Premises and Equipment) actually requires, and a practical checklist for dental practice fit-out and refurbishment projects.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dental.maycor.co.uk/cqc-regulation-15-checklist/",
  },
  openGraph: {
    title,
    description,
    url: "https://dental.maycor.co.uk/cqc-regulation-15-checklist/",
    images: [{ url: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg", width: 1200, height: 1500, alt: "Dental practice fit-out by Maycor" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg"],
  },
};

export default function CqcRegulation15ChecklistPage() {
  return <CqcChecklistArticle />;
}
