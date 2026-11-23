"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/utils/auth-client";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(null);
  const [targetWeight, setTargetWeight] = useState(null);
  const [loading, setLoading] = useState(false);

  // Show loading spinner while fetching session
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use edited values if changed, otherwise fallback to user data (keep empty if "--")
  const nameValue = name !== null ? name : user?.name || "";
  const currentWeightValue =
    currentWeight !== null
      ? currentWeight
      : user?.currentWeight && user.currentWeight !== "--"
      ? user.currentWeight
      : "";
  const targetWeightValue =
    targetWeight !== null
      ? targetWeight
      : user?.targetWeight && user.targetWeight !== "--"
      ? user.targetWeight
      : "";

  const firstLetter = (nameValue || user?.name)?.charAt(0)?.toUpperCase() || "U";

  // Save updated profile data
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!nameValue.trim()) {
      return toast.error("Please enter your name!");
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.updateUser({
        name: nameValue.trim(),
        currentWeight: currentWeightValue.toString().trim() || "--",
        targetWeight: targetWeightValue.toString().trim() || "--",
      });

      if (error) {
        return toast.error(error.message || "Failed to update profile!");
      }

      if (data) {
        toast.success("Profile updated successfully!");
        await refetch();
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-5">
        <span className="font-[Oswald] text-2xl sm:text-3xl font-bold tracking-wider text-[#ccff00] uppercase">
          FITLOG
        </span>
        <p className="font-[Oswald] text-sm uppercase tracking-widest text-[#D1D5DB] mt-0.5">
          Edit Profile
        </p>
      </div>

      {/* Edit Profile Card */}
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
                  alt={nameValue || "User"}
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
              {nameValue || user?.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
              {user?.email}
            </p>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleUpdate} className="pt-6 space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs text-[#D1D5DB] mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
              />
            </div>

            {/* Physical Stats Inputs */}
            <div>
              <p className="font-[Oswald] text-xs uppercase tracking-wider text-[#D1D5DB] mb-2">
                Physical Stats
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">
                    Current Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={currentWeightValue}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="--"
                      className="w-full px-3.5 py-2.5 pr-9 text-sm rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF]">
                      kg
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">
                    Target Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={targetWeightValue}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      placeholder="--"
                      className="w-full px-3.5 py-2.5 pr-9 text-sm rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF]">
                      kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Changes & Cancel Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href="/profile"
                className="flex-1 py-2.5 rounded-lg bg-[#1a1c25] hover:bg-[#232632] text-[#D1D5DB] border border-white/10 font-semibold text-xs uppercase tracking-wider text-center transition"
              >
                Cancel
              </Link>
            </div>
          </form>
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

export default EditProfilePage;