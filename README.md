 Airbnb clone



Tech stack
- React (JSX)
- Vite (dev server + build)
- Tailwind CSS (utility-first styling)

What is implemented (frontend only)
- Gallery (hero) grid with 5 primary photos and a "Show all photos" control.
- Photo Tour overlay: a scrollable full-screen gallery with:
  - Sticky heading "Photo Tour" only (thumbnails and photos scroll with content)
  - Thumbnails strip (scrolls with content)
  - Two-column layout on wide screens: left column contains labels and descriptions, right column shows large images
  - Increased image sizes and larger typography for the tour
  - Hover/scale animation on thumbnails and tour images (matches hero image animation)
  - Additional assets included in the tour: Gym, bedroom, Full kitchen, Full bathroom
  - Single-photo Lightbox (black fullscreen) preserved and wired to open from the tour for a focused view with keyboard navigation



How to run (development)
1. Install dependencies:
   npm install

2. Start dev server:
   npm run dev

   Open the app in the browser at the URL printed by Vite (usually http://localhost:5173)

3. Build for production:
   npm run build
   npm run preview    # to preview the production build

Notes for developers
- Main component: src/components/HeroSection.jsx — contains Gallery, PhotoTour, and Lightbox components.
- Assets: src/assets/ contains the images used by the gallery and tour (hero1..hero5, Gym.jpeg, bedroom.jpeg, Full kitchen.jpeg, Full bathroom.jpeg).
- If you want the PhotoTour to load images in a different order, update the tourImages array inside Gallery in HeroSection.jsx.
- If any image paths are missing in the browser console, change the string paths to explicit imports at the top of the module, e.g.:
  import gym from "../assets/Gym.jpeg";
  then use the imported value in the images array.
