import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GclidCapture } from "@/components/GclidCapture";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
        {/* gtag.js (GA4 + Ads) costs ~800ms of main-thread time on a throttled mobile load, and
            still blocked taps even when lazy-loaded after onload. So the library is only fetched on
            the visitor's first interaction (scroll, touch, click, key) or after 4s, whichever comes
            first. The stub defines window.gtag right away; calls made before the library arrives
            queue in dataLayer and are sent when it loads. Trade-off (Victor approved 2026-09-27):
            visitors who leave within ~4s without touching the page aren't counted in GA4.
            gclid capture for WhatsApp tracking is our own code and doesn't depend on gtag. */}
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${AW_ID}');
          (function () {
            var loaded = false;
            var events = ['scroll', 'pointerdown', 'touchstart', 'keydown'];
            function load() {
              if (loaded) return;
              loaded = true;
              events.forEach(function (e) { window.removeEventListener(e, load); });
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
              document.head.appendChild(s);
            }
            events.forEach(function (e) { window.addEventListener(e, load, { once: true, passive: true }); });
            setTimeout(load, 4000);
          })();
        `}</Script>
      </head>
      <body>
        <GclidCapture />
        {children}
      </body>
    </html>
  );
}
