import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './RecruiterDashboard.css';

const API_URL = 'http://localhost:5001/api';

function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [jobForm, setJobForm] = useState({
    title: '',
    company: user?.companyName || '',
    location: '',
    description: '',
    requirements: '',
    jobType: 'full-time',
    salaryMin: '',
    salaryMax: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'recruiter') {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        axios.get(`${API_URL}/jobs/my-jobs`),
        axios.get(`${API_URL}/applications/recruiter`)
      ]);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/jobs`, {
        ...jobForm,
        requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
        salaryMin: jobForm.salaryMin ? parseInt(jobForm.salaryMin) : null,
        salaryMax: jobForm.salaryMax ? parseInt(jobForm.salaryMax) : null
      });
      setShowJobForm(false);
      setJobForm({
        title: '',
        company: user?.companyName || '',
        location: '',
        description: '',
        requirements: '',
        jobType: 'full-time',
        salaryMin: '',
        salaryMax: ''
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create job');
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axios.put(`${API_URL}/applications/${applicationId}/status`, { status });
      fetchData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Recruiter Dashboard</h1>
          <p>Welcome back, {user?.fullName}</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            My Jobs ({jobs.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h2>Posted Jobs</h2>
              <button className="btn btn-primary" onClick={() => setShowJobForm(true)}>
                Post New Job
              </button>
            </div>

            {showJobForm && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Post a New Job</h3>
                  <form onSubmit={handleCreateJob}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Job Title</label>
                        <input
                          type="text"
                          className="input"
                          value={jobForm.title}
                          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          className="input"
                          value={jobForm.company}
                          onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          className="input"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Job Type</label>
                        <select
                          className="input"
                          value={jobForm.jobType}
                          onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                        >
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Min Salary</label>
                        <input
                          type="number"
                          className="input"
                          value={jobForm.salaryMin}
                          onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Max Salary</label>
                        <input
                          type="number"
                          className="input"
                          value={jobForm.salaryMax}
                          onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="textarea"
                        value={jobForm.description}
                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Requirements (one per line)</label>
                      <textarea
                        className="textarea"
                        value={jobForm.requirements}
                        onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                      />
                    </div>
                    <div className="modal-buttons">
                      <button type="submit" className="btn btn-primary">Post Job</button>
                      <button type="button" className="btn btn-outline" onClick={() => setShowJobForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="jobs-list">
              {jobs.length === 0 ? (
                <p className="no-data">No jobs posted yet</p>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="job-item">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.location} • {job.jobType}</p>
                    </div>
                    <span className={`badge ${job.isActive ? 'badge-success' : 'badge-error'}`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="dashboard-content">
            <h2>All Applications</h2>
            <div className="applications-list">
              {applications.length === 0 ? (
                <p className="no-data">No applications received yet</p>
              ) : (
                applications.map((app) => (
                  <div key={app._id} className="application-item">
                    <div className="application-info">
                      <h3>{app.applicant.fullName}</h3>
                      <p>{app.applicant.email}</p>
                      <p className="job-name">Applied for: {app.job.title}</p>
                    </div>
                    <div className="application-actions">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        className="input"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
