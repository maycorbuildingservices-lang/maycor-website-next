"use client";

import { PointerEvent, TouchEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EstimateStarter } from "./EstimateStarter";

const images = {
  logo: "https://maycor.co.uk/wp-content/uploads/2025/03/main-logo-all-04-300x93.png",
  hero: "/images/hero-bathroom-vanity-mirror.jpg",
  story: "/images/story-jay-bathroom-v2.jpg",
  wc: "/images/gallery-loo.jpg",
  niche: "/images/gallery-shower.jpg",
  vanity: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-7.jpg",
  bath: "https://maycor.co.uk/wp-content/uploads/2025/05/maycor-gallery-9.jpg",
  extra1: "/images/gallery-extra-1.jpg",
  extra2: "/images/gallery-extra-2.jpg",
  extra3: "/images/gallery-extra-3.jpg",
  extra4: "/images/gallery-extra-4.jpg",
  extra5: "/images/gallery-extra-5.jpg",
  extra6: "/images/gallery-extra-6.jpg",
  extra7: "/images/gallery-extra-7.jpg",
  extra8: "/images/gallery-extra-8.jpg",
  extra9: "/images/gallery-extra-9.jpg",
  extra10: "/images/gallery-extra-10.jpg",
  extra11: "/images/gallery-extra-11.jpg",
  extra12: "/images/gallery-extra-12.jpg",
  extra13: "/images/gallery-extra-13.jpg",
  extra14: "/images/gallery-extra-14.jpg",
  extra15: "/images/gallery-extra-15.jpg",
  extra16: "/images/gallery-extra-16.jpg",
  extra17: "/images/gallery-extra-17.jpg",
  extra18: "/images/gallery-extra-18.jpg",
  extra19: "/images/gallery-extra-19.jpg",
  extra20: "/images/gallery-extra-20.jpg",
  extra21: "/images/gallery-extra-21.jpg",
  extra22: "/images/gallery-extra-22.jpg",
  extra23: "/images/gallery-extra-23.jpg",
  extra24: "/images/gallery-extra-24.jpg",
  extra25: "/images/gallery-extra-25.jpg",
  extra26: "/images/gallery-extra-26.jpg",
  extra27: "/images/gallery-extra-27.jpg",
  extra28: "/images/gallery-extra-28.jpg",
  extra29: "/images/gallery-extra-29.jpg",
  extra30: "/images/gallery-extra-30.jpg",
  extra31: "/images/gallery-extra-31.jpg",
  extra32: "/images/gallery-extra-32.jpg",
  extra33: "/images/gallery-extra-33.jpg",
  extra34: "/images/gallery-extra-34.jpg",
  extra35: "/images/gallery-extra-35.jpg",
  extra36: "/images/gallery-extra-36.jpg",
  extra37: "/images/gallery-extra-37.jpg",
  extra38: "/images/gallery-extra-38.jpg",
  extra39: "/images/gallery-extra-39.jpg",
  extra40: "/images/gallery-extra-40.jpg",
  extra41: "/images/gallery-extra-41.jpg",
  extra42: "/images/gallery-extra-42.jpg",
  extra43: "/images/gallery-extra-43.jpg",
  extra44: "/images/gallery-extra-44.jpg",
  extra45: "/images/gallery-extra-45.jpg",
  extra46: "/images/gallery-extra-46.jpg",
  extra47: "/images/gallery-extra-47.jpg",
  extra48: "/images/gallery-extra-48.jpg",
  extra49: "/images/gallery-extra-49.jpg",
  extra50: "/images/gallery-extra-50.jpg",
  extra51: "/images/gallery-extra-51.jpg",
  extra52: "/images/gallery-extra-52.jpg",
  extra53: "/images/gallery-extra-53.jpg",
  extra54: "/images/gallery-extra-54.jpg",
  extra55: "/images/gallery-extra-55.jpg",
  extra56: "/images/gallery-extra-56.jpg",
  extra57: "/images/gallery-extra-57.jpg",
  extra58: "/images/gallery-extra-58.jpg",
  extra59: "/images/gallery-extra-59.jpg",
  extra60: "/images/gallery-extra-60.jpg",
  extra61: "/images/gallery-extra-61.jpg",
  extra62: "/images/gallery-extra-62.jpg",
  extra63: "/images/gallery-extra-63.jpg",
  extra64: "/images/gallery-extra-64.jpg",
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
  extra75: "/images/gallery-extra-75.jpg",
  extra76: "/images/gallery-extra-76.jpg",
  extra77: "/images/gallery-extra-77.jpg",
  extra78: "/images/gallery-extra-78.jpg",
  extra79: "/images/gallery-extra-79.jpg",
  extra80: "/images/gallery-extra-80.jpg",
  extra81: "/images/gallery-extra-81.jpg",
  extra82: "/images/gallery-extra-82.jpg",
  extra83: "/images/gallery-extra-83.jpg",
  extra84: "/images/gallery-extra-84.jpg",
  extra85: "/images/gallery-extra-85.jpg",
  extra86: "/images/gallery-extra-86.jpg",
  extra87: "/images/gallery-extra-87.jpg",
  extra88: "/images/gallery-extra-88.jpg",
  extra89: "/images/gallery-extra-89.jpg",
  extra90: "/images/gallery-extra-90.jpg",
  extra91: "/images/gallery-extra-91.jpg",
  extra92: "/images/gallery-extra-92.jpg",
  extra93: "/images/gallery-extra-93.jpg",
  extra94: "/images/gallery-extra-94.jpg",
  extra95: "/images/gallery-extra-95.jpg",
  extra96: "/images/gallery-extra-96.jpg",
  extra97: "/images/gallery-extra-97.jpg",
  extra98: "/images/gallery-extra-98.jpg",
};

const galleryPhotos = [
  { src: images.extra11, alt: "Completed bathroom renovation - walk-in shower with glass screen", className: "" },
  { src: images.extra12, alt: "Completed bathroom renovation - freestanding bathtub and tiled surround", className: "" },
  { src: images.extra13, alt: "Completed bathroom renovation - wall-hung vanity unit with mirror", className: "" },
  { src: images.extra14, alt: "Completed bathroom renovation - heated towel rail and tiled wall", className: "" },
  { src: images.extra15, alt: "Completed bathroom renovation - recessed shower niche with feature tiling", className: "" },
  { src: images.extra16, alt: "Completed bathroom renovation - underfloor heating and tiled flooring", className: "" },
  { src: images.vanity, alt: "Double vanity bathroom renovation detail", className: "" },
  { src: images.extra17, alt: "Completed bathroom renovation - vanity unit with countertop basin", className: "gallery-wide" },
  { src: images.extra18, alt: "Completed bathroom renovation - shower enclosure with rainfall shower head", className: "" },
  { src: images.extra19, alt: "Completed bathroom renovation - mirrored bathroom storage cabinet", className: "" },
  { src: images.extra20, alt: "Completed bathroom renovation - feature tiling and lighting detail", className: "" },
  { src: images.extra21, alt: "Completed bathroom renovation - toilet and basin suite", className: "" },
  { src: images.extra22, alt: "Completed bathroom renovation - bath panel and tiled surround", className: "" },
  { src: images.wc, alt: "Wall hung toilet detail", className: "" },
  { src: images.extra23, alt: "Completed bathroom renovation - en-suite layout with shower and basin", className: "" },
  { src: images.extra24, alt: "Completed bathroom renovation - tiled splashback and chrome fittings", className: "gallery-wide" },
  { src: images.extra25, alt: "Completed bathroom renovation - bathroom window with natural light", className: "" },
  { src: images.extra26, alt: "Completed bathroom renovation - corner shower enclosure", className: "" },
  { src: images.extra27, alt: "Completed bathroom renovation - matt black fixtures and fittings", className: "" },
  { src: images.extra28, alt: "Completed bathroom renovation - patterned floor tiles", className: "" },
  { src: images.niche, alt: "Recessed shower niche with tiling", className: "" },
  { src: images.extra29, alt: "Completed bathroom renovation - double basin vanity unit", className: "" },
  { src: images.extra30, alt: "Completed bathroom renovation - curved shower screen and mirror", className: "" },
  { src: images.extra31, alt: "Completed bathroom renovation - loft bathroom with sloped ceiling", className: "gallery-wide" },
  { src: images.extra32, alt: "Completed bathroom renovation - cloakroom WC suite", className: "" },
  { src: images.extra33, alt: "Recent Maycor bathroom project - walk-in shower with glass screen", className: "" },
  { src: images.extra34, alt: "Recent Maycor bathroom project - freestanding bathtub and tiled surround", className: "" },
  { src: images.bath, alt: "Freestanding bath in a loft bathroom", className: "gallery-wide" },
  { src: images.extra35, alt: "Recent Maycor bathroom project - wall-hung vanity unit with mirror", className: "" },
  { src: images.extra36, alt: "Recent Maycor bathroom project - heated towel rail and tiled wall", className: "" },
  { src: images.extra37, alt: "Recent Maycor bathroom project - recessed shower niche with feature tiling", className: "" },
  { src: images.extra38, alt: "Recent Maycor bathroom project - underfloor heating and tiled flooring", className: "gallery-wide" },
  { src: images.extra39, alt: "Recent Maycor bathroom project - vanity unit with countertop basin", className: "" },
  { src: images.extra40, alt: "Recent Maycor bathroom project - shower enclosure with rainfall shower head", className: "" },
  { src: images.extra1, alt: "Bright white marble-tiled bathroom with bathtub and wall-hung vanity sink", className: "" },
  { src: images.extra41, alt: "Recent Maycor bathroom project - mirrored bathroom storage cabinet", className: "" },
  { src: images.extra42, alt: "Recent Maycor bathroom project - feature tiling and lighting detail", className: "" },
  { src: images.extra43, alt: "Recent Maycor bathroom project - toilet and basin suite", className: "" },
  { src: images.extra44, alt: "Recent Maycor bathroom project - bath panel and tiled surround", className: "" },
  { src: images.extra45, alt: "Recent Maycor bathroom project - en-suite layout with shower and basin", className: "gallery-wide" },
  { src: images.extra46, alt: "Recent Maycor bathroom project - tiled splashback and chrome fittings", className: "" },
  { src: images.extra2, alt: "White marble bathroom with bathtub and illuminated mirror", className: "" },
  { src: images.extra47, alt: "Recent Maycor bathroom project - bathroom window with natural light", className: "" },
  { src: images.extra48, alt: "Recent Maycor bathroom project - corner shower enclosure", className: "" },
  { src: images.extra49, alt: "Recent Maycor bathroom project - matt black fixtures and fittings", className: "" },
  { src: images.extra50, alt: "Recent Maycor bathroom project - patterned floor tiles", className: "" },
  { src: images.extra51, alt: "Recent Maycor bathroom project - double basin vanity unit", className: "" },
  { src: images.extra52, alt: "Recent Maycor bathroom project - curved shower screen and mirror", className: "gallery-wide" },
  { src: images.extra3, alt: "Bath with glass shower screen and round backlit mirror", className: "" },
  { src: images.extra53, alt: "Recent Maycor bathroom project - loft bathroom with sloped ceiling", className: "" },
  { src: images.extra54, alt: "Recent Maycor bathroom project - cloakroom WC suite", className: "" },
  { src: images.extra55, alt: "London bathroom refurbishment - walk-in shower with glass screen", className: "" },
  { src: images.extra56, alt: "London bathroom refurbishment - freestanding bathtub and tiled surround", className: "" },
  { src: images.extra57, alt: "London bathroom refurbishment - wall-hung vanity unit with mirror", className: "" },
  { src: images.extra58, alt: "London bathroom refurbishment - heated towel rail and tiled wall", className: "" },
  { src: images.extra4, alt: "Round backlit mirror over teal subway-tiled splashback with wall-mounted sink", className: "" },
  { src: images.extra59, alt: "London bathroom refurbishment - recessed shower niche with feature tiling", className: "gallery-wide" },
  { src: images.extra60, alt: "London bathroom refurbishment - underfloor heating and tiled flooring", className: "" },
  { src: images.extra61, alt: "London bathroom refurbishment - vanity unit with countertop basin", className: "" },
  { src: images.extra62, alt: "London bathroom refurbishment - shower enclosure with rainfall shower head", className: "" },
  { src: images.extra63, alt: "London bathroom refurbishment - mirrored bathroom storage cabinet", className: "" },
  { src: images.extra64, alt: "London bathroom refurbishment - feature tiling and lighting detail", className: "" },
  { src: images.extra5, alt: "Sink and toilet beneath round backlit mirror with blue accent tile wall", className: "" },
  { src: images.extra65, alt: "London bathroom refurbishment - toilet and basin suite", className: "" },
  { src: images.extra66, alt: "London bathroom refurbishment - bath panel and tiled surround", className: "gallery-wide" },
  { src: images.extra67, alt: "London bathroom refurbishment - en-suite layout with shower and basin", className: "" },
  { src: images.extra68, alt: "London bathroom refurbishment - tiled splashback and chrome fittings", className: "" },
  { src: images.extra69, alt: "London bathroom refurbishment - bathroom window with natural light", className: "" },
  { src: images.extra70, alt: "London bathroom refurbishment - corner shower enclosure", className: "" },
  { src: images.extra6, alt: "Bathroom with bathtub, glass shower screen and window", className: "" },
  { src: images.extra71, alt: "London bathroom refurbishment - matt black fixtures and fittings", className: "" },
  { src: images.extra72, alt: "London bathroom refurbishment - patterned floor tiles", className: "" },
  { src: images.extra73, alt: "London bathroom refurbishment - double basin vanity unit", className: "gallery-wide" },
  { src: images.extra74, alt: "London bathroom refurbishment - curved shower screen and mirror", className: "" },
  { src: images.extra75, alt: "London bathroom refurbishment - loft bathroom with sloped ceiling", className: "" },
  { src: images.extra76, alt: "London bathroom refurbishment - cloakroom WC suite", className: "" },
  { src: images.extra7, alt: "Wall-hung sink, toilet and chrome heated towel rail", className: "" },
  { src: images.extra77, alt: "Bathroom renovation detail - walk-in shower with glass screen", className: "" },
  { src: images.extra78, alt: "Bathroom renovation detail - freestanding bathtub and tiled surround", className: "" },
  { src: images.extra79, alt: "Bathroom renovation detail - wall-hung vanity unit with mirror", className: "" },
  { src: images.extra80, alt: "Bathroom renovation detail - heated towel rail and tiled wall", className: "gallery-wide" },
  { src: images.extra81, alt: "Bathroom renovation detail - recessed shower niche with feature tiling", className: "" },
  { src: images.extra82, alt: "Bathroom renovation detail - underfloor heating and tiled flooring", className: "" },
  { src: images.extra8, alt: "Glass-enclosed shower with sliding door and neutral tiling", className: "" },
  { src: images.extra83, alt: "Bathroom renovation detail - vanity unit with countertop basin", className: "" },
  { src: images.extra84, alt: "Bathroom renovation detail - shower enclosure with rainfall shower head", className: "" },
  { src: images.extra85, alt: "Bathroom renovation detail - mirrored bathroom storage cabinet", className: "" },
  { src: images.extra86, alt: "Bathroom renovation detail - feature tiling and lighting detail", className: "" },
  { src: images.extra87, alt: "Bathroom renovation detail - toilet and basin suite", className: "gallery-wide" },
  { src: images.extra88, alt: "Bathroom renovation detail - bath panel and tiled surround", className: "" },
  { src: images.extra9, alt: "Glass shower enclosure with rainfall shower head and neutral tiling", className: "" },
  { src: images.extra89, alt: "Bathroom renovation detail - en-suite layout with shower and basin", className: "" },
  { src: images.extra90, alt: "Bathroom renovation detail - tiled splashback and chrome fittings", className: "" },
  { src: images.extra91, alt: "Bathroom renovation detail - bathroom window with natural light", className: "" },
  { src: images.extra92, alt: "Bathroom renovation detail - corner shower enclosure", className: "" },
  { src: images.extra93, alt: "Bathroom renovation detail - matt black fixtures and fittings", className: "" },
  { src: images.extra10, alt: "Glass shower enclosure with circular mirror against a blue accent wall", className: "gallery-wide" },
  { src: images.extra94, alt: "Bathroom renovation detail - patterned floor tiles", className: "gallery-wide" },
  { src: images.extra95, alt: "Bathroom renovation detail - double basin vanity unit", className: "" },
  { src: images.extra96, alt: "Bathroom renovation detail - curved shower screen and mirror", className: "" },
  { src: images.extra97, alt: "Bathroom renovation detail - loft bathroom with sloped ceiling", className: "" },
  { src: images.extra98, alt: "Bathroom renovation detail - cloakroom WC suite", className: "" },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Maycor Building Contractors",
  url: "https://bathroom-renovations.maycor.co.uk/bathroom-renovations-london/",
  areaServed: [
    "Kensington", "Chelsea", "Fulham", "Battersea", "Notting Hill",
    "Hammersmith", "Hampstead", "St John's Wood", "Maida Vale", "Chiswick",
    "South Kensington", "Belgravia", "Putney", "Wimbledon", "Barnes", "Angel", "London"
  ],
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastTouchActivation = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);

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
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
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

    function pauseForInteraction() {
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        if (!gallery) return;
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
        index = closest;
        startAutoplay();
      }, 2000);
    }

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
      if (scaleFrame !== null) return;
      scaleFrame = requestAnimationFrame(() => {
        updateScales();
        scaleFrame = null;
      });
    }

    updateScales();
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
            <p className="eyebrow">Bathroom renovation contractors in London</p>
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
              alt="Modern bathroom with shower enclosure, illuminated mirror and fitted vanity"
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
            {testimonials.map((t) => (
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
            <strong>Kensington (W8)</strong>, <strong>Chelsea (SW3)</strong>, <strong>Fulham (SW6)</strong>,{" "}
            <strong>Battersea (SW11)</strong>, <strong>Notting Hill (W11)</strong>, <strong>Hammersmith (W6)</strong>,{" "}
            <strong>Hampstead (NW3)</strong>, <strong>St John&apos;s Wood (NW8)</strong>, <strong>Maida Vale (W9)</strong>,{" "}
            <strong>Chiswick (W4)</strong>, <strong>South Kensington (SW7)</strong>, <strong>Belgravia (SW1X)</strong>,{" "}
            <strong>Putney (SW15)</strong>, <strong>Wimbledon (SW19)</strong>, <strong>Barnes (SW13)</strong> and{" "}
            <strong>Angel (N1)</strong>. If your area is not listed, get in touch — we cover most of London.
          </p>
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
