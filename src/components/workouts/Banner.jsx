import Image from "next/image";
import React from "react";
import BannerImage from "../../assets/banner.png";
const Banner = () => {
  return (
    <section className="container mx-auto my-10 flex rounded-2xl flex-col items-center justify-between gap-8 bg-[#15171d] px-5 py-8 sm:px-8 md:flex-row md:gap-5 md:px-10 md:py-13 lg:gap-8">
      {/* Banner Text and Button */}
      <div className="space-y-5 text-center md:text-left">
        <p className="text-[10px] text-[#C2F800] sm:text-[11px] lg:text-[12px]">
          WORKOUT LIBRARY
        </p>

        <h2 className="font-[Oswald] text-2xl font-bold uppercase text-white sm:text-3xl md:text-[28px] lg:text-[37px] xl:text-[58px]">
          TRAIN WITH INTENT. LOG <br />
          EVERY SET.
        </h2>

        <p className="text-sm leading-6 text-[#9CA3AF] sm:text-[18px] md:text-[15px] lg:text-[16px] xl:text-[18px]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it{" "}
          <br className="hidden lg:block" />
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <button className="mt-3 rounded-[10px] border-0 bg-[#C2F800] px-4 py-2.5 text-xs font-bold text-black sm:px-5 sm:py-3 sm:text-sm md:py-2 md:px-4 lg:py-2.5 lg:px-6">
          BROWSE WORKOUTS
        </button>
      </div>

      {/* Banner Image */}
      <Image
        src={BannerImage}
        alt="BannerImage"
        width={450}
        height={320}
        className="h-auto w-full max-w-md object-contain"
      />
    </section>
  );
};

export default Banner;
