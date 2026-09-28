import type { Metadata } from "next";
import Image from "next/image";
import { accreditations } from "@/components/BathroomLandingPage";
import { BathroomFaq } from "@/components/BathroomFaq";
import { costDrivers, costFaqs, priceTable } from "@/components/CostGuideArticle";
import { EstimateStarter } from "@/components/EstimateStarter";
import { WhatsAppLink } from "@/components/WhatsAppLink";

/*
 * Paid-ads landing page for the "Cost & Prices" ad group (added 2026-09-28, Victor's OK).
 * A test of whether a dedicated page beats /london#estimate on landing-page experience: the
 * H1 mirrors the ad headlines ("Bathroom Renovation Cost", "Bathroom Cost Calculator", "See Your
 * Price in 3 Minutes") and the calculator sits at the top. noindex + not in the sitemap, so it
 * doesn't compete with /bathroom-renovation-cost-guide-london in organic search. Prices come from
 * the cost guide's own tables so the two can never disagree.
 */

const title = "Bathroom Renovation Cost in London | See Your Price in 3 Minutes";
const description =
  "Bathroom renovation cost in London: use the calculator for your own price range in about 3 minutes. Full renovations typically £6,000–£20,000+.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/london/bathroom-renovation-cost" },
  robots: { index: false, follow: true },
};

const logo = "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png";

const photos = [
  { src: "/images/story-dark-tile-vanity.jpg", alt: "Matt black vanity with a brass-framed mirror on a dark textured tile wall" },
  { src: "/images/gallery-shower.jpg", alt: "Walk-in shower with a recessed tiled niche" },
  { src: "/images/hero-bathroom-vanity-mirror.jpg", alt: "Illuminated round mirror above a black vanity" },
];

// The drivers that move a typical London job the most, kept short for a paid-traffic page.
const topDrivers = ["How much the layout is changing", "Shower type", "Tiling coverage and pattern", "Access difficulty"]
  .map((name) => costDrivers.find((d) => d.title === name))
  .filter((d): d is (typeof costDrivers)[number] => Boolean(d));

export default function BathroomRenovationCostLandingPage() {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <header className="site-header" aria-label="Maycor site header">
        <a className="brand" href="/london" aria-label="Maycor bathroom renovations home">
          <Image src={logo} alt="Maycor Building Contractors" width={300} height={93} priority />
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#estimate">Calculator</a>
          <a href="#prices">Prices</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <WhatsAppLink className="header-whatsapp" location="header-cost-page">
            WhatsApp
          </WhatsAppLink>
          <a className="header-call" href="#estimate">
            See My Price
          </a>
        </div>
      </header>

      <main id="top" className="cost-lp">
        <section className="cost-intro-section">
          <div className="section-heading">
            <p className="eyebrow">Bathroom renovation cost in London</p>
            <h1>Bathroom renovation cost calculator — see your price in 3 minutes.</h1>
            <p className="cost-intro-body">
              A full London bathroom renovation typically costs <strong>£6,000–£20,000+</strong>. Pick your
              room size and finish below for your own range — labour, materials, sanitaryware and waste
              removal included.
            </p>
          </div>
        </section>

        <EstimateStarter />

        <section className="cost-lp-card" id="prices" aria-labelledby="prices-heading">
          <h2 id="prices-heading">Typical prices by room size</h2>
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

          <h2>What moves the price</h2>
          <div className="cost-drivers-grid">
            {topDrivers.map((driver) => (
              <div key={driver.title} className="cost-driver-card">
                <h3>{driver.title}</h3>
                <p>{driver.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cost-lp-photos" aria-label="Recent Maycor bathrooms">
          {photos.map((photo) => (
            <figure key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
            </figure>
          ))}
        </section>

        <section className="cost-lp-card cost-lp-trust" aria-label="Why Maycor">
          <h2>One accountable team, fully accredited</h2>
          <p>
            17+ years trading and hundreds of bathrooms completed. Strip-out, plumbing, electrics, waterproofing,
            tiling and finishing coordinated by Maycor, with a 1-year warranty on our work.
          </p>
          <div className="cost-lp-logos">
            {accreditations.map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={item.name} src={item.src} alt={item.name} className="accreditation-logo" loading="lazy" />
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading">
            <h2>Bathroom cost questions.</h2>
          </div>
          <BathroomFaq faqs={costFaqs} />
        </section>

        <section className="cta-band" id="lead">
          <div>
            <p className="eyebrow">Ready for your own number?</p>
            <h2>Get your range now, then a fixed quote after a free site visit.</h2>
          </div>
          <a className="primary-button" href="#estimate">
            See My Bathroom Cost
          </a>
        </section>
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
