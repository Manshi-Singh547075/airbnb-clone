import React, { useState, useEffect, useRef } from "react";
import { Flag, ChevronDown, Star } from "lucide-react";

/* ---------------------------------------------------------
   BOOKING CARD — Airbnb-style reservation component
--------------------------------------------------------- */
function BookingCard({ listing, onReserve }) {
  const [guests, setGuests] = useState(2);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const guestPickerRef = useRef(null);

  // Close guest picker on outside click
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Calculate total price
  const basePrice = listing.price * listing.nights;
  const cleaningFee = Math.round(basePrice * 0.15);
  const serviceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const handleGuestChange = (delta) => {
    setGuests((prev) => {
      const newValue = prev + delta;
      if (newValue < 1) return 1;
      if (newValue > listing.maxGuests) return listing.maxGuests;
      return newValue;
    });
  };

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      // Show validation error
      console.log("Please select dates");
      return;
    }
    if (onReserve) {
      onReserve({
        guests,
        checkInDate,
        checkOutDate,
        totalPrice,
      });
    }
  };

  const handleClaimOffer = () => {
    setIsClaimed(true);
    setTimeout(() => setIsClaimed(false), 3000);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Offer banner */}
        <div
          className={`border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start sm:items-center gap-3 bg-white shadow-sm transition-all duration-300 ${
            isClaimed ? "border-green-500 bg-green-50" : ""
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
            className={`ml-auto flex-shrink-0 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 ${
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
          className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-800/30 p-5 space-y-4 bg-white transition-shadow duration-300"
          role="form"
          aria-label="Booking form"
        >
          {/* Price */}
          <div className="flex items-baseline justify-between">
            <p className="text-2xl">
              <span className="font-semibold text-gray-900 dark:text-white">
                ₹{listing.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                {" "}
                / night
              </span>
            </p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" />
              <span className="font-medium text-gray-900 dark:text-white">
                {listing.rating}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ({listing.reviews})
              </span>
            </div>
          </div>

          {/* Date and guest input */}
          <div
            className="grid grid-cols-2 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
            role="group"
            aria-label="Booking details"
          >
            {/* Check-in */}
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

            {/* Check-out */}
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

            {/* Guests - full width */}
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

              {/* Guest picker dropdown */}
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
                        Max {listing.maxGuests} guests
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
                        disabled={guests >= listing.maxGuests}
                        className={`w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200 ${
                          guests >= listing.maxGuests
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

          {/* Cancellation policy */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 underline decoration-gray-300 hover:decoration-gray-600 cursor-help">
            Free cancellation before {listing.cancelDate}
          </p>

          {/* Reserve button */}
          <button
            onClick={handleReserve}
            className="w-full bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!checkInDate || !checkOutDate}
            aria-label="Reserve this property"
          >
            {!checkInDate || !checkOutDate
              ? "Select dates to reserve"
              : "Reserve"}
          </button>

          {/* No charge notice */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            You won't be charged yet
          </p>

          {/* Price breakdown toggle */}
          <button
            onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            className="w-full flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded-lg px-2 py-1"
            aria-expanded={showPriceBreakdown}
            aria-label="Toggle price breakdown"
          >
            <span className="underline">Price breakdown</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showPriceBreakdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Price breakdown details */}
          {showPriceBreakdown && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2 animate-slideDown">
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>
                  ₹{listing.price.toLocaleString("en-IN")} × {listing.nights}{" "}
                  nights
                </span>
                <span>₹{basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Cleaning fee</span>
                <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Service fee</span>
                <span>₹{serviceFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Report listing button */}
        <button
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mx-auto focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded-lg px-3 py-1.5"
          aria-label="Report this listing"
        >
          <Flag size={14} />
          <span className="underline">Report this listing</span>
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
