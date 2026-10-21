"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleHamburger = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const navMenu = () => {
    return (
      <>
        <li>
          <NavLinks  href={"/"}>Workouts</NavLinks>
        </li>
        <li>
          <NavLinks  href={"/myPlan"}>My Plan</NavLinks>
        </li>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30">
      <div className="container mx-auto relative flex items-center justify-between bg-black px-3 py-4 md:px-0">
        {/* Mobile Hamburger */}
        <div>
          <div className="text-[#D1D5DB]">
            <RxHamburgerMenu
              onClick={handleHamburger}
              className="size-6.5 sm:size-7 md:hidden"
            />
          </div>

        {/* Mobile Hamburger Menu */}
          {open && (
            <div className="absolute top-full left-4 mt-2 w-[40%] flex flex-col bg-[#13161D] p-2 container mx-auto text-xs font-medium md:hidden">
              <ul className="flex flex-col py-2 gap-6">
                {navMenu()}
              </ul>
            </div>
          )}
        </div>

        {/* Logo for Desktop and Mobile */}
        <div className="absolute left-[42%] sm:left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
          <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold tracking-wider text-[#FFFFFF]">
            <Image src={Logo} alt="FitLog"  width={20} height={20} />
            FITLOG
          </Link>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 text-[16px] font-normal">
          {navMenu()}
        </ul>

        {/* Badge Container */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-4 text-[#D1D5DB]">
          {/* Plan Badge */}
          <div className="flex items-center gap-2  rounded-2xl cursor-pointer font-medium text-xs sm:text-sm md:text-base">
            <span>Plan</span>
            <span className="w-5 h-5 md:w-6 md:h-6 bg-[#ccff00] text-black text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center">
              2
            </span>
          </div>

          {/* Saved Badge */}
          <div className="flex items-center gap-1.5  rounded-2xl cursor-pointer text-[#D1D5DB] font-medium text-xs sm:text-sm md:text-base">
            <span>Saved</span>
            <span className="w-5 h-5 md:w-6 md:h-6 border border-[#2D313B] text-[#D1D5DB] text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;