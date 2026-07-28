import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  LayoutGrid,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Photo labels shown in the Photo Tour
───────────────────────────────────────────────────────── */
const PHOTO_LABELS = [
  "Living area",
  "Bedroom · 1 king bed",
  "Outdoor · Pool & jacuzzi",
  "Bedroom · Interior",
  "Balcony & garden view",
];

/* ─────────────────────────────────────────────────────────
   SHARE / SAVE button pair (reused in overlays)
───────────────────────────────────────────────────────── */
function ShareSave({ saved, onSave, dark = false }) {
  const cls = dark
    ? "flex items-center gap-1.5 text-sm font-medium underline text-white hover:text-gray-200 transition-colors"
    : "flex items-center gap-1.5 text-sm font-medium underline text-gray-800 hover:text-gray-600 transition-colors";

  return (
    <div className="flex items-center gap-4">
      <button className={cls}>
        <Share2 size={16} />
        Share
      </button>
      <button onClick={onSave} className={cls}>
        <Heart
          size={16}
          className={saved ? "fill-[#FF385C] text-[#FF385C]" : ""}
        />
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LIGHTBOX  — single photo, full-screen black overlay
───────────────────────────────────────────────────────── */
function Lightbox({ images, initialIndex, onClose, saved, onSave }) {
  const [index, setIndex] = useState(initialIndex);
  const [fade, setFade] = useState(true);

  const go = useCallback(
    (dir) => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + dir + images.length) % images.length);
        setFade(true);
      }, 120);
    },
    [images.length],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-200 bg-black flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <span className="text-white text-sm font-medium">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-6">
          <ShareSave saved={saved} onSave={onSave} dark />
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex-1 relative flex items-center justify-center min-h-0">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <img
          key={index}
          src={images[index]}
          alt={`Photo ${index + 1}`}
          className="max-h-full max-w-full object-contain select-none"
          style={{
            opacity: fade ? 1 : 0,
            transition: "opacity 0.12s ease",
          }}
          draggable={false}
        />

        {/* Next */}
        <button
          onClick={() => go(1)}
          className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Caption */}
      <div className="shrink-0 text-center text-gray-400 text-sm pb-5 pt-3">
        {PHOTO_LABELS[index] ?? `Photo ${index + 1}`}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PHOTO TOUR  — two-column gallery with left labels and right image column
───────────────────────────────────────────────────────── */
function PhotoTour({
  images,
  title,
  rating,
  reviewCount,
  location,
  saved,
  onSave,
  onClose,
  onOpenLightbox,
  initialIndex = 0,
}) {
  // Lock scroll on underlying page
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Scroll to the initially requested image when the tour opens
  useEffect(() => {
    if (initialIndex && itemRefs.current[initialIndex]) {
      // small timeout so sticky header is applied
      setTimeout(() => {
        itemRefs.current[initialIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    }
  }, [initialIndex]);

  return (
    <div
      className="fixed inset-0 z-100 bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="All photos"
    >
      {/* Sticky header with thumbnails */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors"
            aria-label="Close photo tour"
          >
            <X size={18} />
            <span>Close</span>
          </button>
          <ShareSave saved={saved} onSave={onSave} />
        </div>

        {/* Thumbnails strip */}
        <div className="mt-3 overflow-x-auto">
          <div className="flex gap-3 items-start">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() =>
                  itemRefs.current[i] &&
                  itemRefs.current[i].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                className="flex-shrink-0"
                aria-label={`Jump to photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt={PHOTO_LABELS[i] ?? `Photo ${i + 1}`}
                  className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                  loading={i < 5 ? "eager" : "lazy"}
                />
                <div className="text-xs text-gray-600 mt-1 text-center">
                  {PHOTO_LABELS[i] ?? `Photo ${i + 1}`}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content: two columns — left labels, right images */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-[1120px] mx-auto px-6 py-8">
          {/* Listing meta */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              {title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Star size={12} className="fill-[#FF385C] text-[#FF385C]" />
              <span className="font-medium text-gray-900">{rating}</span>
              <span>·</span>
              <span className="underline">{reviewCount} reviews</span>
              <span>·</span>
              <span className="underline">{location}</span>
            </div>
          </div>

          <div className="grid grid-cols-[260px_1fr] gap-8">
            {/* Empty header column for spacing on the first row */}
            <div className="hidden md:block" />
            <div />

            {images.map((src, i) => (
              <React.Fragment key={i}>
                <div ref={(el) => (itemRefs.current[i] = el)} className="py-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {PHOTO_LABELS[i] ?? `Photo ${i + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {i === 0
                      ? "Sofa · Air conditioning · Ceiling fan · TV"
                      : ""}
                  </p>
                </div>

                <div className="py-4">
                  <button
                    onClick={() => onOpenLightbox(i)}
                    className="w-full block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 group"
                    aria-label={`Open photo ${i + 1} in lightbox`}
                  >
                    <img
                      src={src}
                      alt={PHOTO_LABELS[i] ?? `Photo ${i + 1}`}
                      className="w-full object-cover rounded-xl"
                      style={{ aspectRatio: "4/3" }}
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="pb-12" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GALLERY  — the 5-photo hero grid on the listing page
───────────────────────────────────────────────────────── */
export default function Gallery({ title, images, location, rating, reviewCount, superhost }) {
  const [saved, setSaved] = useState(false);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [tourInitialIndex, setTourInitialIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Open photo tour (used as the improved 'lightbox' from the hero)
  const openPhotoTourAt = useCallback((i) => {
    setTourInitialIndex(i ?? 0);
    setPhotoTourOpen(true);
  }, []);

  // legacy single-photo lightbox kept for other flows
  const openLightbox = useCallback((i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const openPhotoTour = useCallback(() => {
    setPhotoTourOpen(true);
  }, []);

  const closePhotoTour = useCallback(() => {
    setPhotoTourOpen(false);
  }, []);

  // Open lightbox from within photo tour
  const openLightboxFromTour = useCallback((i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    // keep photo tour mounted so closing lightbox returns to tour
  }, []);

  return (
    <>
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 pt-6 pb-6">
        {/* Title only */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-[26px] font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          <ShareSave saved={saved} onSave={() => setSaved((s) => !s)} />
        </div>

        {/* 5-photo grid */}
        <div className="relative grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden">
          {/* Main large photo */}
          <button
            onClick={() => openPhotoTourAt(0)}
            className="col-span-2 row-span-2 relative overflow-hidden focus:outline-none group"
            aria-label="View photo 1"
          >
            <img
              src={images[0]}
              alt={`${title} – photo 1`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.08] transition-colors duration-300" />
          </button>

          {/* Top-right photos */}
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => openPhotoTourAt(i)}
              className="relative overflow-hidden focus:outline-none group"
              aria-label={`View photo ${i + 1}`}
            >
              <img
                src={images[i]}
                alt={`${title} – photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.08] transition-colors duration-300" />
            </button>
          ))}

          {/* Bottom-right photo + "Show all photos" button */}
          <button
            onClick={() => openPhotoTourAt(4)}
            className="relative overflow-hidden focus:outline-none group"
            aria-label={`View photo 5`}
          >
            <img
              src={images[4]}
              alt={`${title} – photo 5`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.08] transition-colors duration-300" />
          </button>

          {/* "Show all photos" pill — bottom-right corner */}
          <button
            onClick={openPhotoTour}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-150 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-800 z-10"
            aria-label="Show all photos"
          >
            <LayoutGrid size={16} strokeWidth={2} />
            Show all photos
          </button>
        </div>
      </section>

      {/* Photo Tour overlay — always in DOM when open, hidden behind Lightbox */}
      {photoTourOpen && (
        <div style={{ display: lightboxOpen ? "none" : "block" }}>
          <PhotoTour
            images={images}
            title={title}
            rating={rating}
            reviewCount={reviewCount}
            location={location}
            saved={saved}
            onSave={() => setSaved((s) => !s)}
            onClose={closePhotoTour}
            onOpenLightbox={openLightboxFromTour}
            initialIndex={tourInitialIndex}
          />
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
          saved={saved}
          onSave={() => setSaved((s) => !s)}
        />
      )}
    </>
  );
}
