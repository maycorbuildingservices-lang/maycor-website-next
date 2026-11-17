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
        destination: "https://dental.maycor.co.uk/htm-01-05-decontamination-room-guide",
        permanent: true,
      },
      {
        source: "/htm-01-05-decontamination-room-guide/:path*",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://dental.maycor.co.uk/htm-01-05-decontamination-room-guide/:path*",
        permanent: true,
      },
      // dental.maycor.co.uk landing page retired (2026-11): the equivalent page lives on
      // the main site. The two compliance guides stay on this host for now.
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
