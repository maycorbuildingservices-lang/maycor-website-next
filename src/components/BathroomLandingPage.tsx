"use client";

import { PointerEvent, TouchEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EstimateStarter } from "./EstimateStarter";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
  hero: "/images/hero-bathroom-vanity-mirror.jpg",
  story: "/images/story-dark-tile-vanity.jpg",
  wc: "/images/gallery-loo.jpg",
  niche: "/images/gallery-shower.jpg",
  vanity: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-7.jpg",
  extra4: "/images/gallery-extra-4.jpg",
  extra5: "/images/gallery-extra-5.jpg",
  extra10: "/images/gallery-extra-10.jpg",
  extra11: "/images/gallery-extra-11.jpg",
  extra12: "/images/gallery-extra-12.jpg",
  extra13: "/images/gallery-extra-13.jpg",
  extra14: "/images/gallery-extra-14.jpg",
  extra15: "/images/gallery-extra-15.jpg",
  extra16: "/images/gallery-extra-16.jpg",
  extra17: "/images/gallery-extra-17.jpg",
  extra18: "/images/gallery-extra-18.jpg",
  extra30: "/images/gallery-extra-30.jpg",
  extra32: "/images/gallery-extra-32.jpg",
  extra33: "/images/gallery-extra-33.jpg",
  extra34: "/images/gallery-extra-34.jpg",
  extra35: "/images/gallery-extra-35.jpg",
  extra36: "/images/gallery-extra-36.jpg",
  extra38: "/images/gallery-extra-38.jpg",
  extra39: "/images/gallery-extra-39.jpg",
  extra40: "/images/gallery-extra-40.jpg",
  extra41: "/images/gallery-extra-41.jpg",
  extra42: "/images/gallery-extra-42.jpg",
  extra43: "/images/gallery-extra-43.jpg",
  extra48: "/images/gallery-extra-48.jpg",
  extra49: "/images/gallery-extra-49.jpg",
  extra50: "/images/gallery-extra-50.jpg",
  extra52: "/images/gallery-extra-52.jpg",
  extra53: "/images/gallery-extra-53.jpg",
  extra54: "/images/gallery-extra-54.jpg",
  extra55: "/images/gallery-extra-55.jpg",
  extra58: "/images/gallery-extra-58.jpg",
  extra59: "/images/gallery-extra-59.jpg",
  extra62: "/images/gallery-extra-62.jpg",
  extra63: "/images/gallery-extra-63.jpg",
  extra65: "/images/gallery-extra-65.jpg",
  extra66: "/images/gallery-extra-66.jpg",
  extra67: "/images/gallery-extra-67.jpg",
  extra68: "/images/gallery-extra-68.jpg",
  extra69: "/images/gallery-extra-69.jpg",
  extra70: "/images/gallery-extra-70.jpg",
  extra71: "/images/gallery-extra-71.jpg",
  extra72: "/images/gallery-extra-72.jpg",
  extra73: "/images/gallery-extra-73.jpg",
  extra74: "/images/gallery-extra-74.jpg",
  extra76: "/images/gallery-extra-76.jpg",
  extra77: "/images/gallery-extra-77.jpg",
  extra78: "/images/gallery-extra-78.jpg",
  extra79: "/images/gallery-extra-79.jpg",
  extra84: "/images/gallery-extra-84.jpg",
  extra86: "/images/gallery-extra-86.jpg",
  extra88: "/images/gallery-extra-88.jpg",
  extra91: "/images/gallery-extra-91.jpg",
  extra93: "/images/gallery-extra-93.jpg",
  extra94: "/images/gallery-extra-94.jpg",
  extra95: "/images/gallery-extra-95.jpg",
  extra96: "/images/gallery-extra-96.jpg",
  extra99: "/images/gallery-extra-99.jpg",
  extra100: "/images/gallery-extra-100.jpg",
  extra101: "/images/gallery-extra-101.jpg",
  extra102: "/images/gallery-extra-102.jpg",
  extra103: "/images/gallery-extra-103.jpg",
  extra104: "/images/gallery-extra-104.jpg",
  extra105: "/images/gallery-extra-105.jpg",
  extra106: "/images/gallery-extra-106.jpg",
  extra107: "/images/gallery-extra-107.jpg",
  extra108: "/images/gallery-extra-108.jpg",
  extra109: "/images/gallery-extra-109.jpg",
  extra110: "/images/gallery-extra-110.jpg",
  extra111: "/images/gallery-extra-111.jpg",
  extra112: "/images/gallery-extra-112.jpg",
  extra113: "/images/gallery-extra-113.jpg",
  extra114: "/images/gallery-extra-114.jpg",
  extra115: "/images/gallery-extra-115.jpg",
  extra116: "/images/gallery-extra-116.jpg",
  extra117: "/images/gallery-extra-117.jpg",
  extra118: "/images/gallery-extra-118.jpg",
  extra119: "/images/gallery-extra-119.jpg",
};

const galleryPhotos = [
  { src: images.extra99, alt: "Matt black wall-hung vanity with an oval brass-framed mirror on a dark textured tile feature wall, wall-hung toilet and glass shower screen alongside", className: "" },
  { src: images.extra100, alt: "Oval brass-framed mirror above a matt black vanity on a dark textured tile wall, glass-screened walk-in shower with rainfall head visible beyond", className: "" },
  { src: images.extra101, alt: "Dark textured tile feature wall with a recessed shower niche and wall-hung toilet, glass shower screen and brass mirror edge visible alongside", className: "" },
  { src: images.extra102, alt: "Walk-in glass shower with ceiling-mounted rainfall head and pale stone-effect tiling, chrome heated towel rail alongside", className: "" },
  { src: images.extra103, alt: "Bath raised on a tiled step below a textured tile wall, glass shower screen with chrome riser rail alongside", className: "" },
  { src: images.extra104, alt: "Double vanity with white countertop basins and chrome taps beneath a large mirror reflecting a chrome heated towel rail, raised bath visible alongside", className: "gallery-wide" },
  { src: images.extra105, alt: "Bath on a raised tiled step below a window, glass shower screen and textured tile feature wall alongside", className: "" },
  { src: images.extra106, alt: "Corner shower with black recessed niche and ceiling-mounted rainfall head beside a bath with floor-standing chrome filler tap, below a window in a textured tile bathroom", className: "" },
  { src: images.extra107, alt: "Glass-screened walk-in shower with rainfall head and recessed niche beside a raised bath and window in a textured tile en-suite", className: "" },
  { src: images.extra108, alt: "Walk-in shower with rainfall head and recessed niche beside a raised bath below a textured tile feature wall and window", className: "gallery-wide" },
  { src: images.extra109, alt: "Wall-hung toilet and vanity mirror beside a chrome ladder heated towel rail, doorway opening onto a staircase landing", className: "" },
  { src: images.extra110, alt: "Overview of an en-suite with glass shower, raised bath and wall-hung toilet, chrome heated towel rail and doorway to the landing", className: "" },
  { src: images.extra111, alt: "Bright en-suite bathroom with a tall window, corner glass shower screen and tiled flooring", className: "" },
  { src: images.extra112, alt: "Double vanity in dark stained wood with white countertop basins, twin mirrors and a striped wallpaper feature wall, chrome heated towel rail alongside", className: "" },
  { src: images.extra113, alt: "Corner glass shower and wall-hung toilet beside a tall window, dark stained wood double vanity visible in the background", className: "" },
  { src: images.extra114, alt: "Book-matched marble-effect shower wall with a backlit recessed niche, chrome fittings and a frameless glass corner shower screen", className: "gallery-wide" },
  { src: images.extra115, alt: "Dark stained wood double vanity with white countertop basins beneath twin mirrors on a striped wallpaper wall, chrome heated towel rail alongside", className: "" },
  { src: images.extra116, alt: "Corner glass shower with warm marble-effect tiling, backlit recessed niche, chrome fittings and a wall-hung toilet alongside", className: "" },
  { src: images.extra117, alt: "Close-up of a book-matched marble-effect shower wall with a backlit recessed niche and chrome shower controls", className: "" },
  { src: images.extra118, alt: "Frameless glass corner shower with warm marble-effect tiling, a backlit niche and ceiling-mounted rainfall head", className: "gallery-wide" },
  { src: images.extra119, alt: "Marble-effect corner shower with a backlit recessed niche, chrome rainfall head and a wall-hung toilet alongside", className: "" },
  { src: images.extra11, alt: "Black matt shower riser rail with overhead rainfall head and concealed thermostatic valve behind a frameless glass screen", className: "" },
  { src: images.extra12, alt: "Glass-screened shower with black recessed niche shelving and round backlit mirror reflected in the background", className: "" },
  { src: images.extra13, alt: "Recessed black tiled shower niche with integrated LED strip lighting, set into a stone-effect tiled wall", className: "" },
  { src: images.extra14, alt: "Corner of a walk-in shower tray with black shower hose against stone-effect tiling and a second drain visible", className: "" },
  { src: images.extra15, alt: "Frameless glass shower door with black hinges opening onto a family bathroom, white panelled door reflected inside", className: "" },
  { src: images.extra16, alt: "Black recessed shower niche with LED lighting, black hinged glass door and chrome pull handle", className: "" },
  { src: images.vanity, alt: "Double vanity bathroom renovation detail", className: "" },
  { src: images.extra17, alt: "Frameless corner shower enclosure with black frame, recessed niche and matt black shower controls", className: "gallery-wide" },
  { src: images.extra18, alt: "Wall-mounted mirrored bathroom cabinet with integrated light and shaver socket above a round-basin vanity unit", className: "" },
  { src: images.wc, alt: "Wall hung toilet detail", className: "" },
  { src: images.niche, alt: "Recessed shower niche with tiling", className: "" },
  { src: images.extra30, alt: "Sage-green bathroom with pedestal basin, square mirror and toilet fitted with protective seal tape, chrome ladder towel rail with mustard and charcoal towels", className: "" },
  { src: images.extra32, alt: "Sage-green bathroom with bath, framed landscape artwork, stone-effect tile splashback and toilet fitted with protective seal tape", className: "" },
  { src: images.extra33, alt: "Frameless glass shower screen in a stone-effect tiled corner shower, chrome thermostatic valve, bedroom door visible beyond", className: "" },
  { src: images.extra34, alt: "Doorway view from an en-suite shower through to a bedroom with green upholstered headboard and patterned wallpaper", className: "" },
  { src: images.extra35, alt: "Bath with stone-effect tile splashback beside a walk-in shower with matching tiling and chrome thermostatic valve", className: "" },
  { src: images.extra36, alt: "Corner walk-in shower with overhead rainfall head and stone-effect tiling, bedroom visible through the open door beyond", className: "" },
  { src: images.extra38, alt: "Walk-in shower with ceiling-mounted rainfall head, stone-effect tiling and chrome ladder towel rail beside a frosted window", className: "gallery-wide" },
  { src: images.extra39, alt: "Walk-in wet-room shower with ceiling-mounted rain head, a window with plant on the sill and a chrome heated towel rail", className: "" },
  { src: images.extra40, alt: "Walk-in shower with mirrored cabinet and wall-hung vanity basin, toilet still fitted with protective seal tape ready for handover", className: "" },
  { src: images.extra41, alt: "Walk-in wet-room shower with stone-effect tiling, ceiling-mounted rainfall head and chrome heated towel rail with striped towels", className: "" },
  { src: images.extra42, alt: "Beige stone-effect tiled bathroom with wall-hung basin, mirrored cabinet and toilet fitted with protective seal tape", className: "" },
  { src: images.extra43, alt: "Doorway view from an en-suite through to a bedroom with bay window, pendant lighting and a dried pampas grass arrangement", className: "" },
  { src: images.extra48, alt: "Wall-hung basin and pedestal beneath a coral-tinted obscured window, beside a bath with folding glass shower screen and stone-effect tiling", className: "" },
  { src: images.extra49, alt: "Bath with folding glass shower screen, riser-rail shower and linear stone-effect tiled feature wall", className: "" },
  { src: images.extra50, alt: "Rainfall shower head and riser rail over a bath, with linear stone-effect tiled feature wall and chrome bath filler", className: "" },
  { src: images.extra52, alt: "Loft en-suite with grey metro-tiled shower, freestanding bath and wall-hung vanity basin, set under a sloped ceiling", className: "gallery-wide" },
  { src: images.extra53, alt: "Freestanding oval bath with floor-standing chrome mixer tap against grey metro-tiled walls", className: "" },
  { src: images.extra54, alt: "Freestanding oval bath with floor-standing chrome mixer tap and overflow, close-up against metro-tiled walls", className: "" },
  { src: images.extra55, alt: "Chrome ladder heated towel rail against a sloped ceiling, beside a freestanding bath in a loft en-suite", className: "" },
  { src: images.extra58, alt: "Frameless glass shower enclosure with white metro-tiled walls, rainfall shower head and chrome heated towel rail", className: "" },
  { src: images.extra4, alt: "Round backlit mirror above a teal linear-tiled splashback, with basin, chrome mixer tap and decorative ceramic fish ornament", className: "" },
  { src: images.extra59, alt: "White metro-tiled shower enclosure with rainfall head, hinged glass door and concealed shower valve", className: "gallery-wide" },
  { src: images.extra62, alt: "Bath with folding glass shower screen, rainfall head and recessed shower niche, styled with fresh flowers and a blue mosaic feature wall", className: "" },
  { src: images.extra63, alt: "Walk-in shower with hexagonal black floor tiles, white metro wall tiles and a wall-hung basin beside it", className: "" },
  { src: images.extra5, alt: "Wall-hung basin and back-to-wall toilet with concealed cistern flush plate beneath a round backlit mirror and blue linear tile", className: "" },
  { src: images.extra65, alt: "White metro-tiled shower and vanity area with marble-effect display shelf and chrome heated towel rail reflected in the mirror", className: "" },
  { src: images.extra66, alt: "Wall-hung vanity basin beside a concealed-cistern flush plate and toilet, white metro tiling with marble-effect display shelf", className: "gallery-wide" },
  { src: images.extra67, alt: "Wall-hung vanity basin and concealed-cistern toilet with metro tiling, marble-effect shelf and chrome heated towel rail", className: "" },
  { src: images.extra68, alt: "Tall chrome heated towel rail beside a metro-tiled shower niche and mirrored cabinet", className: "" },
  { src: images.extra69, alt: "Mirrored bathroom cabinet above a wall-hung basin, marble-effect display shelf and chrome toilet-roll holder", className: "" },
  { src: images.extra70, alt: "Rainfall shower head over white metro tiling with a recessed storage niche and frameless glass screen", className: "" },
  { src: images.extra71, alt: "Wall-hung vanity basin and toilet with white metro tiling, black hexagonal floor tiles and marble-effect display shelf", className: "" },
  { src: images.extra72, alt: "Grey book-matched marble wet-room shower with recessed niche and handheld shower on a riser rail", className: "" },
  { src: images.extra73, alt: "Wall-hung toilet against full-height grey marble tiling, chrome heated towel rail and concealed-cistern flush plate", className: "gallery-wide" },
  { src: images.extra74, alt: "Marble-clad bath panel with wall-mounted chrome bath filler, beside a wall-hung toilet with matching marble tiling", className: "" },
  { src: images.extra76, alt: "Teal metro-tiled cloakroom with wall-hung basin, chrome mixer tap, reed diffuser and glass bottle vase on a tiled display shelf", className: "" },
  { src: images.extra77, alt: "Teal metro-tiled cloakroom window sill styled with a ceramic vase and patterned feature wallpaper, round mirror and basin visible alongside", className: "" },
  { src: images.extra78, alt: "Teal metro-tiled cloakroom, wider view showing the basin, patterned wallpaper and toilet styled with folded towels", className: "" },
  { src: images.extra79, alt: "Teal metro-tiled cloakroom with a framed art print, patterned feature wallpaper and white column radiator", className: "" },
  { src: images.extra84, alt: "Fold-down glass shower screen over a bath, with a wall-mounted shower gel holder, thermostatic valve and shower brush", className: "" },
  { src: images.extra86, alt: "Bath with a folded towel and mixed stone-effect mosaic feature tile, seen through the folding glass shower screen", className: "" },
  { src: images.extra88, alt: "Fold-down glass bath screen with riser-rail shower, wall-hung basin and a wooden bath caddy with brush and bottles", className: "" },
  { src: images.extra91, alt: "Wall-hung basin styled with skincare products beneath a scalloped black mirror, small round vanity mirror and framed blue artwork alongside", className: "" },
  { src: images.extra93, alt: "Doorway view into a sliding-door shower enclosure and wall-hung basin, with a deep blue accent wall and dressed window beyond", className: "" },
  { src: images.extra10, alt: "Glass shower enclosure against a blue accent wall, with round mirror reflection and wall-hung basin alongside", className: "gallery-wide" },
  { src: images.extra94, alt: "Sliding glass shower door with textured stone-effect tiling and rainfall head, deep blue accent wall and dressed window beyond", className: "gallery-wide" },
  { src: images.extra95, alt: "Wall-hung basin with toiletries beneath a windowsill styled with a soap dish and reed diffuser, deep blue accent wall", className: "" },
  { src: images.extra96, alt: "Close-up of a windowsill styled with soap dish, body brush and reed diffuser beside a wall-hung basin with toiletries and concealed cistern flush plate", className: "" },
];

// TODO: Replace these three placeholder quotes with real customer words before launch.
// Even short informal messages (WhatsApp, email) work — paste the actual words here.
const testimonials = [
  {
    initial: "J",
    name: "Jefferson Hack",
    area: "Angel, Islington",
    quote: "Great job painting and refurbing our kitchen and bathroom.",
  },
  {
    initial: "J",
    name: "Jonathan Jennings",
    area: "Streatham Hill",
    quote: "Team designed and delivered two new bathrooms, a brand new tiled entrance room and both of my bedrooms over two separate projects. I'm so happy with the work!",
  },
  {
    initial: "S",
    name: "Sophie Bower",
    area: "Notting Hill",
    quote: "They were very thorough, neat and precise. They completed the work in a timely manner and went above and beyond to make everything look immaculate.",
  },
];

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

// TODO: Replace placeholder SVGs with official badge files from each member portal:
// NICEIC → Cert Portal → Marketing → Logo Downloads
// Gas Safe → Member area → Registered Business Resources
// MyBuilder → Profile page → Trust Badge
const accreditations = [
  { name: "Federation of Master Builders", src: "/images/accreditations/master-builder.svg" },
  { name: "NICEIC Approved Contractor", src: "/images/accreditations/niceic.svg" },
  { name: "Gas Safe Register", src: "/images/accreditations/gas-safe.svg" },
  { name: "CHAS Accredited", src: "/images/accreditations/chas.png" },
  { name: "MyBuilder", src: "/images/accreditations/mybuilder.png" },
  { name: "Constructionline", src: "/images/accreditations/constructionline.png" },
];

const brandLogos = [
  { name: "Villeroy & Boch", src: "/images/brands/villeroy-and-boch.svg" },
  { name: "Duravit", src: "/images/brands/duravit.svg" },
  { name: "Roca", src: "/images/brands/roca.svg" },
  { name: "Grohe", src: "/images/brands/grohe.svg" },
  { name: "Hansgrohe", src: "/images/brands/hansgrohe.svg" },
  { name: "Ideal Standard", src: "/images/brands/ideal-standard.svg" },
  { name: "Crosswater", src: "/images/brands/crosswater.svg" },
  { name: "Geberit", src: "/images/brands/geberit.svg" },
  { name: "Laufen", src: "/images/brands/laufen.svg" },
  { name: "Vado", src: "/images/brands/vado.svg" },
  { name: "Burlington", src: "/images/brands/burlington.svg" },
  { name: "Porcelanosa", src: "/images/brands/porcelanosa.png" },
  { name: "Bristan", src: "/images/brands/bristan.png" },
];

  const faqs = [
    [
      "Can you handle the whole bathroom renovation?",
      "Yes. Maycor can coordinate strip-out, plumbing, electrics, waterproofing, tiling, decorating, fittings and waste removal.",
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
    [
      "Are you insured?",
      "Yes. Maycor carries the relevant insurance for renovation work, and details can be confirmed on request.",
    ],
    [
      "Do you offer a warranty?",
      "Yes. The work is covered by a 1-year warranty for added peace of mind.",
    ],
  ];

const areaServedList = [
  "Kensington", "Chelsea", "Fulham", "Battersea", "Notting Hill",
  "Hammersmith", "Hampstead", "St John's Wood", "Maida Vale", "Chiswick",
  "South Kensington", "Belgravia", "Putney", "Barnes", "Angel", "London"
];

export type LocalityConfig = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  intro?: string;
  canonicalPath: string;
  featuredTestimonial?: string;
};

export const defaultLocality: LocalityConfig = {
  slug: "london",
  name: "London",
  eyebrow: "Premium bathroom renovation contractors",
  h1: "Bathroom renovations in London, done calmly, start to finish.",
  canonicalPath: "/bathroom-renovations-london/",
};

export function BathroomLandingPage({ locality = defaultLocality }: { locality?: LocalityConfig } = {}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Maycor Building Contractors",
    url: `https://bathroom-renovations.maycor.co.uk${locality.canonicalPath}`,
    areaServed:
      locality.slug === "london"
        ? areaServedList
        : [locality.name, ...areaServedList.filter((a) => a !== locality.name)],
    telephone: "+442080507057",
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
    priceRange: "£6,000–£20,000+",
    sameAs: [
      "https://www.facebook.com/MaycorBuildingContractors",
      "https://www.linkedin.com/in/victor-o-120686151/",
      "https://g.co/kgs/49pzXDQ",
      "https://www.mybuilder.com/profile/maycor-renovations",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `Bathroom renovations in ${locality.name}`,
        description:
          "Full bathroom renovation: strip-out, plumbing, electrics, waterproofing, tiling, decorating, fittings and waste removal.",
        areaServed:
          locality.slug === "london"
            ? areaServedList
            : [locality.name, ...areaServedList.filter((a) => a !== locality.name)],
        priceRange: "£6,000–£20,000+",
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

  const orderedTestimonials = locality.featuredTestimonial
    ? [
        ...testimonials.filter((t) => t.name === locality.featuredTestimonial),
        ...testimonials.filter((t) => t.name !== locality.featuredTestimonial),
      ]
    : testimonials;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastTouchActivation = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryControls = useRef<{ prev: () => void; next: () => void } | null>(null);

  function showPrevPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current - 1 + galleryPhotos.length) % galleryPhotos.length));
  }

  function showNextPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current + 1) % galleryPhotos.length));
  }

  const touchStartX = useRef(0);

  function handleLightboxTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleLightboxTouchEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX > 0) showPrevPhoto();
    else showNextPhoto();
  }

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") showPrevPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    }

    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let autoplayTimer: ReturnType<typeof setInterval> | null = null;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    let index = 0;

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!gallery || gallery.scrollWidth <= gallery.clientWidth + 1) return;
        const figures = Array.from(gallery.querySelectorAll("figure")) as HTMLElement[];
        index = (index + 1) % figures.length;
        const figure = figures[index];
        const galleryRect = gallery.getBoundingClientRect();
        const figureRect = figure.getBoundingClientRect();
        const targetLeft =
          gallery.scrollLeft +
          (figureRect.left - galleryRect.left) -
          (gallery.clientWidth - figureRect.width) / 2;
        gallery.scrollTo({ left: targetLeft, behavior: "smooth" });
      }, 1300);
    }

    function closestIndex() {
      if (!gallery) return 0;
      const figures = Array.from(gallery.querySelectorAll("figure"));
      const galleryRect = gallery.getBoundingClientRect();
      const galleryCenter = galleryRect.left + galleryRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      figures.forEach((figure, i) => {
        const rect = figure.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - galleryCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    function pauseForInteraction() {
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        index = closestIndex();
        startAutoplay();
      }, 2000);
    }

    function goToIndex(newIndex: number) {
      if (!gallery) return;
      const figures = Array.from(gallery.querySelectorAll("figure")) as HTMLElement[];
      if (figures.length === 0) return;
      index = ((newIndex % figures.length) + figures.length) % figures.length;
      const figure = figures[index];
      const galleryRect = gallery.getBoundingClientRect();
      const figureRect = figure.getBoundingClientRect();
      const targetLeft =
        gallery.scrollLeft + (figureRect.left - galleryRect.left) - (gallery.clientWidth - figureRect.width) / 2;
      gallery.scrollTo({ left: targetLeft, behavior: "smooth" });
    }

    function goRelative(direction: number) {
      pauseForInteraction();
      goToIndex(closestIndex() + direction);
    }

    galleryControls.current = { prev: () => goRelative(-1), next: () => goRelative(1) };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
          if (resumeTimer) clearTimeout(resumeTimer);
        }
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
    );
    observer.observe(gallery);

    gallery.addEventListener("pointerdown", pauseForInteraction);
    gallery.addEventListener("touchstart", pauseForInteraction, { passive: true });

    let scaleFrame: number | null = null;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    function updateScales() {
      if (!gallery) return;
      const figures = Array.from(gallery.querySelectorAll("figure")) as HTMLElement[];
      const galleryRect = gallery.getBoundingClientRect();
      const galleryCenter = galleryRect.left + galleryRect.width / 2;

      let closest: HTMLElement | null = null;
      let closestDistance = Infinity;

      figures.forEach((figure) => {
        const rect = figure.getBoundingClientRect();
        const figureCenter = rect.left + rect.width / 2;
        const distance = Math.abs(figureCenter - galleryCenter);
        const normalized = Math.min(distance / (galleryRect.width / 2), 1);
        const scale = 1.08 - normalized * 0.16;
        figure.style.transform = `scale(${scale})`;

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = figure;
        }
      });

      figures.forEach((figure) => {
        figure.classList.toggle("gallery-figure-active", figure === closest);
      });
    }

    function handleScroll() {
      if (isMobile) return;
      if (scaleFrame !== null) return;
      scaleFrame = requestAnimationFrame(() => {
        updateScales();
        scaleFrame = null;
      });
    }

    if (!isMobile) {
      updateScales();
    }
    gallery.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      gallery.removeEventListener("pointerdown", pauseForInteraction);
      gallery.removeEventListener("touchstart", pauseForInteraction);
      gallery.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scaleFrame !== null) cancelAnimationFrame(scaleFrame);
      galleryControls.current = null;
    };
  }, []);

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
      <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="page-bg" aria-hidden="true" />
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
          <a href="#work">Our Gallery</a>
          <a href="#included">Included</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/447843746835" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="header-call" href="#estimate">
            Continue Estimate
          </a>
        </div>
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
            <p className="eyebrow">{locality.eyebrow}</p>
            <h1>{locality.h1}</h1>
            <p className="hero-copy">
              Maycor manages the full renovation: strip-out, plumbing, electrics,
              waterproofing, tiling, sanitaryware, finishing and waste removal.
            </p>
            {locality.intro && <p className="hero-copy">{locality.intro}</p>}
            <div className="hero-actions">
              <a className="primary-button" href="#estimate">
                See My Bathroom Cost
              </a>
              <a className="secondary-button" href="#work">
                View Our Gallery
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

        <section className="cost-intro-section">
          <div className="section-heading">
            <p className="eyebrow">Bathroom renovation cost in London</p>
            <h2>How much does a bathroom renovation cost in London?</h2>
            <p className="cost-intro-body">
              In London, bathroom renovation costs typically range from <strong>£6,000 for a straightforward refresh</strong> to <strong>£20,000+ for a full premium renovation</strong>. The final cost depends on room size, finish level, structural changes, access conditions and sanitaryware specification. Use the estimate tool below to get an accurate range based on your specific bathroom.
            </p>
          </div>
        </section>

        <EstimateStarter />

        <section className="story-section">
          <div className="story-media">
            <Image
              src={images.story}
              alt="Matt black wall-hung vanity with an oval brass-framed mirror on a dark textured tile feature wall, wall-hung toilet and glass shower screen alongside"
              width={1200}
              height={1600}
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
            <div className="story-stats">
              <div>
                <strong>17+</strong>
                <span>years trading</span>
              </div>
              <div>
                <strong>100s</strong>
                <span>bathrooms completed</span>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Recent finish direction</p>
            <h2>Clean lines, practical detailing, spaces that feel settled.</h2>
          </div>
          <div className="gallery-grid-wrap">
            <button
              type="button"
              className="gallery-nav gallery-nav-prev"
              aria-label="Previous photo"
              onClick={() => galleryControls.current?.prev()}
            >
              ‹
            </button>
            <div className="gallery-grid" ref={galleryRef}>
            {galleryPhotos.map((photo, photoIndex) => (
              <figure
                key={photo.src}
                className={photo.className}
                onClick={() => setLightboxIndex(photoIndex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setLightboxIndex(photoIndex);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 86vw, 480px"
                />
                <span className="gallery-zoom-icon" aria-hidden="true">
                  <span className="gallery-zoom-label">Click to expand</span>
                </span>
              </figure>
            ))}
            </div>
            <button
              type="button"
              className="gallery-nav gallery-nav-next"
              aria-label="Next photo"
              onClick={() => galleryControls.current?.next()}
            >
              ›
            </button>
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

        <section className="testimonials-section">
          <div className="section-heading">
            <p className="eyebrow">What clients say</p>
            <h2>Straightforward work, tidy finish, on schedule.</h2>
          </div>
          <div className="testimonials-grid">
            {orderedTestimonials.map((t) => (
              <article key={t.name} className="testimonial-card">
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <span className="testimonial-initial">{t.initial}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.area}</span>
                  </div>
                </div>
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
          <h2>Quick answers for London bathroom projects.</h2>
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
          </section>

      </main>

      <section className="accreditations-section" aria-label="Accreditations and memberships">
        <p className="eyebrow accreditations-eyebrow">Accreditations &amp; memberships</p>
        <div className="accreditations-row">
          {accreditations.map((item) => (
            <img
              key={item.name}
              src={item.src}
              alt={item.name}
              className="accreditation-logo"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="brands-section" aria-label="Brands we work with">
        <div className="brands-heading">
          <p className="eyebrow">Brands we work with</p>
          <div className="page-top-link">
            <a href="#top">Back to top</a>
          </div>
        </div>
        <div className="brands-marquee">
          <div className="brands-track">
            {[...brandLogos, ...brandLogos].map((brand, index) => (
              <img
                key={`${brand.name}-${index}`}
                src={brand.src}
                alt={brand.name}
                className="brand-logo"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="areas-section" aria-label="Areas we cover">
        <div className="section-heading">
          <p className="eyebrow">Areas we cover</p>
          <h2>Bathroom renovations across London&apos;s most sought-after neighbourhoods.</h2>
          <p className="areas-body">
            Maycor carries out bathroom renovations across premium London locations including{" "}
            <a href="/bathroom-renovation-kensington/"><strong>Kensington (W8)</strong></a>,{" "}
            <a href="/bathroom-renovation-chelsea/"><strong>Chelsea (SW3)</strong></a>, <strong>Fulham (SW6)</strong>,{" "}
            <strong>Battersea (SW11)</strong>,{" "}
            <a href="/bathroom-renovation-notting-hill/"><strong>Notting Hill (W11)</strong></a>,{" "}
            <strong>Hammersmith (W6)</strong>,{" "}
            <a href="/bathroom-renovation-hampstead/"><strong>Hampstead (NW3)</strong></a>, <strong>St John&apos;s Wood (NW8)</strong>, <strong>Maida Vale (W9)</strong>,{" "}
            <strong>Chiswick (W4)</strong>, <strong>South Kensington (SW7)</strong>, <strong>Belgravia (SW1X)</strong>,{" "}
            <strong>Putney (SW15)</strong>, <strong>Barnes (SW13)</strong> and{" "}
            <strong>Angel (N1)</strong>. If your area is not listed, get in touch — we cover most of London.
          </p>
          {locality.slug !== "london" && (
            <p className="areas-body">
              <a href="/bathroom-renovations-london/">See our full coverage across London →</a>
            </p>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <span>Maycor Building Contractors</span>
        <a href="https://maycor.co.uk" target="_blank" rel="noreferrer">
          maycor.co.uk
        </a>
        <span>Call us: <a href="tel:+447843746835">07843 746 835</a></span>
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
          <div
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <Image
              src={galleryPhotos[lightboxIndex].src}
              alt={galleryPhotos[lightboxIndex].alt}
              fill
              sizes="100vw"
            />
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
