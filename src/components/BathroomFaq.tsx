"use client";

import { PointerEvent, useRef, useState } from "react";

/** FAQ accordion for BathroomLandingPage, split out so the page itself can be a server component. */
export function BathroomFaq({ faqs }: { faqs: [string, string][] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const lastTouchActivation = useRef(0);

  function tapBridge(action: () => void) {
    return {
      onPointerUp(event: PointerEvent<HTMLButtonElement>) {
        if (event.pointerType !== "touch") return;
        lastTouchActivation.current = Date.now();
        action();
      },
      onClick() {
        if (Date.now() - lastTouchActivation.current < 700) return;
        action();
      },
    };
  }

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const isOpen = openFaq === index;

        return (
          <button
            key={question}
            className="faq-card"
            type="button"
            aria-expanded={isOpen}
            {...tapBridge(() => setOpenFaq(isOpen ? null : index))}
          >
            <span className="faq-header">
              <span className="faq-question">{question}</span>
              <span className="faq-toggle">{isOpen ? "Close" : "Open"}</span>
            </span>
            {isOpen ? <p>{answer}</p> : null}
          </button>
        );
      })}
    </div>
  );
}
