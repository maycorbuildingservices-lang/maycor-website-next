"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
  hero: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg",
};

// Placeholder gallery — swap for Victor's before/during/completion project photos when supplied.
const galleryPhotos = [
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-20.jpg",
    caption: "Dental surgery fit-out — completed treatment room",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-19.jpg",
    caption: "Dental practice refurbishment — reception and waiting area",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-31.jpg",
    caption: "Dentist refurbishment — surgery room finish",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-32.jpg",
    caption: "Dentist refurbishment — completed clinical space",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-16.jpg",
    caption: "Dental practice fit-out — surgery detail",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-17.jpg",
    caption: "Dental practice fit-out — finished interior",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-27.jpg",
    caption: "Dentist refurbishment — clinical fit-out",
  },
  {
    src: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-28.jpg",
    caption: "Dentist refurbishment — practice interior",
  },
];

const proofPoints = [
  [
    "Compliance-led from day one",
    "HTM 01-05 decontamination workflow and CQC Regulation 15 premises requirements designed in from the start, not bolted on after.",
  ],
  [
    "One accountable team",
    "Structural work, M&E, X-ray lead lining and finishing coordinated by Maycor — no chasing five separate trades.",
  ],
  [
    "London and nationwide",
    "Dental practice fit-out experience across the UK, not just local jobs.",
  ],
];

const included = [
  "Surgery room strip-out and fit-out",
  "Decontamination room build to HTM 01-05 (two-room split or single IPA)",
  "X-ray room lead lining, coordinated with your RPA",
  "Dental chair plumbing, suction pipework and data cabling",
  "Electrical upgrades: LED lighting, power and fire alarm",
  "Non-porous worktops and coved, welded-seam flooring",
  "Stud walls and layout reconfiguration",
  "Waiting room, reception and cabinetry finishing",
];

const process = [
  [
    "Feasibility survey",
    "Before you sign a lease or commit spend, we check drainage, structure, floor loading and access against what the fit-out will need.",
  ],
  [
    "Design & compliance coordination",
    "We work directly with your Radiation Protection Adviser and decontamination lead so the layout is right before anything is built.",
  ],
  [
    "Build",
    "One team runs strip-out through to finishing, sequenced around HTM 01-05 workflow and CQC premises requirements.",
  ],
  [
    "Handover",
    "A completed surgery and decontamination room, ready for equipment install and CQC inspection.",
  ],
];

const compliancePoints = [
  {
    title: "Dirty-to-clean workflow, done right",
    text: "Your decontamination room is designed around the correct sink sequence, equipment run and physical barrier between dirty and clean zones — whether that's two rooms or a single Instrument Processing Area (IPA).",
  },
  {
    title: "Surfaces and drainage that pass inspection",
    text: "Non-porous worktops, coved welded-seam flooring, and drainage positioned correctly for your washer-disinfector and sinks.",
  },
  {
    title: "Coordinated with your RPA and decon lead",
    text: "X-ray lead lining and decontamination layout signed off with your Radiation Protection Adviser and appointed decontamination lead before we build, not after.",
  },
];

const faqs: [string, string][] = [
  [
    "What is HTM 01-05 and does my decontamination room need to comply?",
    "HTM 01-05 is the NHS England technical standard for decontaminating reusable dental instruments in primary care practices. It sets out a strict dirty-to-clean workflow, either as two separate rooms or a single Instrument Processing Area (IPA) with a clear physical barrier between dirty and clean zones, plus specific equipment (ultrasonic bath, washer-disinfector, autoclave), sinks, ventilation and surface requirements. If you're registering with the CQC or renewing registration, your decontamination room needs to meet it.",
  ],
  [
    "Do I need CQC approval before starting building work on my practice?",
    "You should get a feasibility survey done before signing a lease or committing fit-out spend. CQC registration (Regulation 15, Premises and Equipment) can take 16+ weeks, and building constraints like drainage runs, floor loading or ceiling height for X-ray lead lining can rule out a site after the fact. We carry out a technical feasibility check — drainage, structure, access — before you commit.",
  ],
  [
    "Can I have a single Instrument Processing Area instead of two separate decontamination rooms?",
    "Yes. Where space doesn't allow a two-room split, a single IPA is acceptable under HTM 01-05, as long as there's a clear physical barrier — a wall or a marked worktop divide — between the dirty and clean sides, and instruments never move back through the dirty zone once sterile. We design the layout either way, depending on your floor area.",
  ],
  [
    "What flooring and worktops are required in a dental surgery?",
    "Non-porous, seamless, chemical-resistant worktops, and impervious flooring coved up the wall — no 90-degree corners that trap dirt. We fit welded-seam vinyl flooring, the standard specification for dental surgeries and decontamination rooms.",
  ],
  [
    "Do you handle X-ray room lead lining?",
    "Yes — lead-lined walls, doors and viewing panels, sized and positioned to your Radiation Protection Adviser's (RPA) report. The exact lead thickness and coverage is set per room by your RPA under IRR17/IRMER, not a fixed spec, so we coordinate directly with them during design.",
  ],
  [
    "How long does a dental practice refurbishment take?",
    "A single surgery upgrade can be a few weeks. A multi-surgery practice with a new decontamination room typically runs 4-5 months from strip-out to equipment install, depending on scope and whether you're extending or reconfiguring the layout.",
  ],
  [
    "Do you work outside London?",
    "Yes. Maycor is based in London, but dental practice fit-out work takes us across the UK.",
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

export function DentalRefurbLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Maycor Building Contractors",
    url: "https://dental.maycor.co.uk/",
    areaServed: ["London", "United Kingdom"],
    telephone: "+447843746835",
    image: images.hero,
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
        name: "Dental Practice Refurbishment & Fit-Out",
        description:
          "HTM 01-05 compliant decontamination room construction, CQC Regulation 15 premises-compliant surgery fit-outs, X-ray room lead lining coordinated with your Radiation Protection Adviser, dental chair plumbing and electrics, and full practice refurbishment.",
        areaServed: ["London", "United Kingdom"],
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dental.maycor.co.uk/" },
    ],
  };

  function showPrevPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current - 1 + galleryPhotos.length) % galleryPhotos.length));
  }

  function showNextPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current + 1) % galleryPhotos.length));
  }

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
        practiceName: String(form.get("practiceName") || "").trim(),
        surgeries: String(form.get("surgeries") || "").trim(),
        projectType: String(form.get("projectType") || "").trim(),
        message: String(form.get("message") || "").trim(),
        consent: Boolean(form.get("consent")),
      },
    };

    try {
      const response = await fetch("/api/dental-lead", {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="#top" aria-label="Maycor dental practice refurbishment page top">
          <Image src={images.logo} alt="Maycor Building Contractors" width={300} height={93} priority />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#services">Services</a>
          <a href="#work">Our Projects</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/447843746835" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="header-call" href="#enquiry">
            Book a Feasibility Survey
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <Image
            src={images.hero}
            alt="Completed dental surgery fit-out by Maycor"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">Dental practice fit-out &amp; refurbishment contractors</p>
            <h1>Dental practice refurbishment, built to HTM 01-05 and CQC standards, start to finish.</h1>
            <p className="hero-copy">
              Maycor manages the full fit-out: surgery rooms, HTM 01-05 compliant decontamination
              rooms, X-ray room lead lining, dental chair plumbing and electrics, flooring and
              finishing — coordinated by one team.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#enquiry">
                Book a Survey
              </a>
              <a className="secondary-button" href="#work">
                View Our Projects
              </a>
            </div>
          </div>
        </section>

        <div className="hero-proof" aria-label="Maycor dental fit-out proof points">
          {proofPoints.map(([title, text]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <section className="story-section">
          <div className="story-media">
            <Image
              src={galleryPhotos[1].src}
              alt={galleryPhotos[1].caption}
              width={1200}
              height={1600}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">The Maycor difference</p>
            <h2>A dental refurbishment should not put your registration at risk.</h2>
            <p>
              Compliance failures in a dental fit-out are expensive to fix after the fact — a
              decontamination room built to the wrong workflow, or an X-ray room lead-lined
              without sign-off from your Radiation Protection Adviser, can hold up your CQC
              registration by months.
            </p>
            <p>
              Maycor designs and builds around HTM 01-05 and CQC Regulation 15 from the first
              site visit, so the fit-out is right the first time — not corrected after an
              inspection.
            </p>
            <div className="story-stats">
              <div>
                <strong>2018</strong>
                <span>delivering dental fit-outs</span>
              </div>
              <div>
                <strong>UK-wide</strong>
                <span>practice refurbishments</span>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Recent dental projects</p>
            <h2>Real surgery and decontamination room fit-outs.</h2>
          </div>
          <div className="dental-gallery-grid">
            {galleryPhotos.map((photo, photoIndex) => (
              <figure
                key={photo.src}
                onClick={() => setLightboxIndex(photoIndex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setLightboxIndex(photoIndex);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.caption}`}
              >
                <div className="dental-gallery-image">
                  <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 640px) 90vw, 380px" />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="london-section">
          <div>
            <p className="eyebrow">Built around HTM 01-05 and CQC compliance</p>
            <h2>The compliance detail matters as much as the finish.</h2>
          </div>
          <div className="london-list">
            {compliancePoints.map((point) => (
              <article key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="included-section" id="services">
          <div className="section-heading">
            <p className="eyebrow">What is included</p>
            <h2>The full dental practice fit-out, coordinated by one team.</h2>
          </div>
          <div className="included-grid">
            {included.map((item) => (
              <div key={item} className="included-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="eyebrow">How the project moves</p>
            <h2>A compliance-led route from feasibility survey to handover.</h2>
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

        <section className="estimate-panel calculator-compact" id="enquiry" aria-labelledby="enquiry-heading">
          <div className="estimate-copy">
            <p className="eyebrow">Book a feasibility survey</p>
            <h2 id="enquiry-heading">
              <span className="estimate-highlight">Tell us about your practice, we&apos;ll take it from there.</span>
            </h2>
            <p>
              Whether it&apos;s a single surgery refresh or a full multi-surgery fit-out with a new
              decontamination room, tell us the scope and we&apos;ll arrange a feasibility survey
              before you commit to anything.
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
              Practice name*
              <input name="practiceName" autoComplete="organization" required />
            </label>
            <label>
              Number of surgeries*
              <select name="surgeries" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="1 surgery">1 surgery</option>
                <option value="2-3 surgeries">2-3 surgeries</option>
                <option value="4+ surgeries">4+ surgeries</option>
              </select>
            </label>
            <label>
              Project type*
              <select name="projectType" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="New practice fit-out">New practice fit-out</option>
                <option value="Refurbishment of existing surgery">Refurbishment of existing surgery</option>
                <option value="Decontamination room only">Decontamination room only</option>
                <option value="Extension or expansion">Extension or expansion</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={3} placeholder="Tell us about your project and timeline." />
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
            <h2>Quick answers for dental practice refurbishments.</h2>
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
          <h2>Dental practice refurbishments across London and the UK.</h2>
          <p className="areas-body">
            Maycor carries out dental practice fit-outs and refurbishments across London and
            nationwide. If your practice is outside London, get in touch — dental fit-out work
            takes us across the UK.
          </p>
          <p className="areas-body">
            <a href="/bathroom-renovations-london/">Looking for a bathroom renovation instead? →</a>
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

      {lightboxIndex !== null ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex(null);
            }}
          >
            ×
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              showPrevPhoto();
            }}
          >
            ‹
          </button>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={galleryPhotos[lightboxIndex].src} alt={galleryPhotos[lightboxIndex].caption} fill sizes="100vw" />
            <p className="lightbox-caption">{galleryPhotos[lightboxIndex].caption}</p>
          </div>
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              showNextPhoto();
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
