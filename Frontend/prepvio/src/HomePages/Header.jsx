// src/components/Header.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore";
import { Link as ScrollLink } from "react-scroll";
import { DashboardModal } from "../Dashboard/DashBoardPage";

const Header = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const getInitialsSeed = (fullName) => {
    if (!fullName) return "User";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchVisible(false);
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchVisible(true);
  };

  const handleMuteClick = () => setIsMuted(!isMuted);
  const handleNotificationsClick = () => console.log("Notifications clicked!");
  const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setIsDashboardOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`font-aquire flex justify-center transition-all duration-300 z-50 ${
          isScrolled ? "fixed top-0 left-0 w-full" : "sticky top-4"
        }`}
      >
        <div
          className={`${
            isScrolled
              ? "w-full rounded-none px-6 md:px-20"
              : "w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] rounded-full"
          } bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg px-6 h-16 flex items-center justify-between transition-all duration-300 text-black`}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
        >
          <div className="flex flex-1 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img className="h-12 rounded-lg" src="swaroop.png" alt="LOGO" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                {!isSearchVisible ? (
                  <a
                    href="#"
                    className="hover:text-gray-800 font-devator"
                    onClick={handleSearchClick}
                  >
                    Search
                  </a>
                ) : (
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className={`px-4 py-2 rounded-lg bg-white/20 text-black placeholder-black/70 focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out ${
                      isScrolled ? "w-72" : "w-56"
                    }`}
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
                  />
                )}
              </div>

              {/* Links */}
              <ScrollLink
                to="about"
                smooth={true}
                duration={600}
                offset={-80}
                className="cursor-pointer hover:text-gray-800"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="explore"
                smooth={true}
                duration={600}
                offset={-80}
                className="cursor-pointer hover:text-gray-800"
              >
                Explore
              </ScrollLink>

              {/* Mute Button */}
              <button onClick={handleMuteClick} className="hover:text-gray-800">
                {isMuted ? "Unmute" : "Mute"}
              </button>

              {/* Notifications */}
              <button
                onClick={handleNotificationsClick}
                className="flex items-center hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405C17.653 14.894 17 13.985 17 12V9c0-3.313-2.687-6-6-6S5 5.687 5 9v3c0 1.985-.653 2.894-1.595 3.595L2 17h5m5 0v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3"
                  />
                </svg>
              </button>

              {/* Profile / Auth */}
              {isAuthenticated ? (
                <div className="relative" ref={profileDropdownRef}>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    <img
                      src={
                        user?.profilePic ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                          getInitialsSeed(user?.name)
                        )}`
                      }
                      alt={user?.name || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </div>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md border border-white/10 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={handleDashboardClick}
                          className="w-full text-left px-4 py-2 hover:bg-white/10"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-white/10"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="hover:text-gray-800">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 rounded-full font-aquire font-bold 
             bg-black text-white transition-all duration-300 
             hover:bg-white/20 hover:text-black hover:backdrop-blur-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Modal */}
      {isDashboardOpen && (
        <DashboardModal onClose={() => setIsDashboardOpen(false)} />
      )}
    </>
  );
};

export default Header;





// // src/components/Header.js
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authstore";
// import { Link as ScrollLink } from "react-scroll";

// const Header = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const { user, isAuthenticated, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const headerRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const profileDropdownRef = useRef(null);

//   // ✅ Fix template string for initials
//   const getInitialsSeed = (fullName) => {
//     if (!fullName) return "User";
//     const parts = fullName.trim().split(" ");
//     if (parts.length === 1) return parts[0];
//     return `${parts[0]} ${parts[parts.length - 1]}`;
//   };

//   // Close menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (headerRef.current && !headerRef.current.contains(event.target)) {
//         setIsSearchVisible(false);
//         setIsMobileMenuOpen(false);
//         setIsProfileDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus search input when opened
//   useEffect(() => {
//     if (isSearchVisible && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchVisible]);

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSearchClick = (e) => {
//     e.preventDefault();
//     setIsSearchVisible(true);
//   };

//   const handleMuteClick = () => setIsMuted(!isMuted);
//   const handleNotificationsClick = () => console.log("Notifications clicked!");
//   const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

//   const handleLogout = async () => {
//     await logout();
//     setIsProfileDropdownOpen(false);
//     navigate("/");
//   };

//   return (
//     <>
//       <header
//         ref={headerRef}
//         className={`font-aquire flex justify-center transition-all duration-300 z-50 ${
//           isScrolled ? "fixed top-0 left-0 w-full" : "sticky top-4"
//         }`}
//       >
//         <div
//           className={`${
//             isScrolled
//               ? "w-full rounded-none px-6 md:px-20"
//               : "w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] rounded-full"
//           } bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg px-6 h-16 flex items-center justify-between transition-all duration-300 text-black`}
//           style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
//         >
//           {/* Centered wrapper */}
//           <div className="flex flex-1 items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <img className="h-12 rounded-lg" src="swaroop.png" alt="LOGO" />
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-6">
//               {/* Search */}
//               <div className="relative">
//                 {!isSearchVisible ? (
//                   <a
//                     href="#"
//                     className="hover:text-gray-800 font-devator"
//                     onClick={handleSearchClick}
//                   >
//                     Search
//                   </a>
//                 ) : (
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search..."
//                     className={`px-4 py-2 rounded-lg bg-white/20 text-black placeholder-black/70 focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out ${
//                       isScrolled ? "w-72" : "w-56"
//                     }`}
//                     style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
//                   />
//                 )}
//               </div>

//               {/* Links */}
//               <ScrollLink
//                 to="about"
//                 smooth={true}
//                 duration={600}
//                 offset={-80}
//                 className="cursor-pointer hover:text-gray-800"
//               >
//                 About
//               </ScrollLink>
//               <ScrollLink
//                 to="explore"
//                 smooth={true}
//                 duration={600}
//                 offset={-80}
//                 className="cursor-pointer hover:text-gray-800"
//               >
//                 Explore
//               </ScrollLink>

//               {/* Mute Button */}
//               <button onClick={handleMuteClick} className="hover:text-gray-800">
//                 {isMuted ? "Unmute" : "Mute"}
//               </button>

//               {/* Notifications */}
//               <button
//                 onClick={handleNotificationsClick}
//                 className="flex items-center hover:text-gray-800"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405C17.653 14.894 17 13.985 17 12V9c0-3.313-2.687-6-6-6S5 5.687 5 9v3c0 1.985-.653 2.894-1.595 3.595L2 17h5m5 0v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3"
//                   />
//                 </svg>
//               </button>

//               {/* Profile / Auth */}
//               {isAuthenticated ? (
//                 <div className="relative" ref={profileDropdownRef}>
//                   <div
//                     className="flex items-center space-x-2 cursor-pointer"
//                     onClick={handleProfileClick}
//                   >
//                     <img
//                       src={
//                         user?.profilePic ||
//                         `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
//                           getInitialsSeed(user?.name)
//                         )}`
//                       }
//                       alt={user?.name || "User"}
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                     <span className="font-medium">{user?.name}</span>
//                   </div>

//                   {isProfileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md border border-white/10 rounded-md shadow-lg z-50">
//                       <div className="py-1">
//                         <Link
//                           to="/dashboard"
//                           className="block px-4 py-2 hover:bg-white/10"
//                           onClick={() => setIsProfileDropdownOpen(false)}
//                         >
//                           Dashboard
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 hover:bg-white/10"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/login" className="hover:text-gray-800">
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="px-6 py-2 rounded-full font-aquire font-bold 
//              bg-black text-white transition-all duration-300 
//              hover:bg-white/20 hover:text-black hover:backdrop-blur-sm"
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}
//             </nav>

//             {/* Mobile Hamburger */}
//             <button
//               className="md:hidden flex items-center justify-center"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;











// DUSRA HAI  src/components/Header.js
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authstore"; // 👈 import your auth store

// const Header = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const { user, isAuthenticated, logout } = useAuthStore(); // Zustand state
//   const navigate = useNavigate();

//   const headerRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const profileDropdownRef = useRef(null);

//   // Click outside to close menus
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (headerRef.current && !headerRef.current.contains(event.target)) {
//         setIsSearchVisible(false);
//         setIsMobileMenuOpen(false);
//         setIsProfileDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Auto-focus search input
//   useEffect(() => {
//     if (isSearchVisible && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchVisible]);

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handlers
//   const handleSearchClick = (e) => {
//     e.preventDefault();
//     setIsSearchVisible(true);
//   };
//   const handleMuteClick = () => setIsMuted(!isMuted);
//   const handleNotificationsClick = () => console.log("Notifications clicked!");
//   const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

//   const handleLogout = async () => {
//     await logout();
//     setIsProfileDropdownOpen(false);
//     navigate("/"); // redirect home
//   };

//   return (
//     <>
//       <header
//         ref={headerRef}
//         className={`flex justify-center transition-all duration-300 z-50 ${
//           isScrolled ? "fixed top-0 left-0 w-full" : "sticky top-4"
//         }`}
//       >
//         <div
//           className={`${
//             isScrolled
//               ? "w-full rounded-none px-6 md:px-20"
//               : "w-[90%] md:w-[75%] lg:w-[85%] xl:w-[60%] rounded-full"
//           } bg-white bg-opacity-90 backdrop-blur-lg border border-gray-200 shadow-md px-6 h-16 flex justify-between items-center transition-all duration-300`}
//         >
//           {/* Logo */}
//           <div className="flex flex-row items-center gap-3">
//             <img className="h-12 rounded-lg" src="logo final-Photoroom.png" alt="LOGO" />
//             <h1 className="font-bold text-2xl">Prepvio</h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <div className="relative">
//               {!isSearchVisible ? (
//                 <a
//                   href="#"
//                   className="text-gray-600 hover:text-gray-900"
//                   onClick={handleSearchClick}
//                 >
//                   Search
//                 </a>
//               ) : (
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder="Search..."
//                   className={`px-4 py-2 rounded-lg focus:outline-none 
//                     focus:ring-1 focus:ring-ring-100 transition-all duration-300 ease-in-out ${
//                       isScrolled ? "w-72" : "w-48"
//                     }`}
//                 />
//               )}
//             </div>

//             <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Explore</a>

//             <button onClick={handleMuteClick} className="text-gray-600 hover:text-gray-900">
//               {isMuted ? "Unmute" : "Mute"}
//             </button>

//             <button
//               onClick={handleNotificationsClick}
//               className="flex items-center text-gray-600 hover:text-gray-900"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M15 17h5l-1.405-1.405C17.653 14.894 
//                   17 13.985 17 12V9c0-3.313-2.687-6-6-6S5 
//                   5.687 5 9v3c0 1.985-.653 2.894-1.595 
//                   3.595L2 17h5m5 0v3a2 2 0 01-2 
//                   2H9a2 2 0 01-2-2v-3" />
//               </svg>
//             </button>

//             {/* 👇 Conditional Rendering */}
//             {isAuthenticated ? (
//               <div className="relative" ref={profileDropdownRef}>
//                 <div
//                   className="flex items-center space-x-2 cursor-pointer"
//                   onClick={handleProfileClick}
//                 >
//                   <img
//                     src={user?.profilePic || "https://via.placeholder.com/150"}
//                     alt={user?.name || "User"}
//                     className="h-10 w-10 rounded-full object-cover"
//                   />
//                   <span className="font-medium text-gray-800">{user?.name}</span>
//                 </div>
//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                     <div className="py-1">
//                       <Link
//                         to="/dashboard"
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => setIsProfileDropdownOpen(false)}
//                       >
//                         Dashboard
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 hover:text-gray-900">
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </nav>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden flex items-center justify-center text-gray-700"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Menu Dropdown */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4 space-y-4">
//           <a href="#" className="block text-gray-600 hover:text-gray-900">About</a>
//           <a href="#" className="block text-gray-600 hover:text-gray-900">Explore</a>
//           <button onClick={handleMuteClick} className="block text-gray-600 hover:text-gray-900">
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <button
//             onClick={handleNotificationsClick}
//             className="block text-gray-600 hover:text-gray-900"
//           >
//             Notifications
//           </button>

//           {isAuthenticated ? (
//             <>
//               <Link
//                 to="/dashboard"
//                 className="block text-gray-600 hover:text-gray-900"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full block text-center bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="block text-gray-600 hover:text-gray-900">
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="w-full block text-center bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
//               >
//                 Get Started
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;






// {ORIGINAL }
// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom"; // 👈 import Link

// const Header = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const headerRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Click outside to close search and mobile menu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (headerRef.current && !headerRef.current.contains(event.target)) {
//         setIsSearchVisible(false);
//         setIsMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Auto-focus search input
//   useEffect(() => {
//     if (isSearchVisible && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchVisible]);

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handlers
//   const handleSearchClick = (e) => {
//     e.preventDefault();
//     setIsSearchVisible(true);
//   };
//   const handleMuteClick = () => setIsMuted(!isMuted);
//   const handleNotificationsClick = () => console.log("Notifications clicked!");

//   return (
//     <>
//       <header
//         ref={headerRef}
//         className={`flex justify-center transition-all duration-300 z-50 ${
//           isScrolled ? "fixed top-0 left-0 w-full" : "sticky top-4"
//         }`}
//       >
//         <div
//           className={`${
//             isScrolled
//               ? "w-full rounded-none px-6 md:px-20"
//               : "w-[90%] md:w-[75%] lg:w-[85%] xl:w-[60%] rounded-full"
//           } bg-white bg-opacity-90 backdrop-blur-lg border border-gray-200 shadow-md px-6 h-16 flex justify-between items-center transition-all duration-300`}
//         >
//           {/* Logo */}
//           <div className="flex flex-row items-center gap-3">
//             <img className="h-12 rounded-lg" src="logo final-Photoroom.png" alt="LOGO" />
//             <h1 className="font-bold text-2xl">Prepvio</h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <div className="relative">
//               {!isSearchVisible ? (
//                 <a
//                   href="#"
//                   className="text-gray-600 hover:text-gray-900"
//                   onClick={handleSearchClick}
//                 >
//                   Search
//                 </a>
//               ) : (
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder="Search..."
//                   className={`px-4 py-2 rounded-lg  focus:outline-none 
//                     focus:ring-1 focus:ring-ring-100 transition-all duration-300 ease-in-out ${
//                       isScrolled ? "w-72" : "w-48"
//                     }`}
//                 />
//               )}
//             </div>

//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               About
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Explore
//             </a>

//             <button onClick={handleMuteClick} className="text-gray-600 hover:text-gray-900">
//               {isMuted ? "Unmute" : "Mute"}
//             </button>

//             <button
//               onClick={handleNotificationsClick}
//               className="flex items-center text-gray-600 hover:text-gray-900"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 17h5l-1.405-1.405C17.653 14.894 17 
//                   13.985 17 12V9c0-3.313-2.687-6-6-6S5 
//                   5.687 5 9v3c0 1.985-.653 2.894-1.595 
//                   3.595L2 17h5m5 0v3a2 2 0 01-2 
//                   2H9a2 2 0 01-2-2v-3"
//                 />
//               </svg>
//             </button>

//             {/* 👇 Use Link instead of a button for navigation */}
//             <Link to="/login" className="text-gray-600 hover:text-gray-900">
//               Login
//             </Link>

//             <Link
//               to="/signup"
//               className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
//             >
//               Get Started
//             </Link>
//           </nav>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden flex items-center justify-center text-gray-700"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Menu Dropdown */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4 space-y-4">
//           <a href="#" className="block text-gray-600 hover:text-gray-900">
//             About
//           </a>
//           <a href="#" className="block text-gray-600 hover:text-gray-900">
//             Explore
//           </a>
//           <button onClick={handleMuteClick} className="block text-gray-600 hover:text-gray-900">
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <button
//             onClick={handleNotificationsClick}
//             className="block text-gray-600 hover:text-gray-900"
//           >
//             Notifications
//           </button>

//           {/* 👇 Mobile menu links */}
//           <Link to="/login" className="block text-gray-600 hover:text-gray-900">
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className="w-full block text-center bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
//           >
//             Get Started
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
