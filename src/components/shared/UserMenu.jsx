"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/utils/auth-client";
import { toast } from "react-toastify";

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // User name
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed!");
        return;
      }

      toast.success("Logout successful!");
      setIsOpen(false);

      router.push("/singin");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user?.name || "User"}
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        ) : (
          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ccff00] text-black flex items-center justify-center font-bold text-sm sm:text-base">
            {firstLetter}
          </span>
        )}

        
        <span className="hidden sm:inline font-medium text-white">
          {user?.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-11 sm:top-12 z-50 w-56 rounded-lg border border-white/10 bg-[#11131a] p-3 shadow-lg">
          {/* User Information */}
          <div className="border-b border-white/10 pb-3 mb-1">
            <p className="font-medium text-white">
              {user?.name}
            </p>

            <p className="break-all text-sm text-[#9CA3AF]">
              {user?.email}
            </p>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="block rounded p-2 text-[#D1D5DB] hover:bg-[#1a1c25] hover:text-[#ccff00]"
          >
            Profile
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded p-2 text-left text-red-400 hover:bg-[#1a1c25] cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;