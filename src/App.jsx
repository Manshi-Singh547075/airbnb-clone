// AirbnbListingPage.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Gallery from "./components/HeroSection";
import AmenitiesInfo from "./components/AmenitiesInfo";
// import "./global.css";

export default function AirbnbListingPage() {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
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
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <Gallery
        title="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"
        images={images}
        location="Candolim, India"
        rating={listing.rating}
        reviewCount={listing.reviews}
        superhost={true}
        price={listing.price}
      />
      <AmenitiesInfo listing={listing} />
    </div>
  );
}
