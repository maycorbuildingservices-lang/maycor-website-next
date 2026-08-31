import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.1.12"],
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "/bathroom-renovations-london/",
        permanent: true,
      },
      // Dental content moved to its own subdomain — old URLs 301 out.
      {
        source: "/dental-practice-refurbishment-london",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://dental.maycor.co.uk/",
        permanent: true,
      },
      {
        source: "/dental-practice-refurbishment-london/:path*",
        has: [{ type: "host", value: "bathroom-renovations.maycor.co.uk" }],
        destination: "https://dental.maycor.co.uk/:path*",
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
    ];
  },
  async rewrites() {
    return [
      // dental.maycor.co.uk/ silently serves the dental landing page.
      {
        source: "/",
        has: [{ type: "host", value: "dental.maycor.co.uk" }],
        destination: "/dental-practice-refurbishment-london",
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
