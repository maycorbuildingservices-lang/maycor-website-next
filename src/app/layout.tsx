import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maycor.co.uk"),
  title: {
    default: "Maycor Building Contractors",
    template: "%s | Maycor Building Contractors",
  },
  description:
    "Premium bathroom renovations and building work across London, delivered by one coordinated Maycor team.",
  openGraph: {
    title: "Maycor Building Contractors",
    description:
      "Premium bathroom renovations and building work across London, delivered by one coordinated Maycor team.",
    url: "https://maycor.co.uk",
    siteName: "Maycor Building Contractors",
    images: [
      {
        url: "https://maycor.co.uk/wp-content/uploads/2026/01/IMG_1765-scaled.jpg",
        width: 1200,
        height: 800,
        alt: "Modern London bathroom renovation by Maycor",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
