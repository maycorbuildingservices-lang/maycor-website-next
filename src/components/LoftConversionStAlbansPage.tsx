"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { LoftCalculator } from "./LoftCalculator";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
};

const proofPoints: [string, string][] = [
  [
    "Structural engineering in-house",
    "We design and build the structural frame ourselves. No subcontracting the critical parts.",
  ],
  [
    "Victorian & Edwardian roof experts",
    "Cut rafter, trussed rafter, mansard, L-shaped — built across period terraces and semis.",
  ],
  [
    "Permitted development to full planning",
    "We advise on planning rights, handle conservation area applications, and manage building regs sign-off end to end.",
  ],
];

const included = [
  "Structural engineer design & calculations",
  "New floor structure & insulation",
  "Dormer structure or mansard rebuild",
  "New staircase — supply and fit",
  "Rooflight or dormer windows",
  "First & second fix electrics (all floors)",
  "En-suite plumbing & tiling (where selected)",
  "Plastering, fire-rated walls & decoration",
];

const process: [string, string][] = [
  [
    "Free estimate",
    "Get a price range from us, then book a free survey at a time that suits you.",
  ],
  [
    "Survey & design",
    "Structural engineer survey, confirm headroom, architectural drawings, and planning application if needed.",
  ],
  [
    "Structural works",
    "Roof structure, new floor, dormer shell or mansard rebuild — all watertight before second fix begins.",
  ],
  [
    "Second fix & finish",
    "Electrics, en-suite, plaster, staircase, and decoration — complete room, signed off by building control.",
  ],
];

const testimonials = [
  {
    quote:
      "Victor's team built a rear dormer on our Finchley Victorian. They surveyed everything thoroughly before giving a fixed price — and hit it.",
    name: "Michael B.",
    location: "Finchley N3",
    initial: "M",
  },
  {
    quote:
      "L-shaped dormer on our Islington terrace. Two bedrooms and a bathroom where there was nothing. Brilliant work.",
    name: "Priya K.",
    location: "Islington N1",
    initial: "P",
  },
  {
    quote:
      "Hip-to-gable on our 1930s Barnet semi. The loft feels like a proper floor — not an afterthought.",
    name: "Tom & Julia W.",
    location: "Barnet EN5",
    initial: "T",
  },
];

const localCards: [string, string][] = [
  [
    "Permitted development rights",
    "Most rear dormers don't need planning if they add under 40m³ on a terrace (50m³ on semi/detached). We advise at the survey.",
  ],
  [
    "Conservation areas",
    "St Albans has extensive conservation areas around the Cathedral and city centre. We handle conservation area applications and pre-application advice, so you know where you stand before work starts.",
  ],
  [
    "Georgian & Victorian terraces",
    "L-shaped dormers and mansards on period roofs — common across St Albans and Harpenden's older streets.",
  ],
];

const faqs: [string, string][] = [
  [
    "Do I need planning permission for a loft conversion?",
    "Most rear dormers are permitted development if they add less than 40m³ (terraced) or 50m³ (semi/detached) and don't alter the front roofline. Mansards and front dormers almost always need planning. Conservation areas — common in St Albans — remove permitted development rights. We advise at the survey.",
  ],
  [
    "How long does a loft conversion take?",
    "A typical rear dormer takes 8–12 weeks on site. L-shaped and hip-to-gable conversions run 10–14 weeks. Mansards can be 12–16 weeks. Add 4–8 weeks for drawing, structural engineer, and planning stages before work begins.",
  ],
  [
    "What is the minimum head height needed?",
    "Building Regulations require at least 2.2m headroom over 50% of the floor area for a habitable room. We measure this at the survey and advise whether a full conversion is viable or whether ridge raising would be needed.",
  ],
  [
    "Do you handle building regulations sign-off?",
    "Yes. Building regs approval is required for all loft conversions regardless of whether planning permission is needed. We manage the inspection process with your local authority's building control or an approved inspector.",
  ],
  [
    "Can I have an en-suite in my loft conversion?",
    "Yes, in almost all cases. We run new plumbing up from the floor below, which is included in our structural works stage. En-suite size and spec depends on available floor area after the staircase is positioned.",
  ],
  [
    "What types of loft conversion do you build?",
    "We build all conversion types: Velux/rooflight, rear dormer, full-width dormer, hip-to-gable, L-shaped, and mansard. The right type depends on your roof structure, property type, headroom, and budget. We'll advise at the survey.",
  ],
  [
    "Do you work outside St Albans?",
    "Yes. Alongside St Albans and Harpenden, Maycor also carries out loft conversions across North London and Hertfordshire, and bathroom renovations across London.",
  ],
];

const accreditations = [
  { name: "Federation of Master Builders", src: "/images/accreditations/master-builder.svg" },
  { name: "NICEIC Approved Contractor", src: "/images/accreditations/niceic.svg" },
  { name: "Gas Safe Register", src: "/images/accreditations/gas-safe.svg" },
  { name: "CHAS Accredited", src: "/images/accreditations/chas.png" },
  { name: "MyBuilder", src: "/images/accreditations/mybuilder.png" },
  { name: "Constructionline", src: "/images/accreditations/constructionline.png" },
];

export function LoftConversionStAlbansPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Maycor Building Contractors",
    url: "https://lofts.maycor.co.uk/",
    areaServed: ["St Albans", "Harpenden", "Hertfordshire"],
    telephone: "+447843746835",
    address: {
      "@type": "PostalAddress",
      streetAddress: "120 Woodcock Hill",
      addressLocality: "Harrow",
      postalCode: "HA3 0JN",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.577586,
      longitude: -0.306405,
    },
    priceRange: "£29,000–£125,000+",
    sameAs: [
      "https://www.facebook.com/MaycorBuildingContractors",
      "https://www.linkedin.com/in/victor-o-120686151/",
      "https://g.co/kgs/49pzXDQ",
      "https://www.mybuilder.com/profile/maycor-renovations",
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Federation of Master Builders (FMB) member" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "NICEIC Approved Contractor" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Gas Safe Register" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "CHAS Accredited" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Constructionline member" },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Loft Conversions in St Albans and Harpenden",
        description:
          "Velux, dormer, hip-to-gable, L-shaped and mansard loft conversions: structural design, planning, building regs, staircase, en-suite and finishing.",
        areaServed: ["St Albans", "Harpenden", "Hertfordshire"],
        priceRange: "£29,000–£125,000+",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lofts.maycor.co.uk/" },
    ],
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formEl = event.currentTarget;
    const form = new FormData(formEl);

    const payload = {
      lead: {
        name: String(form.get("name") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        email: String(form.get("email") || "").trim(),
        postcode: String(form.get("postcode") || "").trim(),
        conversionType: String(form.get("conversionType") || "").trim(),
        message: String(form.get("message") || "").trim(),
        consent: Boolean(form.get("consent")),
      },
    };

    try {
      const response = await fetch("/api/loft-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Could not send your enquiry.");

      setStatus("success");
      setMessage("Thank you — we've received your enquiry and will be in touch soon.");
      formEl.reset();
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { currency: "GBP" });
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send your enquiry.");
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="#top" aria-label="Maycor loft conversions page top">
          <Image src={images.logo} alt="Maycor Building Contractors" width={300} height={93} priority />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#included">Included</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/447843746835?text=Hi%2C%20I%27d%20like%20a%20loft%20conversion%20estimate" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="header-call" href="#estimate">
            Get My Estimate
          </a>
        </div>
      </header>

      <main id="top">
        <section
          className="hero-section"
          style={{ background: "linear-gradient(135deg, #1e2a3a 0%, #2e3d52 40%, #1a2535 100%)" }}
        >
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">St Albans &amp; Harpenden loft conversion specialists</p>
            <h1>Loft Conversions That Create Real Rooms in St Albans</h1>
            <p className="hero-copy">
              Transform your unused roof space into a bedroom, office, or suite — with an en-suite,
              staircase and building regs sign-off included as standard.
            </p>
            <div className="hero-actions">
              <a href="#estimate" className="primary-button">
                Get My Loft Estimate →
              </a>
              <a href="tel:07843746835" className="secondary-button">
                Call 07843 746835
              </a>
            </div>
          </div>
        </section>

        <div className="hero-proof">
          {proofPoints.map(([title, text]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <section className="cost-intro-section">
          <div className="section-heading">
            <p className="eyebrow">Loft conversion cost in St Albans</p>
            <h2>How much does a loft conversion cost in St Albans?</h2>
            <p className="cost-intro-body">
              In St Albans and Harpenden, loft conversions typically range from around{" "}
              <strong>£29,000 for a basic Velux/rooflight conversion</strong> to{" "}
              <strong>£125,000+ for a larger dormer or mansard with premium finish</strong>. Key
              cost drivers include conversion type, roof structure, headroom, staircase
              specification, en-suite quality, and whether planning permission is required. Use
              the calculator below for a project-specific estimate.
            </p>
          </div>
        </section>

        <LoftCalculator />

        <section className="story-section" style={{ gridTemplateColumns: "1fr", maxWidth: 760 }}>
          <div>
            <div className="section-heading">
              <p className="eyebrow">About Maycor</p>
              <h2>Your Roof Space Has More Value Than You Think</h2>
            </div>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
              Maycor converts lofts across St Albans, Harpenden and North London. We handle the
              whole project — structural design, planning applications, building regs, and every
              trade — so you don&apos;t have to coordinate a dozen different contractors.
            </p>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
              Every conversion starts with a free survey. We measure headroom, assess your roof
              structure, check permitted development rights, and give you a fixed price before we
              start. No surprises mid-project.
            </p>
            <div className="story-stats" style={{ borderTopColor: "var(--line)" }}>
              <div>
                <strong style={{ color: "var(--ink)" }}>17+</strong>
                <span style={{ color: "var(--ink-soft)" }}>Years</span>
              </div>
              <div>
                <strong style={{ color: "var(--ink)" }}>150+</strong>
                <span style={{ color: "var(--ink-soft)" }}>Lofts converted</span>
              </div>
              <div>
                <strong style={{ color: "var(--ink)" }}>100%</strong>
                <span style={{ color: "var(--ink-soft)" }}>Building regs sign-off</span>
              </div>
            </div>
          </div>
        </section>

        <section className="included-section" id="included">
          <div className="section-heading">
            <p className="eyebrow">What you get</p>
            <h2>Everything Included in Your Loft Conversion</h2>
          </div>
          <div className="included-grid">
            {included.map((item) => (
              <div className="included-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>From Roof Survey to Completed Room</h2>
          </div>
          <div className="process-line">
            {process.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-heading">
            <p className="eyebrow">What clients say</p>
            <h2>Real Maycor Loft Conversions</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.name}>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-initial">{t.initial}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="london-section">
          <div>
            <p className="eyebrow">Local knowledge</p>
            <h2>We Know St Albans Lofts</h2>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
              St Albans and Harpenden roofs are not one-size-fits-all. Georgian and Victorian
              terraces around the Cathedral and city centre, 1930s semis further out — each has
              its own quirks and constraints. We know exactly what planning officers, building
              control inspectors, and party wall surveyors expect locally.
            </p>
          </div>
          <div className="london-list">
            {localCards.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="estimate-panel calculator-compact" id="enquiry" aria-labelledby="enquiry-heading">
          <div className="estimate-copy">
            <p className="eyebrow">Prefer to skip the calculator?</p>
            <h2 id="enquiry-heading">
              <span className="estimate-highlight">Just leave your details, we&apos;ll take it from there.</span>
            </h2>
            <p>
              Tell us the scope and roughly what you have in mind, and we&apos;ll arrange a free
              survey before you commit to anything.
            </p>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Full name*
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Phone*
              <input name="phone" autoComplete="tel" required />
            </label>
            <label>
              Email*
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Postcode*
              <input name="postcode" autoComplete="postal-code" required />
            </label>
            <label>
              Conversion type
              <select name="conversionType" defaultValue="">
                <option value="">Not sure yet</option>
                <option value="Velux / rooflight">Velux / rooflight</option>
                <option value="Rear dormer">Rear dormer</option>
                <option value="Hip-to-gable">Hip-to-gable</option>
                <option value="L-shaped dormer">L-shaped dormer</option>
                <option value="Mansard">Mansard</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={3} placeholder="Tell us about your loft and timeline." />
            </label>
            <label className="wide consent-row">
              <input name="consent" type="checkbox" required /> I agree to be contacted about my
              enquiry.
            </label>
            <button className="primary-button" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Enquiry"}
            </button>
            {message ? <p className={`form-message ${status}`}>{message}</p> : null}
          </form>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading">
            <h2>Quick answers for St Albans loft conversions.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <button
                  key={question}
                  className="faq-card"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
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
        </section>
      </main>

      <section className="accreditations-section" aria-label="Accreditations and memberships">
        <p className="eyebrow accreditations-eyebrow">Accreditations &amp; memberships</p>
        <div className="accreditations-row">
          {accreditations.map((item) => (
            <img key={item.name} src={item.src} alt={item.name} className="accreditation-logo" loading="lazy" />
          ))}
        </div>
      </section>

      <section className="areas-section" aria-label="Areas we cover">
        <div className="section-heading">
          <p className="eyebrow">Areas we cover</p>
          <h2>Loft conversions across St Albans and Harpenden.</h2>
          <p className="areas-body">
            Maycor builds loft conversions in St Albans and nearby Harpenden, covering the
            Georgian and Victorian homes around the Cathedral and city centre as well as the
            wider commuter-belt streets further out. If your area is not listed, get in touch —
            we also cover North London and Hertfordshire more widely.
          </p>
          <p className="areas-body">
            <a href="https://bathroom-renovations.maycor.co.uk/bathroom-renovation-st-albans">Looking for a bathroom renovation instead? →</a>
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <span>Maycor Building Contractors</span>
        <a href="https://maycor.co.uk" target="_blank" rel="noreferrer">
          maycor.co.uk
        </a>
        <span>
          Call us: <a href="tel:+447843746835">07843 746 835</a>
        </span>
      </footer>
    </>
  );
}
