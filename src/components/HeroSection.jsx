import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Share,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Grid,
} from "lucide-react";

/* ---------------------------------------------------------
   GALLERY — Airbnb-style hero section with photo tour
--------------------------------------------------------- */
function Gallery({
  title,
  location,
  rating,
  reviewCount,
  superhost,
  images,
  price,
}) {
  const [saved, setSaved] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef(null);

  const openPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const closePhotoTour = () => {
    setIsPhotoTourOpen(false);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          nextImage();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevImage();
        }
        if (e.key === "Escape") {
          closeLightbox();
        }
      }
      if (isPhotoTourOpen && e.key === "Escape") {
        closePhotoTour();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, isPhotoTourOpen, currentImageIndex]);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isPhotoTourOpen || isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPhotoTourOpen, isLightboxOpen]);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this amazing place on Airbnb!`,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Show toast notification (you can implement this)
        console.log("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" />
              <span className="font-medium text-gray-900 dark:text-white">
                {rating}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({reviewCount} reviews)
              </span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-600 dark:text-gray-400 underline decoration-gray-300 hover:decoration-gray-600 cursor-pointer">
              {superhost && "Superhost"}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="Share this property"
          >
            <Share size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded-lg px-2 py-1 ${
              saved
                ? "text-[#FF385C]"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
            aria-label={saved ? "Remove from saved" : "Save this property"}
          >
            <Heart
              size={16}
              className={`transition-all duration-300 ${
                saved ? "fill-[#FF385C] text-[#FF385C] scale-110" : ""
              }`}
            />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Image grid */}
      <div className="relative grid grid-cols-4 grid-rows-2 gap-2 rounded-xl sm:rounded-2xl overflow-hidden h-[280px] sm:h-[360px] md:h-[420px] bg-gray-100">
        {/* Main large image */}
        <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
          <img
            src={images[0] || "/api/placeholder/1200/800"}
            alt={`${title} - Main view`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <button
            onClick={() => openLightbox(0)}
            className="absolute inset-0 w-full h-full"
            aria-label="View main photo in lightbox"
          />
        </div>

        {/* Top right image */}
        <div className="relative group cursor-pointer overflow-hidden">
          <img
            src={images[1] || "/api/placeholder/800/600"}
            alt={`${title} - View 2`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <button
            onClick={() => openLightbox(1)}
            className="absolute inset-0 w-full h-full"
            aria-label="View photo 2 in lightbox"
          />
        </div>

        {/* Bottom right - image 3 */}
        <div className="relative group cursor-pointer overflow-hidden">
          <img
            src={images[2] || "/api/placeholder/800/600"}
            alt={`${title} - View 3`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <button
            onClick={() => openLightbox(2)}
            className="absolute inset-0 w-full h-full"
            aria-label="View photo 3 in lightbox"
          />
        </div>

        {/* Bottom right - image 4 with "Show all photos" button */}
        <div className="relative group cursor-pointer overflow-hidden">
          <img
            src={images[3] || "/api/placeholder/800/600"}
            alt={`${title} - View 4`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Gradient overlay for "Show all photos" button */}
          <div className="absolute inset-0 bg-gradient-to- from-black/50 via-transparent to-transparent" />

          <button
            onClick={openPhotoTour}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white text-gray-800 dark:text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            aria-label="Show all photos"
          >
            <Grid size={14} />
            <span className="hidden xs:inline">Show all photos</span>
            <span className="xs:hidden">All</span>
          </button>
        </div>
      </div>

      {/* Photo Tour Overlay */}
      {isPhotoTourOpen && (
        <div
          className="fixed inset-0 bg-white z-50 overflow-y-auto animate-slideUp"
          role="dialog"
          aria-modal="true"
          aria-label="Photo tour"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 dark:border-gray-700 z-10 px-4 py-3 flex items-center justify-between">
            <button
              onClick={closePhotoTour}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              aria-label="Close photo tour"
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold dark:text-white">
              All photos
            </h2>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square cursor-pointer rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                  onClick={() => {
                    closePhotoTour();
                    setTimeout(() => openLightbox(idx), 100);
                  }}
                >
                  <img
                    src={img || "/api/placeholder/800/600"}
                    alt={`${title} - Photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          ref={lightboxRef}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-1.5 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 text-white hover:bg-white/10 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-6xl max-h-[90vh] mx-4">
            <img
              src={images[currentImageIndex] || "/api/placeholder/1200/800"}
              alt={`${title} - Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-contain max-h-[85vh] animate-imageFadeIn"
            />
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 text-white hover:bg-white/10 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* Thumbnail navigation at bottom */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80%] px-4 py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                  idx === currentImageIndex
                    ? "ring-2 ring-white scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              >
                <img
                  src={img || "/api/placeholder/100/100"}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
