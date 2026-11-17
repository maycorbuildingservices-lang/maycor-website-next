import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.1.12"],
  devIndicators: false,
  async redirects() {
    return [
      // Hub page now lives at /london — short enough to remove the repeated
      // "bathroom-renovations" keyword stuffing, while keeping the geo keyword.
      {
        source: "/",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "/london",
        permanent: true,
      },
      {
        source: "/bathroom-renovations-london",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "/london",
        permanent: true,
      },
      {
        source: "/bathroom-renovations-london/",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "/london",
        permanent: true,
      },
      // Dental content moved to its own subdomain — old URLs 301 out.
      {
        source: "/dental-practice-refurbishment-london",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical",
        permanent: true,
      },
      {
        source: "/dental-practice-refurbishment-london/:path*",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical",
        permanent: true,
      },
      {
        source: "/htm-01-05-decontamination-room-guide",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/htm-01-05-decontamination-room-guide",
        permanent: true,
      },
      {
        source: "/htm-01-05-decontamination-room-guide/:path*",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/htm-01-05-decontamination-room-guide",
        permanent: true,
      },
      {
        source: "/cqc-regulation-15-checklist",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/cqc-regulation-15-checklist",
        permanent: true,
      },
      {
        source: "/cqc-regulation-15-checklist/:path*",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/cqc-regulation-15-checklist",
        permanent: true,
      },
      // The two compliance guides now live on the main site (2026-11).
      {
        source: "/cqc-regulation-15-checklist",
        has: [{ type: "host", value: "dental.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/cqc-regulation-15-checklist",
        permanent: true,
      },
      {
        source: "/htm-01-05-decontamination-room-guide",
        has: [{ type: "host", value: "dental.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical/htm-01-05-decontamination-room-guide",
        permanent: true,
      },
      // dental.maycor.co.uk landing page retired (2026-11): the equivalent page lives on
      // the main site. The two compliance guides redirect to the main site as well.
      {
        source: "/",
        has: [{ type: "host", value: "dental.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical",
        permanent: true,
      },
      {
        source: "/dental-practice-refurbishment-london",
        has: [{ type: "host", value: "dental.maycor.co.uk" }],
        destination: "https://maycor.co.uk/commercial/dental-medical",
        permanent: true,
      },
      // lofts.maycor.co.uk retired (2026-11): query string (utm_*) is forwarded by Next.
      {
        source: "/",
        has: [{ type: "host", value: "lofts.maycor.co.uk" }],
        destination: "https://maycor.co.uk/residential/loft-conversions",
        permanent: true,
      },
      {
        source: "/loft-conversion-st-albans",
        has: [{ type: "host", value: "lofts.maycor.co.uk" }],
        destination: "https://maycor.co.uk/residential/loft-conversions",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maycor.co.uk",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
