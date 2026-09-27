"use client";

import { logWhatsAppClick } from "@/lib/adTracking";

/** A wa.me link that logs the click (with any stored gclid) before WhatsApp opens. Lets server
 * components render a tracked WhatsApp button without becoming client components themselves. */
export function WhatsAppLink({
  location,
  className,
  href = "https://wa.me/447843746835",
  children,
}: {
  location: string;
  className?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" onClick={() => logWhatsAppClick(location)}>
      {children}
    </a>
  );
}
