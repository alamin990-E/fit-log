import React from "react";

const PlanDash = () => {
  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 bg-[#232732] p-10 mt-8 rounded-2xl">
        {/* Item 1: Exercises Count */}
        <div>
          <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wider font-semibold">
            Exercises
          </p>
          <p className="font-[oswald] text-[30px] sm:text-[45px] font-bold text-[#C2F800] mt-1">
            0
          </p>
        </div>

        {/* Item 2: Minutes Count */}
        <div>
          <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wider font-semibold">
            Minutes
          </p>
          <p className="font-[oswald] text-[30px] sm:text-[45px] font-bold text-white mt-1">
            0
          </p>
        </div>

        {/* Item 3: Calories Count */}
        <div>
          <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wider font-semibold">
            Calories
          </p>
          <p className="font-[oswald] text-[30px] sm:text-[45px] font-bold text-white mt-1">
            0
          </p>
        </div>
      </div>
 {/* Tab */}
      <div className="tabs tabs-box mt-8">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Today&apos;s"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Saved"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>
        {/* Sort by */}
        <div className="flex items-center justify-center gap-2 ms-auto">
          <h2 className="font-normal text-[#9CA3AF]">Sort By</h2>
          <div>
            <select defaultValue="Pick a font" className="select select-ghost">
              <option disabled={true}>Pick a font</option>
              <option>Inter</option>
              <option>Poppins</option>
              <option>Raleway</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDash;
