"use client";

import { TouchEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type GalleryPhoto = { src: string; alt: string; className: string };

/** Interactive gallery for BathroomLandingPage: autoplaying carousel, prev/next controls and the
 * fullscreen lightbox. Split out so the rest of the landing page can render on the server and
 * ship no hydration JS for its static sections. */
export function BathroomGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryControls = useRef<{ prev: () => void; next: () => void } | null>(null);

  function showPrevPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current - 1 + photos.length) % photos.length));
  }

  function showNextPhoto() {
    setLightboxIndex((current) => (current === null ? null : (current + 1) % photos.length));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
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
        {photos.map((photo, photoIndex) => (
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

      {lightboxIndex !== null
        ? createPortal(
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
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
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
            </div>,
            document.body
          )
        : null}
    </>
  );
}
