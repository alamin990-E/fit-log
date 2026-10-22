import Image from "next/image";
import React from "react";
import Logo from "../../assets/logo.png";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="border-t border-white/30">
      {/* Footer Logo and Text */}
      <div className="container mx-auto py-8 px-4 md:px-0 space-y-3 sm:space-y-0 flex flex-col sm:flex-row sm:justify-between items-center">
       
          <Link
            href={"/"}
            className="font-[Oswald] text-[17px] flex items-center gap-2 text-lg font-bold tracking-wider text-[#FFFFFF]"
          >
            <Image src={Logo} alt="FitLog" width={17} height={17} />
            FITLOG
          </Link>
        
        <p className=" text-[#D1D5DB] text-[10px] sm:text-xs font-semibold">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
};

export default Footer;
