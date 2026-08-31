import Image from "next/image";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
};

const regCategories = [
  {
    title: "Clean",
    text: "Hygiene standards appropriate for infection prevention and control, and for carrying on the regulated activity — the basis for the dirty-to-clean decontamination workflow and non-porous, seamless surfaces throughout the surgery.",
  },
  {
    title: "Secure",
    text: "The premises need to be secure for the activity carried on — controlled access to clinical areas, and secure storage where controlled drugs or patient records are kept.",
  },
  {
    title: "Suitable for the purpose",
    text: "Rooms need to be fit for what they're actually used for — a decontamination room needs the correct dirty-to-clean workflow (HTM 01-05), an X-ray room needs lead lining sized and positioned to your Radiation Protection Adviser's report, not a generic spec.",
  },
  {
    title: "Properly used",
    text: "Equipment and rooms used as intended, by trained staff, following the workflow they were designed around — a compliance point that sits with the practice's procedures as much as the building itself.",
  },
  {
    title: "Properly maintained",
    text: "Ongoing maintenance and testing of equipment and premises — not just a one-off build standard at handover, but something the practice needs to be able to evidence on an ongoing basis.",
  },
  {
    title: "Appropriately located",
    text: "Drainage runs, floor loading and ceiling height need to support what's being installed — issues that can rule out a site after you've already committed to it if they're not checked first.",
  },
];

const equipmentPoints = [
  {
    title: "Suitable for its purpose",
    text: "Ultrasonic baths, washer-disinfectors and autoclaves specified and installed correctly for the decontamination workflow they sit within.",
  },
  {
    title: "Decontaminated where appropriate",
    text: "Equipment used in the dirty-to-clean workflow needs to support the disinfection/sterilisation sequence, not work against it — the reason the dirty and clean sides need a clear physical barrier.",
  },
  {
    title: "Properly maintained",
    text: "Validated, serviced equipment — washer-disinfectors and autoclaves are typically on a periodic testing and validation schedule, which is a fit-out design input, not an afterthought (drainage, power and space need to be right from the start).",
  },
];

const faqs: [string, string][] = [
  [
    "What is CQC Regulation 15?",
    "Regulation 15 (Premises and Equipment) of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 requires that premises and equipment used for a regulated activity are clean, secure, suitable for their purpose, properly used, properly maintained, and appropriately located. It applies to all CQC-regulated activities, not only dental practices, but it's the regulation your premises are assessed against as part of registration.",
  ],
  [
    "Does a fit-out or refurbishment guarantee CQC registration?",
    "No — a compliant building is one input into registration, not the whole process. Registration also covers staffing, governance, infection control procedures and more. What a well-designed fit-out does is remove the premises and equipment risk, so a building issue doesn't hold up registration or an inspection later.",
  ],
  [
    "How long does CQC registration take, and when should the fit-out start?",
    "CQC registration can take 16 or more weeks. A feasibility survey — checking drainage, structure, floor loading and access against what the fit-out will need — should happen before you sign a lease or commit spend, so a building constraint doesn't rule out a site after you've already committed to it.",
  ],
  [
    "Who signs off the X-ray room and decontamination room design?",
    "X-ray lead lining is signed off against your Radiation Protection Adviser's (RPA) report under IRR17/IRMER — the exact lead thickness and coverage is set per room, not a fixed spec. The decontamination room's workflow is agreed with your appointed decontamination lead. Both should be coordinated during design, before the build starts.",
  ],
];

export function CqcChecklistArticle() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CQC Regulation 15 Checklist for Dental Practices",
    description:
      "What CQC Regulation 15 (Premises and Equipment) actually requires, and a practical checklist for dental practice fit-out and refurbishment projects.",
    author: { "@type": "Organization", name: "Maycor Building Contractors" },
    publisher: { "@type": "Organization", name: "Maycor Building Contractors" },
    mainEntityOfPage: "https://dental.maycor.co.uk/cqc-regulation-15-checklist/",
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
      { "@type": "ListItem", position: 2, name: "CQC Regulation 15 Checklist", item: "https://dental.maycor.co.uk/cqc-regulation-15-checklist/" },
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
          <h1>CQC Regulation 15: a practical premises and equipment checklist</h1>
          <p className="article-lede">
            Regulation 15 (Premises and Equipment) of the Health and Social Care Act 2008
            (Regulated Activities) Regulations 2014 sets the standard your practice&apos;s
            premises and equipment are assessed against for CQC registration. It applies across
            all regulated activities, not just dental — here&apos;s what it actually asks for,
            and how that maps onto a dental fit-out.
          </p>

          <h2>What Regulation 15 requires</h2>
          <p>
            In summary, premises and equipment used for a regulated activity must be clean,
            secure, suitable for their purpose, properly used, properly maintained, and
            appropriately located. Where equipment is used, it must additionally be suitable for
            its purpose, decontaminated where appropriate, and properly maintained. Six
            requirements for premises, three for equipment — all of them things a fit-out either
            gets right from the design stage, or has to be corrected later.
          </p>
          <div className="cost-drivers-grid">
            {regCategories.map((item) => (
              <div key={item.title} className="cost-driver-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <h2>What this means for equipment specifically</h2>
          <p>
            Regulation 15(3) adds equipment-specific requirements, directly relevant to a
            decontamination room&apos;s ultrasonic bath, washer-disinfector and autoclave:
          </p>
          <div className="cost-drivers-grid">
            {equipmentPoints.map((item) => (
              <div key={item.title} className="cost-driver-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <h2>Where a fit-out project should start</h2>
          <p>
            A feasibility survey — checking drainage runs, structure, floor loading and access
            against what the fit-out will need — should happen before you sign a lease or commit
            spend. CQC registration can take 16 or more weeks, and a building constraint
            discovered after you&apos;ve committed to a site is far more expensive to fix than
            one caught at feasibility stage.
          </p>

          <h2>How Maycor approaches this</h2>
          <p>
            The decontamination room, X-ray room and surgery fit-out are designed around
            Regulation 15&apos;s premises and equipment requirements from the first site visit —
            X-ray lead lining signed off against your Radiation Protection Adviser&apos;s report,
            decontamination workflow agreed with your decontamination lead, drainage and floor
            loading checked before you commit to a site. One team runs strip-out through to
            finishing, so the building doesn&apos;t become the thing holding up your
            registration.
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

          <p className="article-lede" style={{ fontSize: "0.95rem", opacity: 0.75 }}>
            This is practical guidance for planning a fit-out, not legal or regulatory advice —
            always check current requirements against CQC&apos;s own guidance for your specific
            registration.
          </p>

          <div className="cost-guide-cta">
            <p>Check your site against Regulation 15 and HTM 01-05 before you commit to it.</p>
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
