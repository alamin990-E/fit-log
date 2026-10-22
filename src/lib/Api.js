import React from 'react';

export const getExercise = async() => {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog')
    return res.json()
};

