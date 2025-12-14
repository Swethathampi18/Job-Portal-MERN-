const express = require('express');
const router = express.Router();
const { 
  applyToJob, 
  getMyApplications, 
  getApplicationsForJob,
  updateApplicationStatus,
  getRecruiterApplications
} = require('../controllers/applicationController');
const { protect, recruiterOnly, jobSeekerOnly } = require('../middleware/auth');

router.post('/', protect, jobSeekerOnly, applyToJob);
router.get('/my-applications', protect, jobSeekerOnly, getMyApplications);
router.get('/recruiter', protect, recruiterOnly, getRecruiterApplications);
router.get('/job/:jobId', protect, recruiterOnly, getApplicationsForJob);
router.put('/:id/status', protect, recruiterOnly, updateApplicationStatus);

module.exports = router;
