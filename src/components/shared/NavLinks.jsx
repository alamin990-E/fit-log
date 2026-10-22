"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ href, children }) => {
  const pathName = usePathname();

  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[20px] px-5 py-2 font-medium text-xs md:text-[14px] ${
        isActive
          ? "bg-[#1A2312] text-[#C2F800]"
          : "bg-[#13161D] text-[#D1D5DB] md:bg-black"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLinks;
