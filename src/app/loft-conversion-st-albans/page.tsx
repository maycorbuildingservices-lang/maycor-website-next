import type { Metadata } from "next";
import { LoftConversionStAlbansPage } from "@/components/LoftConversionStAlbansPage";

const title = "Loft Conversions St Albans";
const description =
  "Loft conversions in St Albans and Harpenden — Velux, dormer, hip-to-gable, L-shaped and mansard. Structural design, planning and building regs handled by one team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://lofts.maycor.co.uk/",
  },
  openGraph: {
    title,
    description,
    url: "https://lofts.maycor.co.uk/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Page() {
  return <LoftConversionStAlbansPage />;
}
