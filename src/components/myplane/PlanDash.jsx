
"use client";
import { useExerciseContext } from "@/context/Exercise";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const PlanDash = () => {
  const { todayList, setTodayList, saveList, setSaveList } =
    useExerciseContext();
  const [activeTab, setActiveTab] = useState("Today's Plan");
  const [sortBy, setSortBy] = useState("Duration");
  const [orderId, setOrderId] = useState([]);

  const currentList = activeTab === "Today's Plan" ? todayList : saveList;

  // Filter 1: Sorting logic
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "Duration") return a.duration - b.duration;
    if (sortBy === "Calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  const totalExercise = currentList.length;
  const totalMinutes = currentList.reduce(
    (sum, item) => sum + item.duration,
    0,
  );
  const totalCalories = currentList.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0,
  );

  const handleRemove = (id) => {
    if (activeTab === "Today's Plan") {
      setTodayList((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSaveList((prev) => prev.filter((item) => item.id !== id));
    }
    toast.success(`Workout removed from your plan!`);
  };

  const handleDone = (id) => {
    setTodayList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );

    toast.success("Workout Done!");
  };

  const renderTabContent = () => {
    if (sortedList.length === 0) {
      return (
        <>
          <div className="text-center my-10">
            <h2 className="text-[30px] font-medium font-[Oswald]">
              NOTHING HERE YET
            </h2>
            <p className="pt-2 text-[14px]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href={"/"}>
              <button className="mt-8 rounded-[20px] cursor-pointer px-6 bg-[#C2F800] text-black py-3 text-sm font-semibold transition hover:bg-[#C2F800]">
                Go to workouts
              </button>
            </Link>
          </div>
        </>
      );
    }

    return (
      <div className="grid gap-5">
        {sortedList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={160}
                height={90}
                className="h-22.5 w-40 shrink-0 rounded-lg object-cover"
              />

              <div>
                <p className="font-bold font-[Oswald] text-[22px]">
                  {item.name}
                </p>

                <p className="text-[16px] text-[#9a9ca5]">{item.equipment}</p>

                <p className="mt-1 text-[14px] text-[#9a9ca5]">
                  {item.duration} min · {item.caloriesBurned} kcal · ⭐{" "}
                  {item.rating}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/${item.id}`}
                className="rounded-full border border-[#3a3b44] px-5 py-3 text-[14px] font-bold transition hover:border-[#aaff00]"
              >
                View Details
              </Link>

              {activeTab === "Today's Plan" && (
                <button
                  onClick={() => handleDone(item.id)}
                  className={`rounded-full px-5 py-3 text-[12px] cursor-pointer font-bold transition ${
                    item.done
                      ? "bg-[#aaff00] text-black"
                      : "bg-[#aaff00] text-black hover:bg-[#c0ff4d]"
                  }`}
                >
                  {item.done ? "✓ Done" : "✓ Mark as Done"}
                </button>
              )}

              <div
                onClick={() => handleRemove(item.id)}
                className="px-1 text-lg text-[#9a9ca5] text-[28px] cursor-pointer transition hover:text-white"
                aria-label="Remove workout"
              >
                <RxCross2 />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
            {totalExercise}
          </p>
        </div>

        {/* Item 2: Minutes Count */}
        <div>
          <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wider font-semibold">
            Minutes
          </p>
          <p className="font-[oswald] text-[30px] sm:text-[45px] font-bold text-white mt-1">
            {totalMinutes}
          </p>
        </div>

        {/* Item 3: Calories Count */}
        <div>
          <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wider font-semibold">
            Calories
          </p>
          <p className="font-[oswald] text-[30px] sm:text-[45px] font-bold text-white mt-1">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Tab */}
      <div className="tabs tabs-box mt-8">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Today's"
          checked={activeTab === "Today's Plan"}
          onChange={() => setActiveTab("Today's Plan")}
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          {renderTabContent()}
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Saved"
          onChange={() => setActiveTab("Saved")}
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          {renderTabContent()}
        </div>

        {/* Sort by */}
        <div className="flex items-center justify-center gap-2 ms-auto">
          <h2 className="font-normal text-[#9CA3AF]">Sort By</h2>
          <div>
            {/* Filter 2: Controlled select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-sm w-32 bg-[#232732] text-white border border-[#3A3F4B] rounded-lg focus:outline-none"
            >
              <option
                className="hover:bg-[#C2F800] font-semibold hover:text-black"
                value="Duration"
              >
                Duration
              </option>
              <option
                className="hover:bg-[#C2F800] font-semibold hover:text-black"
                value="Calories"
              >
                Calories
              </option>
              <option
                className="hover:bg-[#C2F800] font-semibold hover:text-black"
                value="Rating"
              >
                Rating
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDash;
