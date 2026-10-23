import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";

const SaveButton = ({ exercise }) => {
  return (
    <div>
      <button className="flex items-center justify-center gap-2 rounded-lg border cursor-pointer border-white/10 bg-transparent px-4 py-2 sm:px-5 sm:py-3 text-[14px] font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5">
        <IoBookmarkOutline />
        Save for later
      </button>
    </div>
  );
};

export default SaveButton;
