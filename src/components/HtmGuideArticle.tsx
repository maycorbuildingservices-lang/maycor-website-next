import Image from "next/image";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
};

const workflowSteps = [
  {
    title: "1. Transport from surgery",
    text: "Used instruments are moved from the surgery to the decontamination area in a covered tray or rigid container — never carried loose — to protect staff and other surfaces on the way.",
  },
  {
    title: "2. Ultrasonic bath or washer-disinfector",
    text: "Instruments go into an ultrasonic bath (or straight into a washer-disinfector) to remove visible debris and biological material before disinfection. This is the 'dirty' side of the room.",
  },
  {
    title: "3. Washer-disinfector cycle",
    text: "A validated washer-disinfector cycle disinfects the instruments. This is the point the workflow crosses from dirty to clean — instruments never travel back through the dirty zone once they're through this step.",
  },
  {
    title: "4. Inspection",
    text: "Instruments are inspected, typically under magnification, to confirm they're visibly clean and undamaged before sterilisation. Anything that fails inspection goes back through the cycle, not forward.",
  },
  {
    title: "5. Autoclave (sterilisation)",
    text: "A validated autoclave sterilises the inspected instruments.",
  },
  {
    title: "6. Sterile storage",
    text: "Sterilised instruments are stored on the clean side, away from the dirty zone, ready for the next patient.",
  },
];

const faqs: [string, string][] = [
  [
    "What is HTM 01-05 and does my decontamination room need to comply?",
    "HTM 01-05 is the NHS England technical standard for decontaminating reusable dental instruments in primary care practices. It sets out a strict dirty-to-clean workflow, either as two separate rooms or a single Instrument Processing Area (IPA) with a clear physical barrier between dirty and clean zones, plus specific equipment (ultrasonic bath, washer-disinfector, autoclave), sinks, ventilation and surface requirements. If you're registering with the CQC or renewing registration, your decontamination room needs to meet it.",
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
    "Do I need CQC approval before starting building work on my practice?",
    "You should get a feasibility survey done before signing a lease or committing fit-out spend. CQC registration (Regulation 15, Premises and Equipment) can take 16+ weeks, and building constraints like drainage runs, floor loading or ceiling height for X-ray lead lining can rule out a site after the fact. We carry out a technical feasibility check — drainage, structure, access — before you commit.",
  ],
];

export function HtmGuideArticle() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "HTM 01-05 Decontamination Room Guide for Dental Practices",
    description:
      "What HTM 01-05 actually requires for a dental decontamination room: the dirty-to-clean workflow, two-room split vs single IPA, equipment sequence, and surface requirements.",
    author: { "@type": "Organization", name: "Maycor Building Contractors" },
    publisher: { "@type": "Organization", name: "Maycor Building Contractors" },
    mainEntityOfPage: "https://dental.maycor.co.uk/htm-01-05-decontamination-room-guide/",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dental.maycor.co.uk/" },
      { "@type": "ListItem", position: 2, name: "HTM 01-05 Decontamination Room Guide", item: "https://dental.maycor.co.uk/htm-01-05-decontamination-room-guide/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="/" aria-label="Maycor dental practice refurbishment home">
          <Image src={images.logo} alt="Maycor Building Contractors" width={300} height={93} priority />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="/#services">Services</a>
          <a href="/#work">Our Projects</a>
          <a href="/#process">Process</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/447843746835" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="header-call" href="/#enquiry">
            Book a Feasibility Survey
          </a>
        </div>
      </header>

      <main id="top" className="article-page">
        <article className="article-body">
          <p className="eyebrow">Dental practice compliance</p>
          <h1>HTM 01-05: what your decontamination room actually needs to comply</h1>
          <p className="article-lede">
            HTM 01-05 is the NHS England technical standard for decontaminating reusable dental
            instruments in primary care. If you&apos;re registering a practice with the CQC, or
            renewing registration, your decontamination room needs to meet it — and the
            building constraints it brings are worth understanding before you sign a lease, not
            after.
          </p>

          <h2>The core principle: dirty-to-clean, one direction only</h2>
          <p>
            Everything in HTM 01-05 exists to enforce one rule: instruments move from dirty to
            clean and never back the other way. Once an instrument has passed through
            disinfection, it cannot re-enter the dirty zone. That single rule is what shapes the
            room layout, the equipment sequence and the physical barrier between zones.
          </p>

          <h2>Two-room split, or a single Instrument Processing Area</h2>
          <p>
            Where floor area allows it, HTM 01-05 permits a dedicated dirty room and a separate
            clean room. Where it doesn&apos;t, a single Instrument Processing Area (IPA) is
            acceptable — as long as there&apos;s a clear physical barrier between the dirty and
            clean sides. That barrier can be a wall or a marked worktop divide; what matters is
            that instruments never travel back through the dirty side once they&apos;re through
            disinfection. Which option makes sense depends entirely on the floor area you
            actually have.
          </p>

          <h2>The equipment sequence</h2>
          <p>
            Instruments follow a fixed sequence from surgery to sterile storage:
          </p>
          <div className="cost-drivers-grid">
            {workflowSteps.map((step) => (
              <div key={step.title} className="cost-driver-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <h2>Surfaces and drainage</h2>
          <p>
            Worktops need to be non-porous, seamless and chemical-resistant — no joins or
            grout lines for contamination to sit in. Flooring needs to be impervious and coved
            up the wall, with no 90-degree corners where dirt and moisture can collect;
            welded-seam vinyl flooring is the standard specification for both the surgery and
            the decontamination room. Drainage needs to be positioned correctly for the
            washer-disinfector and sinks, which is exactly the kind of detail a feasibility
            survey catches before you&apos;ve committed to a site.
          </p>

          <h2>Where CQC fits in</h2>
          <p>
            CQC registration falls under Regulation 15 (Premises and Equipment), and it can
            take 16 or more weeks. Building constraints — drainage runs, floor loading, ceiling
            height for X-ray lead lining — can rule out a site after you&apos;ve already
            committed to it. A technical feasibility survey (drainage, structure, access)
            before signing a lease or committing fit-out spend is the way to avoid finding that
            out too late.
          </p>

          <h2>How Maycor approaches this</h2>
          <p>
            The decontamination room is designed around the correct sink sequence, equipment
            run and physical barrier between zones from the start — not adjusted after the
            build begins. X-ray lead lining and the decontamination layout are signed off with
            your Radiation Protection Adviser and appointed decontamination lead before we
            build, not after. One team runs strip-out through to finishing, sequenced around
            HTM 01-05 workflow and CQC premises requirements — surgery fit-out, decontamination
            room, X-ray room lead lining, dental chair plumbing and electrics, coordinated
            together rather than handed between separate trades.
          </p>

          <h2>Frequently asked questions</h2>
          <div className="cost-faq-list">
            {faqs.map(([question, answer]) => (
              <div key={question} className="cost-faq-item">
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>

          <div className="cost-guide-cta">
            <p>Check your site against HTM 01-05 and CQC Regulation 15 before you commit to it.</p>
            <a className="primary-button" href="/#enquiry">
              Book a Feasibility Survey
            </a>
          </div>
        </article>
      </main>

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
