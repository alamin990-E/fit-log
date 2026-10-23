import React from "react";
import { LuCalendarPlus2 } from "react-icons/lu";

const TodayPlanButton = ({ exercise }) => {
  return (
    <div>
      <button
        className="flex items-center justify-center gap-1 rounded-lg cursor-pointer bg-[#c6ff00] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#b5eb00] sm:gap-2 sm:px-5 sm:py-3 sm:text-[14px]"
      >
        <span><LuCalendarPlus2 /></span>
        Add to today&apos;s plan
      </button>
    </div>
  );
};

export default TodayPlanButton;
