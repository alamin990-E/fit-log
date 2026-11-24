"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "./NavLinks";
import { useExerciseContext } from "@/context/Exercise";
import UserMenu from "./UserMenu";
import { authClient } from "@/utils/auth-client";

const Navbar = () => {
  const { todayList, saveList } = useExerciseContext();
  const [open, setOpen] = useState(false);

  // Better Auth 
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleHamburger = () => {
    setOpen(!open);
  };

  const navMenu = () => {
    return (
      <>
        <li>
          <NavLinks href={"/"}>Workouts</NavLinks>
        </li>
        <li>
          <NavLinks href={"/myPlan"}>My Plan</NavLinks>
        </li>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30">
      <div className="container mx-auto relative flex items-center justify-between bg-black px-4 py-5 lg:px-0">
        {/* Mobile & Tablet Hamburger */}
        <div>
          <div className="text-[#D1D5DB]">
            <RxHamburgerMenu
              onClick={handleHamburger}
              className="size-6.5 sm:size-7 lg:hidden cursor-pointer"
            />
          </div>

          {/* Hamburger Dropdown Menu */}
          {open && (
            <div className="absolute top-full left-4 mt-2 w-52 flex flex-col bg-[#13161D] p-3.5 text-xs sm:text-sm font-medium lg:hidden rounded-lg border border-white/10 shadow-2xl">
              <ul className="flex flex-col py-1.5 gap-5">{navMenu()}</ul>

              {/* lg-এর নিচ পর্যন্ত Plan ও Saved */}
              <div className="flex flex-col gap-3 pt-3 mt-3 border-t border-white/10 text-[#D1D5DB]">
                <Link
                  href="/myPlan"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-1 hover:text-[#ccff00] transition"
                >
                  <span>Plan</span>
                  <span className="w-5 h-5 bg-[#ccff00] text-black text-xs font-semibold rounded-full flex items-center justify-center">
                    {todayList.length}
                  </span>
                </Link>

                <Link
                  href="/myPlan"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-1 hover:text-[#ccff00] transition"
                >
                  <span>Saved</span>
                  <span className="w-5 h-5 border border-[#2D313B] bg-[#1a1c25] text-[#D1D5DB] text-xs font-semibold rounded-full flex items-center justify-center">
                    {saveList.length}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="absolute left-[38%] sm:left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
          <Link
            href="/"
            className="font-[Oswald] flex items-center gap-2 text-lg font-bold tracking-wider text-[#FFFFFF]"
          >
            <Image src={Logo} alt="FitLog" width={20} height={20} />
            FITLOG
          </Link>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 text-[16px] font-normal">
          {navMenu()}
        </ul>

        {/* Right Side: Badges (lg+) & Auth / UserMenu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 text-[#D1D5DB]">
          {/* Plan Badge */}
          <Link href={"/myPlan"} className="hidden lg:block">
            <div className="flex items-center gap-2 rounded-2xl cursor-pointer font-medium text-base">
              <span>Plan</span>
              <span className="w-6 h-6 bg-[#ccff00] text-black text-sm font-semibold rounded-full flex items-center justify-center">
                {todayList.length}
              </span>
            </div>
          </Link>

          {/* Saved Badge */}
          <Link href={"/myPlan"} className="hidden lg:block">
            <div className="flex items-center gap-1.5 rounded-2xl cursor-pointer text-[#D1D5DB] font-medium text-base">
              <span>Saved</span>
              <span className="w-6 h-6 border border-[#2D313B] text-[#D1D5DB] text-sm font-semibold rounded-full flex items-center justify-center">
                {saveList.length}
              </span>
            </div>
          </Link>

          {/* Auth Section */}
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse ml-1" />
          ) : user ? (
            <div className="lg:pl-3 lg:border-l lg:border-white/15">
              <UserMenu user={user} />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2.5 lg:pl-3 lg:border-l lg:border-white/15">
              <Link
                href="/singin"
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold text-[#D1D5DB] hover:text-[#ccff00] border border-white/15 bg-[#13161D] transition"
              >
                Log In
              </Link>
              <Link
                href="/singup"
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-black bg-[#ccff00] hover:bg-[#bceb00] transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;