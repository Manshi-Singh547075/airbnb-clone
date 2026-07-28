// AirbnbListingPage.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Gallery from "./components/HeroSection";
import AmenitiesInfo from "./components/AmenitiesInfo";
import h1 from "./assets/hero1.jpeg";
import h2 from "./assets/hero2.jpeg";
import h3 from "./assets/hero3.jpeg";
import h4 from "./assets/hero4.jpeg";
import h5 from "./assets/hero5.jpeg";
// import "./global.css";

export default function AirbnbListingPage() {
  const images = [
    h1,
    h2,
    h3,
    h4,
    h5,
  ];

  const listing = {
    type: "Entire serviced apartment in Candolim, India",
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rating: 4.95,
    reviews: 19,
    host: "Mirashya Homes",
    hostYears: 2,
    hostAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    price: 28499,
    nights: 5,
    checkIn: "10/18/2026",
    checkOut: "10/23/2026",
    guestsSelected: 2,
    cancelDate: "17 October",
    description:
      "Welcome to our romantic Jacuzzi 1BHK at Mirashya UG10 in Candolim — a tranquil retreat nestled in the heart of Goa. The apartment features a private jacuzzi, a fully equipped kitchen, plush king-size bed, and a breezy balcony where you can soak in the Goan vibe.\n\nPerfect for couples or solo travellers seeking a serene escape. The space is thoughtfully designed with premium furnishings, mood lighting, and everything you need for a relaxing stay. Steps away from Candolim beach, local restaurants, and the vibrant Goa nightlife.",
    sleepingArrangements: [
      {
        room: "Bedroom",
        bedType: "1 king bed",
        image:
          "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&q=80",
      },
    ],
    houseRules: [
      "Check-in: After 2:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No pets",
      "No parties or events",
      "Maximum 3 guests",
    ],
    safetyItems: [
      "Carbon monoxide alarm",
      "Smoke alarm",
      "Security camera/recording device",
    ],
    cancellationPolicy:
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
    amenities: [
      "WiFi",
      "Kitchen",
      "TV",
      "Air conditioning",
      "Washer",
      "Dryer",
      "Heating",
      "Pool",
      "Parking",
      "Security",
      "Sound system",
      "Coffee maker",
      "Iron",
      "Hair dryer",
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <Gallery
        title="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"
        images={images}
      />
      <AmenitiesInfo listing={listing} />
    </div>
  );
}
