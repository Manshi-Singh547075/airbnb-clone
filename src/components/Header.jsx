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
            <svg
            viewBox="0 0 3049 1080"
            className="w-auto h-8 fill-[#FF385C] transition-transform duration-300 group-hover:scale-105"
            role="img"
            aria-hidden="true"
          >
            <path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z"></path><path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z"></path>
          </svg>
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
            className="px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            onClick={() => setIsSearchFocused(true)}
            aria-label="Search any destination"
          >
            Anywhere
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
            className="p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
            aria-label="Change language"
          >
            <Globe size={18} />
          </button>

          {/* User menu - with dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              className={`flex items-center gap-2 border ${
                isUserMenuOpen
                  ? "border-black dark:border-gray-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-full pl-3 pr-1 py-1 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2`}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <Menu size={16} />
              <CircleUserRound
                size={26}
                className="text-gray-500"
              />
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
