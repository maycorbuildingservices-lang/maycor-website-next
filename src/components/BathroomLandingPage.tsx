import Image from "next/image";
import { EstimateStarter } from "./EstimateStarter";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
  hero: "/images/hero-bathroom-vanity-mirror.jpg",
  shower: "https://maycor.co.uk/wp-content/uploads/2026/01/IMG_1766-scaled.jpg",
  wc: "https://maycor.co.uk/wp-content/uploads/2025/12/IMG_1756-scaled.jpg",
  niche: "https://maycor.co.uk/wp-content/uploads/2026/01/IMG_1774-scaled.jpg",
  vanity: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-7.jpg",
  bath: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-9.jpg",
};

const proofPoints = [
  ["One accountable team", "Planning, strip-out, plumbing, electrics, tiling and finishing coordinated by Maycor."],
  ["Built for London homes", "Compact rooms, older pipework, access constraints and lived-in properties handled properly."],
  ["Estimate first", "A clear range and a full breakdown before you commit to the next step."],
];

const included = [
  "Site protection and strip-out",
  "Plumbing and waste alterations",
  "Electrical upgrades and testing",
  "Waterproofing and wet-room preparation",
  "Wall and floor tiling",
  "Sanitaryware, brassware and fittings",
  "Heating, mirrors and accessories",
  "Waste removal and finishing details",
];

const process = [
  ["Estimate", "Start with the range so the conversation begins in the right place."],
  ["Survey", "We inspect access, services, walls, floors, ventilation and layout risks."],
  ["Breakdown", "You receive a clear scope with what is included and what can change cost."],
  ["Build", "One team coordinates the messy middle and keeps the finish under control."],
];

  const faqs = [
    [
      "Can you handle the whole bathroom renovation?",
      "Yes. Maycor can coordinate strip-out, plumbing, electrics, waterproofing, tiling, decorating, fittings and waste removal.",
    ],
    [
      "Are you insured?",
      "Yes. Maycor carries the relevant insurance for renovation work, and details can be confirmed on request.",
    ],
    [
      "Do you offer a warranty?",
      "Yes. The work is covered by a 1-year warranty for added peace of mind.",
    ],
    [
      "Do you work with small London bathrooms?",
      "Yes. Compact rooms are often where planning matters most: storage, ventilation, access, pipe routes and tile layout all affect the result.",
    ],
  [
    "Is the calculator range the final quote?",
    "The range is there to keep the first conversation realistic. A final scope is confirmed after the room and site conditions are checked.",
  ],
  [
    "Can I use my own sanitaryware or tiles?",
    "Yes. The important part is confirming sizes, compatibility, lead times and whether extra preparation is needed.",
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Maycor Building Contractors",
  url: "https://maycor.co.uk/bathroom-renovations-london/",
  areaServed: "London",
  telephone: "+442080507057",
  image: images.hero,
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Bathroom renovations in London",
    },
  },
};

export function BathroomLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="#top" aria-label="Maycor bathroom renovations page top">
          <Image
            src={images.logo}
            alt="Maycor Building Contractors"
            width={300}
            height={93}
            priority
          />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#estimate">Estimate</a>
          <a href="#work">Work</a>
          <a href="#included">Included</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-call" href="#estimate">
          Continue Estimate
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <Image
            src={images.hero}
            alt="Modern bathroom renovation with illuminated round mirror and black vanity"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">Bathroom renovations in London</p>
            <h1>From tired bathroom to calm, finished space.</h1>
            <p className="hero-copy">
              Maycor manages the full renovation: strip-out, plumbing, electrics,
              waterproofing, tiling, sanitaryware, finishing and waste removal.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#estimate">
                See My Bathroom Cost
              </a>
              <a className="secondary-button" href="#work">
                See the kind of finish
              </a>
            </div>
          </div>
        </section>

        <div className="hero-proof" aria-label="Maycor renovation proof points">
          {proofPoints.map(([title, text]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <EstimateStarter />

        <section className="story-section">
          <div className="story-media">
            <Image
              src={images.shower}
              alt="Walk-in shower and fitted vanity in a completed bathroom"
              width={980}
              height={1220}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">The Maycor difference</p>
            <h2>A bathroom renovation should not feel like chasing five trades.</h2>
            <p>
              The best bathroom projects feel controlled from the first visit.
              Layout, pipe routes, waterproofing, tile setting-out, lighting,
              ventilation and finishing all need to work together.
            </p>
            <p>
              That is why this page is built around the estimate first. Once the
              budget range makes sense, the survey can focus on the details that
              protect the finish and prevent expensive surprises.
            </p>
          </div>
        </section>

        <section className="gallery-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Recent finish direction</p>
            <h2>Clean lines, practical detailing, spaces that feel settled.</h2>
          </div>
          <div className="gallery-grid">
            <figure className="gallery-large">
              <Image
                src={images.vanity}
                alt="Double vanity bathroom renovation detail"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>
            <figure>
              <Image src={images.wc} alt="Wall hung toilet detail" fill sizes="(max-width: 900px) 50vw, 25vw" />
            </figure>
            <figure>
              <Image src={images.niche} alt="Recessed shower niche with tiling" fill sizes="(max-width: 900px) 50vw, 25vw" />
            </figure>
            <figure className="gallery-wide">
              <Image src={images.bath} alt="Freestanding bath in a loft bathroom" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </figure>
          </div>
        </section>

        <section className="london-section">
          <div>
            <p className="eyebrow">Built for real London homes</p>
            <h2>The hidden work matters as much as the visible finish.</h2>
          </div>
          <div className="london-list">
            <article>
              <h3>Tight access and occupied homes</h3>
              <p>Protection, loading, waste movement and daily sequencing are planned before the project starts.</p>
            </article>
            <article>
              <h3>Older services and awkward routes</h3>
              <p>Pipework, wastes, electrics and ventilation are checked properly before the design is locked.</p>
            </article>
            <article>
              <h3>Compact rooms that need precision</h3>
              <p>Small bathrooms need careful setting-out so the room feels intentional, not squeezed.</p>
            </article>
          </div>
        </section>

        <section className="included-section" id="included">
          <div className="section-heading">
            <p className="eyebrow">What is included</p>
            <h2>Everything that usually gets split between trades.</h2>
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
            <h2>A calm route from first estimate to finished bathroom.</h2>
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

        <section className="cta-band" id="lead">
          <div>
            <p className="eyebrow">Ready to price the room properly?</p>
            <h2>Start with the estimate, then Maycor can shape the real scope around your home.</h2>
          </div>
          <a className="primary-button" href="#estimate">
            Start My 3-Minute Estimate
          </a>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading">
            <p className="eyebrow">Questions before you start</p>
            <h2>Quick answers for London bathroom projects.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Maycor Building Contractors</span>
        <a href="https://maycor.co.uk">maycor.co.uk</a>
      </footer>
    </>
  );
}
