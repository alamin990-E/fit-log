import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4 py-12 text-white sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="mb-6 text-center">
          <h1 className="font-[Oswald] text-7xl font-bold text-white sm:text-8xl md:text-9xl">
            404
          </h1>
        </div>

        {/* Title */}
        <h1 className="font-[Oswald] text-2xl font-bold uppercase tracking-wide sm:text-3xl md:text-4xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#9CA3AF] sm:text-base sm:leading-7">
          Oops! We couldn&apos;t find the page you&apos;re looking for. Please
          return to the Workoutspage and keep moving forward.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#C2F800] px-7 py-3 text-sm font-bold text-black transition duration-200 sm:mt-8 sm:px-8 sm:text-base"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
