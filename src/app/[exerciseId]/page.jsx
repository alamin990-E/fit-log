import SaveButton from "@/components/buttons/SaveButton";
import TodayPlanButton from "@/components/buttons/TodayPlanButton";
import { getExercise } from "@/lib/Api";
import Image from "next/image";
import React from "react";

const ExerciseDetailspage = async ({ params }) => {
  const { exerciseId } = await params;
  const exerciseData = await getExercise();
  const exercise = exerciseData.find(
    (item) => String(item.id) === String(exerciseId),
  );
  return (
    <div className="container mx-auto my-10 py-5 px-4 md:px-0">
      <div className="grid md:grid-cols-1 justify-center items-center gap-15 lg:grid-cols-2">
        {/* Workout Image */}
        <div className="overflow-hidden grid items-center">
          <Image
            src={exercise.image}
            alt={exercise.name}
            width={800}
            height={735}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        {/* Workout Details */}
        <div>
          {/* Workout Name */}
          <h1 className="font-[Oswald] mb-5 text-3xl font-bold text-white">
            {exercise.name}
          </h1>

          {/* Workout Description */}
          <p className="mb-5 text-[18px] text-[#9CA3AF]">
            {exercise.description}
          </p>
          {/* Muscle Groups */}
          <div className="mb-4 flex flex-wrap gap-2">
            {exercise.muscleGroups.map((muscle, index) => (
              <span
                key={index}
                className="rounded-full bg-[#baff00] px-3.5 py-1 text-[12px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>
          {/* Workout Specifications */}
          <div className="mb-5 overflow-x-auto rounded-2xl bg-[#232834]">
            <table className="table px-4 py-3">
              <tbody>
                {/* Equipment */}
                <tr>
                  <th className="w-1/2 text-start font-bold text-[#9CA3AF] uppercase">
                    Equipment
                  </th>
                  <td className="w-1/2 text-end font-medium text-[#E5E7EB]">
                    {exercise.equipment}
                  </td>
                </tr>

                {/* Difficulty */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Difficulty
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.difficulty}
                  </td>
                </tr>

                {/* Sets */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Sets
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.sets}
                  </td>
                </tr>

                {/* Reps */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Reps
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.reps}
                  </td>
                </tr>

                {/* Duration */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Duration
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.duration}
                  </td>
                </tr>

                {/* Calories Burned */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Calories
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.caloriesBurned}
                  </td>
                </tr>

                {/* Rating */}
                <tr>
                  <th className="text-start font-bold text-[#9CA3AF] uppercase">
                    Rating
                  </th>
                  <td className="text-end font-medium text-[#E5E7EB]">
                    {exercise.rating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Workout Instructions */}
          <div className="mt-5">
            <p className="font-bold text-[20px] text-white">INSTRUCTIONS</p>

            <ul className="font-semibold text-[14px] space-y-1.5 pt-4 text-[#9CA3AF]">
              {exercise.instructions.map((instruction, index) => (
                <li key={index}>
                  {index + 1}. {instruction}
                </li>
              ))}
            </ul>
          </div>
          {/* Button */}
          <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <TodayPlanButton exercise={exercise}></TodayPlanButton>
            <SaveButton exercise={exercise}></SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailspage;
