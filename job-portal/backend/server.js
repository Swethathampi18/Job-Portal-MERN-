// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB, then seed sample data and start server
const start = async () => {
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/jobs', require('./routes/jobs'));
  app.use('/api/applications', require('./routes/applications'));

  app.get('/', (req, res) => {
    res.json({ message: 'Job Portal API is running' });
  });

  // Seed sample recruiter + jobs if none exist (safe, idempotent)
  try {
    const User = require('./models/User');
    const Job = require('./models/Job');

    const seedSampleData = async () => {
      const recruiter = await User.findOne({ role: 'recruiter' });
      let rec = recruiter;

      if (!rec) {
        // Create a sample recruiter account (password will be hashed by pre-save hook)
        rec = await User.create({
          fullName: 'Acme Recruiter',
          email: 'recruiter@acme.test',
          password: 'password123',
          role: 'recruiter',
          companyName: 'Acme Corp'
        });
        console.log('Created sample recruiter:', rec.email);
      }

      const jobCount = await Job.countDocuments();
      if (jobCount === 0) {
        const sampleJobs = [
          {
            title: 'Frontend Developer',
            company: 'Acme Corp',
            location: 'Remote',
            description: 'Build beautiful user interfaces using React.',
            requirements: ['React', 'JavaScript', 'CSS'],
            jobType: 'full-time',
            salaryMin: 30000,
            salaryMax: 50000,
            recruiter: rec._id
          },
          {
            title: 'Backend Developer',
            company: 'BetaTech',
            location: 'Bengaluru',
            description: 'Design and maintain RESTful APIs and databases.',
            requirements: ['Node.js', 'Express', 'MongoDB'],
            jobType: 'full-time',
            salaryMin: 35000,
            salaryMax: 60000,
            recruiter: rec._id
          },
          {
            title: 'Fullstack Intern',
            company: 'StartupX',
            location: 'Hyderabad',
            description: 'Work across frontend and backend to ship features.',
            requirements: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
            jobType: 'internship',
            salaryMin: 5000,
            salaryMax: 8000,
            recruiter: rec._id
          }
        ];

        await Job.insertMany(sampleJobs);
        console.log('Seeded sample jobs.');
      }
    };

    await seedSampleData();
  } catch (seedErr) {
    console.error('Seeding error (non-fatal):', seedErr.message);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
