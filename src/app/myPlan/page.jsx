


import PlanDash from "@/components/myplane/PlanDash";
import React from "react";

const MyPlanPage = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      {/* My Plan Heading */}
      <div className="space-y-1.5 text-center md:text-left">
        <h2 className="font-[Oswald] text-[30px] font-bold">MY PLAN</h2>
        <p className="text-[14px] text-[#9CA3AF]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>
      {/* Summary ,Sortby and Tabs */}
      <PlanDash></PlanDash>
    </div>
  );
};

export default MyPlanPage;
