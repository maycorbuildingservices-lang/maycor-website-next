import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-3RWMN3PGDG";
const AW_ID = "AW-457222828";

export const metadata: Metadata = {
  metadataBase: new URL("https://bathroom-renovations.maycor.co.uk"),
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
    url: "https://bathroom-renovations.maycor.co.uk",
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${AW_ID}');
        `}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
