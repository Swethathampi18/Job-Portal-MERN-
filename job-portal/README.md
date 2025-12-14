# Job Portal (MERN)

**Description**

This is a full-stack Job Portal application built with the MERN stack (MongoDB, Express, React, Node). It supports recruiters posting jobs, job seekers viewing and applying to jobs, and authentication for users. The project is split into two parts: a backend API (Express + MongoDB) and a frontend single-page app (React).

**Key Features**

- **User Authentication**: Users can sign up and sign in using JWT-based authentication.
- **Role Support**: Recruiter and Job Seeker roles with role-specific views and actions.
- **Job Management**: Recruiters can create and manage job postings.
- **Job Search & Listing**: Job seekers can browse and view job details.
- **Applications**: Job seekers can apply to jobs; recruiters can review applications.

**Tech Stack**

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT for auth
- **Frontend**: React, react-router-dom, axios
- **Dev tools**: nodemon (backend), react-scripts (frontend)

**Prerequisites**

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB instance (local or hosted)

**Quick Start**

1. Clone the repository and open the project root.

2. Install backend dependencies and start the backend server:

```powershell
cd backend
npm install
npm run dev   # development with nodemon
# or
npm start     # production (node server.js)
```

3. Install frontend dependencies and start the frontend:

```powershell
cd frontend
npm install
npm start
```

4. Open your browser at `http://localhost:3000` (default CRA port) and the backend API at the configured backend port (default shown in `backend/server.js`).

**Environment Variables**

This project uses a `.env` file for secrets and configuration. Do NOT commit or upload your `.env` file. Below are the environment variable names expected by the backend (do not paste values here):

- `MONGO_URI`  - MongoDB connection string
- `JWT_SECRET` - Secret key used to sign JWT tokens
- `PORT` - Port for the backend server (optional)

Create a `.env` file in the `backend` folder with the above keys and provide your own secure values locally.

**API Overview (high level)**

- **Auth**: register, login endpoints for obtaining JWT tokens and managing user accounts.
- **Jobs**: create, read (list/detail), update, delete job postings (recruiter-only for write ops).
- **Applications**: submit application to a job (job seeker) and retrieve applications (recruiter).

The API routes are implemented in the backend `routes` folder (e.g., auth, jobs, applications).

**Project Structure (high level)**

- **backend/**: Express app, API routes, controllers, models, middleware
- **frontend/**: React SPA built with Create React App, components and pages

**Scripts**

- **Backend**: `npm run dev` — development server with `nodemon`; `npm start` — production start
- **Frontend**: `npm start` — runs the React development server; `npm run build` — builds production assets

