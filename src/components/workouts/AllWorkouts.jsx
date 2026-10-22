import React from 'react';
import ExerciseCard from '../shared/ExerciseCard';

const AllWorkouts = ({exercises}) => {
    return (
        <section className='container mx-auto my-10 px-4 md:px-0'>
                {/* Heading text */}
             <div className="space-y-1.5 text-center md:text-left">
                <h2 className="font-[Oswald] text-3xl font-bold uppercase text-white">The Library</h2>
                <p className="text-[#9CA3AF]">Twelve lifts covering every major muscle group.</p>
            </div>
                {/* Exercise Card */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {
                        exercises.map((exercise)=><ExerciseCard key={exercise.id} exercise={exercise}></ExerciseCard>)
                    }
            </div>
        </section>
    );
};

export default AllWorkouts;