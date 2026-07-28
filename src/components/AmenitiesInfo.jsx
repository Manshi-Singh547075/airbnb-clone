import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Star, Flag, Umbrella, Wind, DoorOpen, Wifi, Tv, Bath, Check,
  ChevronDown, ChevronUp, MapPin, Snowflake, Sparkles, Coffee,
  Utensils, Flame, Waves, Dumbbell, Car, Lock, Volume2, BedDouble,
  Clock, AlertTriangle, X, Medal, Minus, Plus, Shield,
} from "lucide-react";

/* ─── helpers ─── */
const fmt = (n) => n.toLocaleString("en-IN");

function Divider() {
  return <hr className="border-gray-200" />;
}

/* ─── Amenity icon map ─── */
const AMENITY_ICONS = {
  WiFi: Wifi, Kitchen: Utensils, TV: Tv, Washer: Bath, Dryer: Bath,
  "Air conditioning": Snowflake, Heating: Flame, Pool: Waves,
  Gym: Dumbbell, Parking: Car, Security: Lock, "Sound system": Volume2,
  "Coffee maker": Coffee, Dishwasher: Utensils, Iron: Sparkles,
  "Hair dryer": Wind,
};

/* ─── Static reviews ─── */
const REVIEWS = [
  {
    id: 1, user: "Sarah M.", date: "July 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    comment: "Absolutely stunning place! The jacuzzi was the highlight — we used it every evening. Host was very responsive and the apartment was spotlessly clean. Would definitely come back!",
  },
  {
    id: 2, user: "Michael R.", date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    comment: "Beautiful apartment with all the amenities you could need. Perfect location close to the beach. Highly recommend for anyone looking for a relaxing Goa getaway.",
  },
  {
    id: 3, user: "Emma T.", date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    comment: "Perfect location and the property exceeded our expectations. The king bed was incredibly comfortable and the A/C worked great. Will definitely return.",
  },
  {
    id: 4, user: "Arjun P.", date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    comment: "Great value for Goa! Exactly as pictured. Mirashya was very helpful and recommended great local spots. The jacuzzi is a real treat after a day at the beach.",
  },
];

const RATING_CATS = [
  { label: "Cleanliness", score: 5.0 },
  { label: "Accuracy", score: 4.9 },
  { label: "Check-in", score: 5.0 },
  { label: "Communication", score: 5.0 },
  { label: "Location", score: 4.8 },
  { label: "Value", score: 4.9 },
];

/* ═══════════════════════════════════════════════════════
   BOOKING CARD (right column, sticky)
═══════════════════════════════════════════════════════ */
function BookingCard({ listing }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(listing.guestsSelected || 1);
  const [guestOpen, setGuestOpen] = useState(false);
  const guestRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const basePrice = listing.price * listing.nights;
  const cleaningFee = Math.round(basePrice * 0.15);
  const serviceFee = Math.round(basePrice * 0.12);
  const total = basePrice + cleaningFee + serviceFee;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setGuestOpen(false); };
    const onOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) setGuestOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  const changeGuests = (d) =>
    setGuests((g) => Math.max(1, Math.min(listing.guests, g + d)));

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert("Please select your check-in and checkout dates.");
      return;
    }
    alert(`Booking confirmed for ${guests} guest${guests > 1 ? "s" : ""}!`);
  };

  return (
    <div className="border border-gray-300 rounded-2xl shadow-xl p-6 space-y-4 bg-white">
      {/* Price + rating */}
      <div className="flex items-center justify-between">
        <p className="text-[22px] font-semibold text-gray-900">
          ₹{fmt(listing.price)}{" "}
          <span className="text-base font-normal text-gray-500">night</span>
        </p>
        <div className="flex items-center gap-1 text-sm">
          <Star size={13} className="fill-[#FF385C] text-[#FF385C]" />
          <span className="font-semibold text-gray-900">{listing.rating}</span>
          <span className="text-gray-500">·</span>
          <button className="text-gray-500 underline">{listing.reviews} reviews</button>
        </div>
      </div>

      {/* Date + guest grid */}
      <div className="border border-gray-400 rounded-xl overflow-visible">
        {/* Dates row */}
        <div className="grid grid-cols-2 divide-x divide-gray-400">
          <div className="p-3 hover:bg-gray-50 transition-colors rounded-tl-xl">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-0.5">
              Check-in
            </label>
            <input
              type="date"
              className="w-full text-sm text-gray-800 bg-transparent outline-none cursor-pointer"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="p-3 hover:bg-gray-50 transition-colors rounded-tr-xl">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-0.5">
              Checkout
            </label>
            <input
              type="date"
              className="w-full text-sm text-gray-800 bg-transparent outline-none cursor-pointer"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Guests row */}
        <div className="border-t border-gray-400 relative" ref={guestRef}>
          <button
            onClick={() => setGuestOpen((o) => !o)}
            className="w-full p-3 text-left hover:bg-gray-50 rounded-b-xl transition-colors focus:outline-none"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-0.5">
              Guests
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-600 transition-transform duration-200 ${guestOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {guestOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 z-30 animate-slideDown">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Guests</p>
                  <p className="text-xs text-gray-500">Up to {listing.guests} guests</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => changeGuests(-1)}
                    disabled={guests <= 1}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors focus:outline-none ${
                      guests <= 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-500 text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{guests}</span>
                  <button
                    onClick={() => changeGuests(1)}
                    disabled={guests >= listing.guests}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors focus:outline-none ${
                      guests >= listing.guests ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-500 text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reserve button */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-base bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:from-[#D70466] hover:to-[#BD1E59] transition-all duration-150 hover:shadow-lg active:scale-[0.985] focus:outline-none"
      >
        {!checkIn || !checkOut ? "Check availability" : "Reserve"}
      </button>

      <p className="text-center text-sm text-gray-500">You won't be charged yet</p>

      {/* Price breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline">₹{fmt(listing.price)} × {listing.nights} nights</span>
          <span>₹{fmt(basePrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline">Cleaning fee</span>
          <span>₹{fmt(cleaningFee)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline">Airbnb service fee</span>
          <span>₹{fmt(serviceFee)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-semibold text-gray-900">
          <span>Total before taxes</span>
          <span>₹{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AMENITIES MODAL
═══════════════════════════════════════════════════════ */
function AmenitiesModal({ amenities, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">What this place offers</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {amenities.map((amenity, i) => {
            const Icon = AMENITY_ICONS[amenity] ?? Check;
            return (
              <div key={i} className="flex items-center gap-5 py-4 border-b border-gray-100 last:border-0">
                <Icon size={22} className="text-gray-700 shrink-0" />
                <span className="text-gray-800">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function AmenitiesInfo({ listing }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showMore, setShowMore] = useState(false);
  const [amenitiesModal, setAmenitiesModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const overviewRef = useRef(null);
  const amenitiesRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);

  const sectionMap = {
    Overview: overviewRef,
    Amenities: amenitiesRef,
    Reviews: reviewsRef,
    Location: locationRef,
  };

  /* Scroll-spy: update active tab based on scroll position */
  useEffect(() => {
    const onScroll = () => {
      const sections = [
        { id: "Location", ref: locationRef },
        { id: "Reviews", ref: reviewsRef },
        { id: "Amenities", ref: amenitiesRef },
        { id: "Overview", ref: overviewRef },
      ];
      for (const { id, ref } of sections) {
        if (!ref.current) continue;
        const top = ref.current.getBoundingClientRect().top;
        if (top <= 140) { setActiveTab(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const ref = sectionMap[id];
    if (!ref?.current) return;
    const offset = ref.current.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const amenities = listing.amenities ?? [];
  const descParts = (listing.description ?? "").split("\n\n");
  const shortDesc = descParts[0] ?? "";

  const houseRules = listing.houseRules ?? [];
  const safetyItems = listing.safetyItems ?? [];
  const cancelPolicy = listing.cancellationPolicy ?? "";

  const basePrice = listing.price * listing.nights;
  const cleaningFee = Math.round(basePrice * 0.15);
  const serviceFee = Math.round(basePrice * 0.12);
  const total = basePrice + cleaningFee + serviceFee;

  return (
    <>
      {/* ── Sticky tab strip ── */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          <nav className="flex gap-6">
            {["Overview", "Amenities", "Reviews", "Location"].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollTo(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none ${
                  activeTab === tab
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          {/* Quick reserve (desktop only, hidden — booking card handles this) */}
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div className="space-y-10 min-w-0">

            {/* 1 · Property type */}
            <div ref={overviewRef} className="pb-8 border-b border-gray-200">
              <h2 className="text-[22px] font-semibold text-gray-900 leading-snug">
                {listing.type}
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.bathrooms} bath
              </p>
            </div>

            {/* 2 · Guest Favourite badge */}
            <div className="pb-8 border-b border-gray-200">
              <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
                <Medal size={40} className="text-[#FF385C] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[15px]">Guest favourite</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-snug">
                    One of the most loved homes on Airbnb, according to guests
                  </p>
                </div>
                <div className="flex items-center gap-5 shrink-0 pl-4 border-l border-gray-200">
                  <div className="text-center">
                    <p className="text-[22px] font-semibold text-gray-900">{listing.rating}</p>
                    <div className="flex gap-0.5 mt-0.5 justify-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={9} className="fill-[#FF385C] text-[#FF385C]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[22px] font-semibold text-gray-900">{listing.reviews}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 · Host row */}
            <div className="pb-8 border-b border-gray-200 flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={listing.hostAvatar}
                  alt={listing.host}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {/* Superhost badge */}
                <span className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full p-0.5">
                  <Star size={10} className="fill-[#FF385C] text-[#FF385C]" />
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Hosted by {listing.host}</p>
                <p className="text-sm text-gray-500">Superhost · {listing.hostYears} years hosting</p>
              </div>
            </div>

            {/* 4 · Highlights */}
            <div className="pb-8 border-b border-gray-200 space-y-6">
              <div className="flex gap-5 items-start">
                <Umbrella size={26} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-gray-900">Outdoor entertainment</p>
                  <p className="text-sm text-gray-500 mt-0.5">The pool and alfresco dining are great for summer trips.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Snowflake size={26} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-gray-900">Designed for staying cool</p>
                  <p className="text-sm text-gray-500 mt-0.5">Beat the heat with the A/C and ceiling fan.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <DoorOpen size={26} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-gray-900">Self check-in</p>
                  <p className="text-sm text-gray-500 mt-0.5">You can check in with the building staff.</p>
                </div>
              </div>
            </div>

            {/* 5 · Description */}
            <div className="pb-8 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {showMore ? listing.description : shortDesc}
              </p>
              {descParts.length > 1 && (
                <button
                  onClick={() => setShowMore((s) => !s)}
                  className="mt-3 flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-600 transition-colors"
                >
                  {showMore ? "Show less" : "Show more"}
                  {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>

            {/* 6 · Where you'll sleep */}
            {listing.sleepingArrangements?.length > 0 && (
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-[22px] font-semibold text-gray-900 mb-5">Where you'll sleep</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                  {listing.sleepingArrangements.map((room, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shrink-0 w-52">
                      <img src={room.image} alt={room.room} className="w-full h-36 object-cover" />
                      <div className="p-4">
                        <p className="font-semibold text-gray-900 text-sm">{room.room}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                          <BedDouble size={14} />
                          {room.bedType}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7 · Amenities */}
            <div ref={amenitiesRef} className="pb-8 border-b border-gray-200">
              <h3 className="text-[22px] font-semibold text-gray-900 mb-5">What this place offers</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {amenities.slice(0, 10).map((a, i) => {
                  const Icon = AMENITY_ICONS[a] ?? Check;
                  return (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <Icon size={22} strokeWidth={1.5} className="shrink-0" />
                      <span className="text-sm">{a}</span>
                    </div>
                  );
                })}
              </div>
              {amenities.length > 10 && (
                <button
                  onClick={() => setAmenitiesModal(true)}
                  className="mt-6 border border-gray-900 text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  Show all {amenities.length} amenities
                </button>
              )}
            </div>

            {/* 8 · Reviews */}
            <div ref={reviewsRef} className="pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Star size={18} className="fill-[#FF385C] text-[#FF385C]" />
                <span className="text-[22px] font-semibold text-gray-900">{listing.rating}</span>
                <span className="text-gray-500 text-lg">·</span>
                <span className="text-[22px] font-semibold text-gray-900">{listing.reviews} reviews</span>
              </div>

              {/* Rating category bars */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-8">
                {RATING_CATS.map(({ label, score }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-700 shrink-0">{label}</span>
                    <div className="flex-1 h-[2px] bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-gray-900 rounded-full"
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 w-6 text-right">{score}</span>
                  </div>
                ))}
              </div>

              {/* Review cards – 2-col grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {(showAllReviews ? REVIEWS : REVIEWS.slice(0, 4)).map((r) => (
                  <div key={r.id}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.user} className="w-11 h-11 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.user}</p>
                        <p className="text-xs text-gray-500">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} className="fill-gray-900 text-gray-900" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{r.comment}</p>
                  </div>
                ))}
              </div>

              {REVIEWS.length > 4 && (
                <button
                  onClick={() => setShowAllReviews((s) => !s)}
                  className="mt-8 border border-gray-900 text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  {showAllReviews ? "Show fewer reviews" : `Show all ${listing.reviews} reviews`}
                </button>
              )}
            </div>

            {/* 9 · Location */}
            <div ref={locationRef} className="pb-8 border-b border-gray-200">
              <h3 className="text-[22px] font-semibold text-gray-900 mb-1">Where you'll be</h3>
              <p className="text-sm text-gray-700 mb-4 font-medium">Candolim, Goa, India</p>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-72 bg-gray-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=75"
                  alt="Map of Candolim, Goa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full shadow-xl p-3.5 border border-gray-200">
                    <MapPin size={24} className="text-[#FF385C]" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                Situated in the heart of Candolim — a short walk from the beach, local shacks, restaurants, and the historic Sinquerim Fort. Quiet at night, vibrant by day.
              </p>
            </div>

            {/* 10 · Things to know */}
            <div className="pb-8">
              <h3 className="text-[22px] font-semibold text-gray-900 mb-6">Things to know</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* House rules */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">House rules</h4>
                  <ul className="space-y-3">
                    {houseRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Clock size={15} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Safety */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Safety & property</h4>
                  <ul className="space-y-3">
                    {safetyItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <AlertTriangle size={15} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Cancellation */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Cancellation policy</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{cancelPolicy}</p>
                </div>
              </div>
            </div>

            {/* Report */}
            <div className="flex pt-2">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 underline hover:text-gray-700 transition-colors">
                <Flag size={13} strokeWidth={1.5} />
                Report this listing
              </button>
            </div>
          </div>

          {/* ════ RIGHT COLUMN — Sticky Booking Card ════ */}
          <div className="hidden lg:block">
            <div className="sticky top-[140px]">
              {/* Promo banner */}
              <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-3 mb-4 shadow-sm">
                <span className="text-xl shrink-0">🏷️</span>
                <p className="text-sm text-gray-700 flex-1">
                  Get 10% off — <button className="underline font-medium hover:text-[#FF385C] transition-colors">Terms apply</button>
                </p>
                <button className="shrink-0 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Claim
                </button>
              </div>
              <BookingCard listing={listing} />
              <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1.5 text-sm text-gray-500 underline hover:text-gray-700 transition-colors">
                  <Flag size={13} strokeWidth={1.5} />
                  Report this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities modal */}
      {amenitiesModal && (
        <AmenitiesModal
          amenities={amenities}
          onClose={() => setAmenitiesModal(false)}
        />
      )}
    </>
  );
}
