import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFire, FaRegClock, FaRegStar } from "react-icons/fa";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link  href={`/${exercise.id}`}>
      <div className="overflow-hidden mt-7 border border-[#20242E] rounded-[15px]  bg-[#15171d] hover:border  hover:border-[#C2F800]">
        {/* Exercise Image */}
        <div className="relative h-70 w-full">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover rounded-t-[15px]"
          />
        </div>

        <div className="px-6 py-5">
          {/* Muscle Group Badges */}
          <div className="flex gap-2 ">
            {exercise.muscleGroups.map((muscle, index) => (
              <span
                key={index}
                className="rounded-full bg-[#c8ff00] px-3 py-1 text-[12px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>
          {/* Exercise Name */}
          <h2 className="text-[18px] font-extrabold uppercase font-[Oswald] mt-5 text-white">
            {exercise.name}
          </h2>
          {/* Equipment */}
          <p className="mt-2 text-sm text-[#D1D5DB]">{exercise.equipment}</p>

          {/* Divider */}
          <div className="my-4 border-t border-[#222630]" />

          <div className="flex items-center gap-5 text-[13px] text-[#9b9fa6]">
            {/* Duration */}
            <div className="flex items-center gap-2">
              <FaRegClock className="text-[#c8ff00]" />
              <span>{exercise.duration} min</span>
            </div>

            {/* Calories Burned */}
            <div className="flex items-center gap-2">
              <FaFire className="text-[#c8ff00]" />
              <span>{exercise.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <FaRegStar className="text-[#c8ff00]" />
              <span>{exercise.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
