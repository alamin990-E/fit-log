## Project Name: FitLog

## Description

FitLog is a modern workout management and fitness tracking application designed to help users discover exercises, organize daily workout routines, save favorite workouts, and monitor their physical stats and fitness activities through a simple and responsive dark-mode interface.

## Technologies Used

- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- React Icons
- React Toastify

## Key Features

1. **Workout Library** — Explore different workouts fetched from a REST API.

2. **Workout Details** — View detailed exercise information, including images, descriptions, muscle groups, equipment, difficulty, sets, reps, duration, calories, ratings, and instructions.

3. **Today's Plan** — Add workouts to a daily plan, mark completed workouts as Done, and remove exercises when needed.

4. **Saved Workouts** — Save favorite workouts and manage saved exercises separately from the daily plan.

5. **Sorting & Progress Summary** — Sort workouts by duration, calories, and rating, and view workout counts, total duration, and calories.

6. **User Authentication & Route Protection** — Secure user authentication powered by Better Auth (Email/Password & Google OAuth) with MongoDB, along with proxy-based route protection for private pages (`/`, `/profile`, and `/profile/editProfile`).

7. **User Profile & Physical Stats** — View workout summaries alongside physical stats (`Current Weight` and `Target Weight`) on the profile dashboard, and update display name and weight goals via a dedicated Edit Profile page.