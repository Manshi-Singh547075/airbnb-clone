import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  CircleUserRound,
  Globe,
  User,
  Settings,
  LogOut,
  Home,
  Calendar,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import nav from "../assets/nav-img.png";

/* ---------------------------------------------------------
   HEADER — Airbnb-style top nav with full interactions
--------------------------------------------------------- */
function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDates, setSearchDates] = useState("");
  const [searchGuests, setSearchGuests] = useState("");
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
      // Escape to close menus
      if (e.key === "Escape") {
        setIsUserMenuOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const userMenuItems = [
    { icon: User, label: "Profile", href: "#" },
    { icon: Home, label: "Your listings", href: "#" },
    { icon: Calendar, label: "Trips", href: "#" },
    { icon: MessageCircle, label: "Messages", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { divider: true },
    { icon: HelpCircle, label: "Help", href: "#" },
    { icon: LogOut, label: "Log out", href: "#" },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white  sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4">
        {/* Logo - with hover animation */}
        <a
          href="/"
          className="flex items-center gap-2 text-[#FF385C] font-bold text-2xl shrink-0 group"
          aria-label="Airbnb home"
        >
          <span>
            
           <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcruAmDaFjtVoidu9w-2ihrCpqtATDf3O1iVTDXBQkLg&s"
    alt="Airbnb Logo"
    className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
  />
          </span>
        </a>

        {/* Search pill - with expanded state */}
        <div
          className={`hidden md:flex items-center border ${
            isSearchFocused
              ? "border-black shadow-lg scale-105"
              : "border-gray-300 shadow-sm hover:shadow-md"
          } rounded-full transition-all duration-300 px-2 py-1 bg-white`}
          ref={searchRef}
        >
          <button
  className="flex items-center gap-2 px-4 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
  onClick={() => setIsSearchFocused(true)}
  aria-label="Search any destination"
>
  <img
    src={nav} // or your image path
    alt=""
    className="w-12 h-12 object-contain"
  />
  <span>Anywhere</span>
</button>
          <span
            className="w-px h-5 bg-gray-300"
            aria-hidden="true"
          />
          <button
            className="px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            onClick={() => setIsSearchFocused(true)}
            aria-label="Select dates"
          >
            Anytime
          </button>
          <span
            aria-hidden="true"
          />
          <button
            className="px-4 py-2 text-sm text-gray-500  rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            onClick={() => setIsSearchFocused(true)}
            aria-label="Add guests"
          >
            Add guests
          </button>
          <button
            className="bg-[#FF385C] p-2 rounded-full text-white ml-1 hover:bg-[#E31C5F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Search"
          >
            <Search size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Mobile search button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Host button with hover animation */}
          <button
            className="hidden sm:block text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            aria-label="Become a host"
          >
            Become a host
          </button>

          {/* Globe button */}
          <button
            className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
            aria-label="Change language"
          >
            <Globe size={18} />
          </button>

          {/* User menu - with dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <Menu size={16} />
             
            </button>

            {/* Dropdown menu */}
            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200  py-2 z-50 animate-slideDown origin-top-right"
                role="menu"
                aria-label="User menu"
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100 ">
                  <p className="font-semibold text-sm ">Guest</p>
                  <p className="text-xs text-gray-500 ">
                    guest@email.com
                  </p>
                </div>

                {userMenuItems.map((item, index) => {
                  if (item.divider) {
                    return (
                      <hr
                        key={`divider-${index}`}
                        className="my-1 border-gray-100 "
                        role="separator"
                      />
                    );
                  }
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100  transition-colors focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                      role="menuitem"
                    >
                      <Icon
                        size={16}
                        className="text-gray-500 "
                      />
                      <span className="">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded search overlay - optional */}
      {isSearchFocused && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg p-6 animate-slideDown">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500 ">
                  Location
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search destinations"
                  className="w-full mt-1 text-lg font-medium bg-transparent border-none outline-none "
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  aria-label="Search location"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500 ">
                  Dates
                </label>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full mt-1 text-lg font-medium bg-transparent border-none outline-none "
                  value={searchDates}
                  onChange={(e) => setSearchDates(e.target.value)}
                  aria-label="Search dates"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500 ">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="Add guests"
                  className="w-full mt-1 text-lg font-medium bg-transparent border-none outline-none "
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  aria-label="Number of guests"
                />
              </div>
              <button
                className="bg-[#FF385C] text-white p-3 rounded-full hover:bg-[#E31C5F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
