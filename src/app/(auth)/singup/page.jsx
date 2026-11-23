"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import { toast } from "react-toastify";

const SignupPage = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
      if (
        !user.name.trim() ||
        !user.email.trim() ||
        !user.password.trim() ||
        !user.confirmPassword.trim()
      ) {
        return toast.error("Please fill in all fields!");
      }
      if (user.password.length < 8) {
        return toast.error("Password must be at least 8 characters!");
      }
      if (user.password !== user.confirmPassword) {
        return toast.error("Passwords do not match!");
      }
      setloading(true);

      const { data, error } = await authClient.signUp.email({
        ...user,
        callbackURL: "/singin",
      });

      if (error) {
        return toast.error(
          error.message?.includes("already")
            ? "An account with this email already exists. Please sign in!"
            : "Failed to create account!",
        );
      }

      if (data) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/singin");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setloading(false);
    }
  };

  // Google Sign Up / Sign In Handler
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google sign-up failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      {/* Top Welcome Text */}
      <div className="text-center mb-6 sm:mb-8 max-w-md">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#ccff00]">
          Welcome to FitLog
        </span>
        <h1 className="font-[Oswald] text-2xl sm:text-4xl font-bold uppercase tracking-wide mt-1">
          Start Your Fitness Journey
        </h1>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#11131a] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Lime Accent Line */}
          <div className="h-1 w-full bg-[#ccff00]" />

          <div className="p-5 sm:p-8">
            {/* Card Title */}
            <div className="text-center mb-6">
              <h2 className="font-[Oswald] text-xl sm:text-2xl font-bold uppercase mb-1.5">
                Sign Up Here
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                Fill in the details below to create your account.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm text-[#D1D5DB] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm text-[#D1D5DB] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm text-[#D1D5DB] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    className="w-full px-3 sm:px-4 py-2.5 pr-11 text-sm sm:text-base rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    {showPass ? (
                      <IoIosEyeOff className="text-[#ccff00]" size={20} />
                    ) : (
                      <IoIosEye className="text-[#ccff00]" size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs sm:text-sm text-[#D1D5DB] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    className="w-full px-3 sm:px-4 py-2.5 pr-11 text-sm sm:text-base rounded-lg bg-[#1a1c25] border border-white/10 outline-none focus:border-[#ccff00] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <IoIosEyeOff className="text-[#ccff00]" size={20} />
                    ) : (
                      <IoIosEye className="text-[#ccff00]" size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-lg cursor-pointer bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold uppercase tracking-wider transition"
              >
                {loading ? "Account Creating..." : "Creat Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-5 sm:my-6">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="text-xs sm:text-sm text-gray-500 uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {/* Social Signup Buttons (Google) */}
            <div className="space-y-2.5">
              {/* Google Button */}
              <button
                type="submit"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-lg bg-[#1a1c25] hover:bg-[#232632] border border-white/10 cursor-pointer text-white font-medium transition flex items-center justify-center gap-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.72 6C44.42 37.88 46.98 31.73 46.98 24.55z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.72-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Login Section */}
            <div className="text-center mt-5 sm:mt-7">
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                Already have an account?{" "}
                <Link
                  href="/singin"
                  className="text-[#ccff00] hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link
            href="/"
            className="text-xs sm:text-sm text-[#9CA3AF] hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;