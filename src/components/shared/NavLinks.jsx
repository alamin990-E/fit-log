"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ href, children }) => {
  const pathName = usePathname();

  const isActive =
    href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "bg-[#1A2312] px-5 py-2 text-[#C2F800] rounded-[20px]"
          : "text-[#D1D5DB]  bg-[#13161D] md:bg-black rounded-2xl px-5 py-2"
      } font-medium text-xs md:text-[14px]`}
    >
      {children}
    </Link>
  );
};

export default NavLinks;