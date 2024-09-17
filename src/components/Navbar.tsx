import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/cinepulse-logo.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import userIcon from "../assets/userIcon.jpg";
import UserProfile from "./UserProfile";
import NavbarItem from "./NavbarItem";
import useDebounce from "../hooks/useDebounce";

const TOP_OFFSET = 65;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(search);
  const debounceSearch = useDebounce(inputValue, 700);

  useEffect(() => {
    const isSearchOrBrowse =
      location.pathname === "/search" || location.pathname === "/browse";

    if (debounceSearch.trim().length > 0 && isSearchOrBrowse) {
      navigate(`/search?query=${debounceSearch}`);
    } else if (!debounceSearch && isSearchOrBrowse) {
      navigate("/browse");
    }
  }, [debounceSearch, navigate, location.pathname]);

  useEffect(() => {
    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  }, [inputValue, setSearchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Handle click outside to close search
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setShowMobileMenu(false);
  };

  const navigationHandler = (type: string) => () => {
    if (type === "movie") {
      navigate("/explore/movie", { replace: true });
    } else {
      navigate("/explore/tv", { replace: true });
    }
  };


  return (
    <main className="fixed w-full z-50 mx-auto">
      <div
        className={`px-3 sm:px-16 py-1 flex flex-row items-center transition duration-500 gap-x-20 ${
          showBackground ? "bg-zinc-700 bg-opacity-80" : ""
        }`}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="h-9 sm:h-14 transform scale-[3] mx-7"
          />
        </Link>

        <div className="flex-row gap-6 hidden md:flex">
          <Link to={"/"}>
            <NavbarItem label="Home" />
          </Link>
          <NavbarItem onClick={navigationHandler("movie")} label="Movies" />
          <NavbarItem onClick={navigationHandler("tv")} label="TV Shows" />
        </div>

        <div
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="md::hidden flex flex-row justify-end items-center gap-1 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-xs">Browse</p>
          <BsChevronDown
            size={10}
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          {showMobileMenu &&
              <div className="bg-black w-40 absolute top-8 py-5 flex-col flex border-2 border-gray-600">
                <div className="flex flex-col gap-4">
                  <Link to={"/"} className="px-3 text-center text-white hover:underline">Home</Link>
                  <div
                      onClick={navigationHandler("tv")}
                      className="px-3 text-center text-white hover:underline"
                  >
                      TV Shows
                  </div>
                  <div
                      onClick={navigationHandler("movie")}
                      className="px-3 text-center text-white hover:underline"
                  >
                      Movies
                  </div>
                </div>
              </div>
          }
        </div>

        {/* Profile Menu */}
        <div className="flex flex-row ml-auto gap-5 items-center pr-2">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch
              onClick={openSearch}
              size={18}
              className={`${isSearchOpen ? "hidden" : "block"}`}
            />
          </div>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className={`absolute right-28 md:right-48 md:top-4 top- md:h-7 h-8 transition-all duration-300 ease-in-out border border-gray-300 bg-black/80 py-1 ${
              isSearchOpen ? "w-60 opacity-100 px-4" : "w-0 opacity-0"
            } overflow-hidden flex items-center`}
          >
            <BsSearch size={13} className="text-white mr-2" />
            {isSearchOpen && (
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Movies, TV Shows"
                className="w-full h-full bg-transparent text-white placeholder-gray-400 focus:outline-none placeholder:text-xs placeholder:text-white"
              />
            )}
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell size={19} />
          </div>
          <div
            className="flex flex-row items-center gap-1 cursor-pointer relative"
            onClick={() => setShowUserProfile((prev) => !prev)}
          >
            <div className="w-6 h-6 p-1 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={userIcon} alt="user_icon" />
            </div>
            <BsChevronDown
              size={10}
              className={`text-white transition ${
                showUserProfile ? "rotate-180" : "rotate-0"
              }`}
            />
            {showUserProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
