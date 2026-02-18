Job Portal (MERN)
Description

This is a full-stack Job Portal application built with the MERN stack (MongoDB, Express, React, Node). It supports recruiters posting jobs, job seekers viewing and applying to jobs, and authentication for users. The project is split into two parts: a backend API (Express + MongoDB) and a frontend single-page app (React).

Key Features

User Authentication: Users can sign up and sign in using JWT-based authentication.
Role Support: Recruiter and Job Seeker roles with role-specific views and actions.
Job Management: Recruiters can create and manage job postings.
Job Search & Listing: Job seekers can browse and view job details.
Applications: Job seekers can apply to jobs; recruiters can review applications.
Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, JWT for auth
Frontend: React, react-router-dom, axios
Dev tools: nodemon (backend), react-scripts (frontend)
Prerequisites

Node.js (v16+ recommended)
npm (comes with Node.js)
MongoDB instance (local or hosted)
Quick Start

Clone the repository and open the project root.

Install backend dependencies and start the backend server:

cd backend
npm install
npm run dev   # development with nodemon
# or
npm start     # production (node server.js)
Install frontend dependencies and start the frontend:
cd frontend
npm install
npm start
Open your browser at http://localhost:3000 (default CRA port) and the backend API at the configured backend port (default shown in backend/server.js).
