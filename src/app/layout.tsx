import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
