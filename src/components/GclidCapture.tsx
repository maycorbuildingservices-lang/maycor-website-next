"use client";

import { useEffect } from "react";
import { captureGclid } from "@/lib/adTracking";

/** Mounted once in the root layout. Renders nothing — just captures ?gclid= on landing into a
 * cookie/localStorage so a later WhatsApp click can be tagged with it. See src/lib/adTracking.ts. */
export function GclidCapture() {
  useEffect(() => {
    captureGclid();
  }, []);
  return null;
}
