"use client";

import { openTrackedWhatsApp } from "@/lib/adTracking";

/** A wa.me link that, on click, adds a reference code to the pre-filled WhatsApp message and logs
 * the click (with any stored gclid and the same ref) before WhatsApp opens. Lets server
 * components render a tracked WhatsApp button without becoming client components themselves. */
export function WhatsAppLink({
  location,
  className,
  href = "https://wa.me/447843746835",
  message,
  children,
}: {
  location: string;
  className?: string;
  href?: string;
  message?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => openTrackedWhatsApp(event, location, message)}
    >
      {children}
    </a>
  );
}
