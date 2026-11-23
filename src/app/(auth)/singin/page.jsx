"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { authClient } from "@/utils/auth-client";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
      if (!user.email?.trim() || !user.password?.trim()) {
        return toast.error("Please enter both email and password!");
      }

      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: user.email.trim(),
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        return toast.error("Invalid email or password!");
      }

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google sign-in failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      {/* Top Welcome Text */}
      <div className="text-center mb-6 sm:mb-8 max-w-md">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#ccff00]">
          Welcome Back to FitLog
        </span>
        <h1 className="font-[Oswald] text-2xl sm:text-4xl font-bold uppercase tracking-wide mt-1">
          Continue Your Fitness Journey
        </h1>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#11131a] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Lime Accent Line */}
          <div className="h-1 w-full bg-[#ccff00]" />

          <div className="p-5 sm:p-8">
            {/* Card Title */}
            <div className="text-center mb-6">
              <h2 className="font-[Oswald] text-xl sm:text-2xl font-bold uppercase mb-1.5">
                Sign In Here
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                Enter your credentials below to access your account.
              </p>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your password"
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

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-lg cursor-pointer bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Log In"}
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

            {/* Social Sign In Buttons (Google) */}
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

            {/* Sign Up Section */}
            <div className="text-center mt-5 sm:mt-7">
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/singup"
                  className="text-[#ccff00] hover:underline font-medium"
                >
                  Sign Up
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

export default SignInPage;