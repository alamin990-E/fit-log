import AllWorkouts from "@/components/workouts/AllWorkouts";
import Banner from "@/components/workouts/Banner";

import { getExercise } from "@/lib/Api";



const HomePage = async() => {
   const data = await getExercise()
   const exercises = data
  return (
    <div>
      <Banner></Banner>
      <AllWorkouts exercises={exercises}></AllWorkouts>
    </div>
  );
};

export default HomePage;
