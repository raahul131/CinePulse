import React, { useEffect, useState } from "react";
import Logo from "../assets/movix-logo.svg";
import { Link } from "react-router-dom";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

import userIcon from "../assets/userIcon.jpg";
import MobileMenu from "./MobileMenu";
import UserProfile from "./UserProfile";
import NavbarItem from "./NavbarItem";

const TOP_OFFSET = 65;

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

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

  return (
    <main className="fixed w-full z-50 mx-auto">
      <div
        className={`px-3 sm:px-16 py-1 flex flex-row items-center transition duration-500 gap-10 ${
          showBackground ? "bg-zinc-700 bg-opacity-90" : ""
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="logo" className="h-9 sm:h-12" />
        </Link>

        <div className="flex-row gap-6 hidden md:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Movies" />
          <NavbarItem label="TV Shows" />
          <NavbarItem label="Latest" />
        </div>

        <div
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="lg:hidden hidden flex flex-row justify-end items-center gap-1 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-xs">Browse</p>
          <BsChevronDown
            size={10}
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          {showMobileMenu && <MobileMenu />}
        </div>

        {/* Profile Menu */}
        <div className="flex flex-row ml-auto gap-5 items-center pr-2">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch size={18} />
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
