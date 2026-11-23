"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/utils/auth-client";
import { useExerciseContext } from "@/context/Exercise";

const ProfilePage = () => {
  const { todayList, saveList } = useExerciseContext();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Show loading spinner while fetching session
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Main Profile Card */}
      <div className="w-full max-w-md bg-[#11131a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Lime Accent Line */}
        <div className="h-1 w-full bg-[#ccff00]" />

        <div className="p-6 sm:p-8">
          {/* User Avatar & Basic Info */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
            <div className="relative rounded-full p-0.5 shadow-[0_0_20px_rgba(204,255,0,0.3)] border-2 border-[#ccff00]">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#ccff00] text-black font-[Oswald] text-3xl font-bold flex items-center justify-center">
                  {firstLetter}
                </div>
              )}
            </div>

            <h1 className="font-[Oswald] text-2xl font-bold uppercase tracking-wide mt-3.5">
              {user?.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
              {user?.email}
            </p>
          </div>

          <div className="pt-6 space-y-6">
            {/* Workout Stats Section */}
            <div>
              <h2 className="font-[Oswald] text-sm font-semibold uppercase tracking-wider text-[#D1D5DB] mb-3">
                Workout Stats
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {/* Today's Plan Card */}
                <Link
                  href="/myPlan"
                  className="p-4 rounded-xl bg-[#1a1c25] border border-white/10 hover:border-[#ccff00] transition group"
                >
                  <p className="text-xs text-[#D1D5DB] group-hover:text-white transition">
                    Today&apos;s Plan
                  </p>
                  <p className="font-[Oswald] text-2xl sm:text-3xl font-bold text-[#ccff00] mt-1.5">
                    {todayList.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mt-0.5">
                    Workouts
                  </p>
                </Link>

                {/* Saved Routines Card */}
                <Link
                  href="/myPlan"
                  className="p-4 rounded-xl bg-[#1a1c25] border border-[#ccff00]/40 hover:border-[#ccff00] transition group"
                >
                  <p className="text-xs text-[#D1D5DB] group-hover:text-white transition">
                    Saved Routines
                  </p>
                  <p className="font-[Oswald] text-2xl sm:text-3xl font-bold text-[#ccff00] mt-1.5">
                    {saveList.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mt-0.5">
                    Active
                  </p>
                </Link>
              </div>
            </div>

            {/* Physical Stats Section */}
            <div>
              <h2 className="font-[Oswald] text-sm font-semibold uppercase tracking-wider text-[#D1D5DB] mb-3">
                Physical Stats
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#1a1c25] border border-white/10">
                  <p className="text-xs text-[#9CA3AF]">Current Weight</p>
                  <p className="font-[Oswald] text-2xl font-bold text-white mt-1.5">
                    {user?.currentWeight && user.currentWeight !== "--"
                      ? `${user.currentWeight} kg`
                      : "--"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1a1c25] border border-[#ccff00]/40">
                  <p className="text-xs text-[#9CA3AF]">Target Weight</p>
                  <p className="font-[Oswald] text-2xl font-bold text-[#ccff00] mt-1.5">
                    {user?.targetWeight && user.targetWeight !== "--"
                      ? `${user.targetWeight} kg`
                      : "--"}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Profile Link Button */}
            <Link
              href="/profile/editProfile"
              className="block text-center w-full py-2.5 sm:py-3 rounded-lg bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="text-xs sm:text-sm text-[#9CA3AF] hover:text-white mt-5 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default ProfilePage;