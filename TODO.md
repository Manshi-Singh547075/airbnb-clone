# Debug Fix Plan - Airbnb Clone

## ✅ Completed:

1. ✅ **Plan approval** from user
2. ✅ **vite.config.js** - Added `@tailwindcss/vite` plugin ✓
3. ✅ **src/index.css** - Replaced with Tailwind import directives + custom animations ✓
4. ✅ **src/App.jsx** - Added `maxGuests: 8` to listing data ✓
5. ✅ **src/components/BookingCard.jsx** - Fixed `reviewCount` → `reviews`, cleaned imports, removed unused `isHovering` state ✓
6. ✅ **src/components/HeroSection.jsx** - Fixed **TDZ bug**: moved `nextImage`, `prevImage`, `closeLightbox`, `closePhotoTour` declarations before the `useEffect` that calls them; removed unused `isHovering` state; cleaned unused imports ✓
7. ✅ **src/components/AmenitiesInfo.jsx** - Added back `Sparkles` import (used by "Iron" amenity icon), cleaned unused imports ✓

## Verify:

- [ ] Run `npm run dev` and test the app
