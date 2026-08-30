import Image from "next/image";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
  hero: "/images/story-dark-tile-vanity.jpg",
};

type PriceRow = {
  size: string;
  sqm: string;
  standard: string;
  mid: string;
  premium: string;
};

const priceTable: PriceRow[] = [
  { size: "WC / Cloakroom", sqm: "toilet & basin only", standard: "£3,900 – £5,900", mid: "£4,900 – £7,400", premium: "£5,500 – £8,300" },
  { size: "Very small bathroom", sqm: "2–3 sqm", standard: "£5,400 – £8,200", mid: "£6,800 – £10,300", premium: "£7,600 – £11,500" },
  { size: "Small bathroom", sqm: "3–5 sqm", standard: "£5,800 – £9,100", mid: "£7,300 – £11,400", premium: "£8,100 – £12,700" },
  { size: "Medium bathroom", sqm: "5–8 sqm", standard: "£7,400 – £11,800", mid: "£9,300 – £14,800", premium: "£10,400 – £16,500" },
  { size: "Large bathroom", sqm: "8+ sqm", standard: "£9,600 – £15,500", mid: "£12,000 – £19,400", premium: "£13,400 – £21,700" },
];

const costDrivers = [
  {
    title: "Access difficulty",
    detail:
      "Easy street-level access costs less to work with than a top-floor flat with no lift, narrow stairs, or restricted parking for skips and deliveries — every extra hour of carrying materials and waste in and out adds labour time.",
  },
  {
    title: "How much the layout is changing",
    detail:
      "Keeping the bath, basin and toilet where they already are is the cheapest option. Moving any of them — even by a metre — means moving supply and waste pipework, which is where light, moderate and full-reconfiguration jobs start to separate in price.",
  },
  {
    title: "Structural changes",
    detail:
      "Only relevant if a wall is coming down, a floor needs strengthening, or an opening is being altered. Most renovations need none of this, but period properties occasionally do.",
  },
  {
    title: "What has to come out first",
    detail:
      "Nothing to remove, a partial strip-out, or a full remove-and-dispose of an old suite all take different amounts of time before the new room can even start going in.",
  },
  {
    title: "Shower type",
    detail:
      "An exposed mixer over the bath is the simplest option. A concealed in-wall mixer with an overhead head costs more in labour to chase and box in. A walk-in wet room — full tanking, a pump if the fall to waste needs help — is the most involved and the biggest single jump in the suite.",
  },
  {
    title: "Heating",
    detail:
      "A standard towel rail is the baseline. Underfloor heating and designer heated towel rails add both materials and installation labour.",
  },
  {
    title: "Electrics scope",
    detail:
      "Ranges from minimal changes (reusing existing circuits) to a full rewire with new lighting, shaver sockets and extraction — the more that changes, the more first-fix and testing time it needs.",
  },
  {
    title: "Tiling coverage and pattern",
    detail:
      "Tiling to the ceiling in wet zones costs more than a half-height splashback. Mosaics, herringbone, and large-format patterns take longer to set out and cut than a straightforward brick-bond layout in a standard size tile.",
  },
];

const faqs: [string, string][] = [
  [
    "Is the price range the final quote?",
    "No — it's there to keep the first conversation realistic. A fixed quote follows a site visit, once room dimensions and access are confirmed.",
  ],
  [
    "Why is there such a wide range for the same room size?",
    "The low end assumes a standard finish with no layout changes and easy access. The high end assumes premium fittings, a full reconfiguration, or a difficult-access property. Most jobs land somewhere between the two, not at either extreme.",
  ],
  [
    "Does this price include VAT?",
    "Get this confirmed directly for your specific quote — it isn't something to assume either way from a general guide.",
  ],
  [
    "What's included in a Maycor renovation at these prices?",
    "Strip-out, plumbing, electrics, waterproofing, tiling, decorating, fittings and waste removal, coordinated by one team from start to finish.",
  ],
];

export function CostGuideArticle() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bathroom Renovation Cost Guide for London",
    description:
      "Real bathroom renovation price ranges for London by room size and finish level, and what actually pushes the cost up or down.",
    author: { "@type": "Organization", name: "Maycor Building Contractors" },
    publisher: { "@type": "Organization", name: "Maycor Building Contractors" },
    mainEntityOfPage: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-cost-guide-london/",
    image: "https://bathroom-renovations.maycor.co.uk/images/story-dark-tile-vanity.jpg",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bathroom-renovations.maycor.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Bathroom Renovations London", item: "https://bathroom-renovations.maycor.co.uk/bathroom-renovations-london/" },
      { "@type": "ListItem", position: 3, name: "Bathroom Renovation Cost Guide", item: "https://bathroom-renovations.maycor.co.uk/bathroom-renovation-cost-guide-london/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="/bathroom-renovations-london/" aria-label="Maycor bathroom renovations home">
          <Image src={images.logo} alt="Maycor Building Contractors" width={300} height={93} priority />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="/bathroom-renovations-london/#estimate">Estimate</a>
          <a href="/bathroom-renovations-london/#work">Our Gallery</a>
          <a href="/bathroom-renovations-london/#included">Included</a>
          <a href="/bathroom-renovations-london/#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/447843746835" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="header-call" href="/bathroom-renovations-london/#estimate">
            Get My Estimate
          </a>
        </div>
      </header>

      <main id="top" className="article-page">
        <article className="article-body">
          <p className="eyebrow">Bathroom renovation cost in London</p>
          <h1>How much does a bathroom renovation really cost in London?</h1>
          <p className="article-lede">
            A London bathroom renovation typically costs between <strong>£3,900 and £21,700</strong>,
            depending on room size and finish level. Most homeowners land somewhere in the
            middle of that range — the two ends represent a standard-finish WC refit at one end
            and a large, premium-finish room with a full reconfiguration at the other.
          </p>

          <h2>Cost by room size and finish level</h2>
          <p>
            These ranges are Maycor&apos;s standard estimate bands, rounded to the nearest £100.
            They assume no major layout changes and easy access — the section below on what
            pushes the price up explains what moves a job toward the top of its range.
          </p>

          <div className="cost-table-wrap">
            <table className="cost-table">
              <thead>
                <tr>
                  <th>Room size</th>
                  <th>Standard finish</th>
                  <th>Mid-range finish</th>
                  <th>Premium finish</th>
                </tr>
              </thead>
              <tbody>
                {priceTable.map((row) => (
                  <tr key={row.size}>
                    <td>
                      <strong>{row.size}</strong>
                      <span className="cost-table-sqm">{row.sqm}</span>
                    </td>
                    <td>{row.standard}</td>
                    <td>{row.mid}</td>
                    <td>{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Mid-range finish runs roughly 25% above standard, and premium roughly 40% above
            standard — better tiles, sanitaryware and fittings, not a different scope of work.
            For your exact range, based on your actual room and choices, use the{" "}
            <a href="/bathroom-renovations-london/#estimate">estimate calculator</a>.
          </p>

          <h2>What&apos;s included at these prices</h2>
          <p>
            A Maycor renovation is coordinated by one team from strip-out to finish: plumbing,
            electrics, waterproofing, tiling, decorating, fittings and waste removal. You are
            not managing separate trades or gaps between them.
          </p>

          <h2>What pushes the price up (or keeps it down)</h2>
          <p>
            Room size and finish level set the base range. Everything below is what moves a
            specific job within — or beyond — that range.
          </p>
          <div className="cost-drivers-grid">
            {costDrivers.map((driver) => (
              <div key={driver.title} className="cost-driver-card">
                <h3>{driver.title}</h3>
                <p>{driver.detail}</p>
              </div>
            ))}
          </div>

          <h2>How the estimate becomes a fixed quote</h2>
          <p>
            The range above is there to keep the first conversation realistic. A fixed quote
            follows once the room and site conditions are checked — access, existing pipe
            runs, and any structural work confirmed in person rather than estimated from a
            calculator.
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
            <p>Get a range for your actual room, not a general estimate.</p>
            <a className="primary-button" href="/bathroom-renovations-london/#estimate">
              See My Bathroom Cost
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
