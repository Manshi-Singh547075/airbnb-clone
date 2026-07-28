// components/AmenitiesInfo.jsx (complete version)
import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Flag,
  Umbrella,
  Wind,
  DoorOpen,
  Wifi,
  Tv,
  Bath,
  Check,
  ChevronDown,
  Calendar,
  Clock,
  Shield,
  Heart,
  Share,
  MapPin,
  Armchair,
  Snowflake,
  Sparkles,
  Coffee,
  Utensils,
  Flame,
  Waves,
  Dumbbell,
  Car,
  Lock,
  Volume2,
} from "lucide-react";

function AmenitiesInfo({ listing }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [guests, setGuests] = useState(listing.guestsSelected || 2);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const guestPickerRef = useRef(null);

  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Amenities", label: "Amenities" },
    { id: "Reviews", label: "Reviews" },
    { id: "Location", label: "Location" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target)
      ) {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const basePrice = listing.price * listing.nights;
  const cleaningFee = Math.round(basePrice * 0.15);
  const serviceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const handleGuestChange = (delta) => {
    setGuests((prev) => {
      const newValue = prev + delta;
      if (newValue < 1) return 1;
      if (newValue > listing.guests) return listing.guests;
      return newValue;
    });
  };

  const handleClaimOffer = () => {
    setIsClaimed(true);
    setTimeout(() => setIsClaimed(false), 3000);
  };

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }
    console.log("Reservation:", {
      guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    alert(
      `Booking confirmed for ${guests} guests from ${checkInDate} to ${checkOutDate}`,
    );
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: Wifi,
      Kitchen: Utensils,
      TV: Tv,
      Washer: Bath,
      Dryer: Bath,
      "Air conditioning": Snowflake,
      Heating: Flame,
      Pool: Waves,
      Gym: Dumbbell,
      Parking: Car,
      Security: Lock,
      "Sound system": Volume2,
      "Coffee maker": Coffee,
      Dishwasher: Utensils,
      Iron: Sparkles,
      "Hair dryer": Wind,
    };
    return iconMap[amenity] || Check;
  };

  const amenities = listing.amenities || [
    "WiFi",
    "Kitchen",
    "TV",
    "Washer",
    "Dryer",
    "Air conditioning",
    "Heating",
    "Pool",
    "Gym",
    "Parking",
    "Security",
    "Sound system",
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah",
      date: "July 2026",
      rating: 5,
      comment:
        "Absolutely stunning place! The views were incredible and the host was very responsive. We had an amazing time and would definitely come back.",
    },
    {
      id: 2,
      user: "Michael",
      date: "June 2026",
      rating: 4.9,
      comment:
        "Beautiful home with all the amenities you could need. Highly recommend for anyone looking for a relaxing getaway.",
    },
    {
      id: 3,
      user: "Emma",
      date: "June 2026",
      rating: 5,
      comment:
        "Perfect location and the property exceeded our expectations. Will definitely return with the family.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Tabs + price bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 gap-4">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium pb-3 border-b-2 transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded px-1 ${
                activeTab === tab.id
                  ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300"
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="text-sm text-right">
            <span className="font-semibold text-gray-900 dark:text-white">
              ₹{listing.price.toLocaleString("en-IN")}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {" "}
              for {listing.nights} nights
            </span>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 justify-end">
              <Star size={12} className="fill-[#FF385C] text-[#FF385C]" />
              <span className="font-medium text-gray-900 dark:text-white">
                {listing.rating}
              </span>
              <span>· {listing.reviews} reviews</span>
            </div>
          </div>
          <button
            onClick={handleReserve}
            className="bg-[#FF385C] hover:bg-[#E31C5F] text-white font-medium text-sm px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          >
            Reserve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property type */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {listing.type}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {listing.guests} guests · {listing.bedrooms} bedroom ·{" "}
              {listing.beds} bed · {listing.bathrooms} bathroom
            </p>
          </div>

          {/* Guest favourite badge */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-white hover:shadow-md transition-shadow">
            <span className="text-3xl" role="img" aria-hidden="true">
              🏆
            </span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                Guest favourite
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                One of the most loved homes on Airbnb, according to guests
              </p>
            </div>
            <div className="flex items-center gap-4 ml-auto shrink-0">
              <div className="text-center px-3">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {listing.rating}
                </p>
                <div className="flex text-xs text-[#FF385C]">
                  {"★".repeat(Math.floor(listing.rating))}
                  {listing.rating % 1 !== 0 && "★"}
                </div>
              </div>
              <div className="text-center border-l border-gray-200 dark:border-gray-700 pl-4">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {listing.reviews}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Host info */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-6">
            <img
              src={listing.hostAvatar}
              alt={listing.host}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FF385C]/20"
            />
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                Hosted by {listing.host}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {listing.hostYears} years hosting
              </p>
            </div>
            <button className="ml-auto text-sm font-medium text-[#FF385C] hover:text-[#E31C5F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded-lg px-3 py-1">
              Contact host
            </button>
          </div>

          {/* Highlights */}
          <div className="space-y-5">
            <div className="flex gap-4 group cursor-default">
              <div className="text-[#FF385C] bg-[#FF385C]/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Umbrella size={22} />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  Outdoor entertainment
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The pool and alfresco dining are great for summer trips.
                </p>
              </div>
            </div>
            <div className="flex gap-4 group cursor-default">
              <div className="text-blue-500 bg-blue-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Wind size={22} />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  Designed for staying cool
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Beat the heat with the A/C and ceiling fan.
                </p>
              </div>
            </div>
            <div className="flex gap-4 group cursor-default">
              <div className="text-green-500 bg-green-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <DoorOpen size={22} />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  Self check-in
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can check in with the building staff.
                </p>
              </div>
            </div>
          </div>

          {/* Amenities section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(showAllAmenities ? amenities : amenities.slice(0, 8)).map(
                (amenity, idx) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span>{amenity}</span>
                    </div>
                  );
                },
              )}
            </div>
            {amenities.length > 8 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#FF385C] dark:hover:text-[#FF385C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded-lg px-3 py-1"
              >
                {showAllAmenities
                  ? "Show less"
                  : `Show all ${amenities.length} amenities`}
              </button>
            )}
          </div>

          {/* Reviews section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-[#FF385C] text-[#FF385C]" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {listing.rating}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                · {listing.reviews} reviews
              </span>
            </div>
            <div className="space-y-6">
              {(showAllReviews ? reviews : reviews.slice(0, 2)).map(
                (review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.user}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">
                        · {review.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#FF385C] text-xs my-1">
                      {"★".repeat(Math.floor(review.rating))}
                      {review.rating % 1 !== 0 && "★"}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                      {review.comment}
                    </p>
                  </div>
                ),
              )}
            </div>
            {reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#FF385C] dark:hover:text-[#FF385C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded-lg px-3 py-1"
              >
                {showAllReviews
                  ? "Show less"
                  : `Show all ${reviews.length} reviews`}
              </button>
            )}
          </div>
        </div>

        {/* Right column — Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Offer banner */}
            <div
              className={`border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 flex items-start sm:items-center gap-3 bg-white shadow-sm transition-all duration-300 ${
                isClaimed
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}
              role="banner"
              aria-label="Special offer"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                🏷️
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {isClaimed ? (
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      ✓ Offer claimed! 10% off applied
                    </span>
                  ) : (
                    <>
                      Get 10% off your next stay.
                      <a
                        href="#"
                        className="underline font-medium text-gray-800 dark:text-gray-200 hover:text-[#FF385C] dark:hover:text-[#FF385C] transition-colors ml-1 focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded"
                        aria-label="Terms and conditions apply"
                      >
                        Terms apply
                      </a>
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={handleClaimOffer}
                disabled={isClaimed}
                className={`ml-auto flex-shrink-0 text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 ${
                  isClaimed
                    ? "bg-green-100 text-green-700 cursor-default"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105 active:scale-95"
                }`}
                aria-label={isClaimed ? "Offer claimed" : "Claim 10% off offer"}
              >
                {isClaimed ? "Claimed ✓" : "Claim"}
              </button>
            </div>

            {/* Main booking card */}
            <div
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-800/30 p-4 sm:p-5 space-y-4 bg-white transition-shadow duration-300"
              role="form"
              aria-label="Booking form"
            >
              <p className="text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{listing.price.toLocaleString("en-IN")}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {" "}
                  for {listing.nights} nights
                </span>
              </p>

              <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <div className="relative p-2 border-r border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <label
                    htmlFor="check-in"
                    className="block text-[10px] font-semibold tracking-wider uppercase text-gray-700 dark:text-gray-300"
                  >
                    Check-in
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    className="w-full text-sm bg-transparent outline-none dark:text-white cursor-pointer"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Check-in date"
                    required
                  />
                </div>

                <div className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <label
                    htmlFor="check-out"
                    className="block text-[10px] font-semibold tracking-wider uppercase text-gray-700 dark:text-gray-300"
                  >
                    Checkout
                  </label>
                  <input
                    id="check-out"
                    type="date"
                    className="w-full text-sm bg-transparent outline-none dark:text-white cursor-pointer"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split("T")[0]}
                    aria-label="Check-out date"
                    required
                  />
                </div>

                <div className="col-span-2 relative border-t border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                    className="w-full p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset"
                    aria-expanded={isGuestPickerOpen}
                    aria-haspopup="true"
                    aria-label="Select number of guests"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider uppercase text-gray-700 dark:text-gray-300">
                          Guests
                        </label>
                        <span className="text-sm dark:text-white">
                          {guests} guest{guests > 1 ? "s" : ""}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          isGuestPickerOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isGuestPickerOpen && (
                    <div
                      ref={guestPickerRef}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-20 animate-slideDown"
                      role="dialog"
                      aria-label="Guest selector"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium dark:text-white">Guests</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Max {listing.guests} guests
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleGuestChange(-1)}
                            disabled={guests <= 1}
                            className={`w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200 ${
                              guests <= 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
                            } focus:outline-none focus:ring-2 focus:ring-[#FF385C]`}
                            aria-label="Decrease guests"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="text-lg font-medium w-6 text-center dark:text-white">
                            {guests}
                          </span>
                          <button
                            onClick={() => handleGuestChange(1)}
                            disabled={guests >= listing.guests}
                            className={`w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200 ${
                              guests >= listing.guests
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
                            } focus:outline-none focus:ring-2 focus:ring-[#FF385C]`}
                            aria-label="Increase guests"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 underline decoration-gray-300 hover:decoration-gray-600 cursor-help">
                Free cancellation before {listing.cancelDate}
              </p>

              <button
                onClick={handleReserve}
                className="w-full bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!checkInDate || !checkOutDate}
              >
                {!checkInDate || !checkOutDate
                  ? "Select dates to reserve"
                  : "Reserve"}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                You won't be charged yet
              </p>
            </div>

            <button className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mx-auto focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded-lg px-3 py-1.5">
              <Flag size={14} />
              <span className="underline">Report this listing</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AmenitiesInfo;
