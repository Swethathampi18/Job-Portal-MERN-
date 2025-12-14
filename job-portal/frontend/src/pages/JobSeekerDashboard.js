import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './JobSeekerDashboard.css';

const API_URL = 'http://localhost:5001/api';

function JobSeekerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'job_seeker') {
      navigate('/auth');
      return;
    }
    fetchApplications();
  }, [user, navigate]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/applications/my-applications`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'badge-warning',
      reviewed: 'badge-primary',
      shortlisted: 'badge-success',
      rejected: 'badge-error',
      hired: 'badge-success'
    };
    return statusMap[status] || 'badge-primary';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Applications</h1>
          <p>Welcome back, {user?.fullName}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Total Applications</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {applications.filter(a => a.status === 'pending').length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {applications.filter(a => a.status === 'shortlisted').length}
            </span>
            <span className="stat-label">Shortlisted</span>
          </div>
        </div>

        <div className="applications-section">
          <div className="section-header">
            <h2>Application History</h2>
            <Link to="/jobs" className="btn btn-primary">Browse More Jobs</Link>
          </div>

          {applications.length === 0 ? (
            <div className="no-applications">
              <p>You haven't applied to any jobs yet.</p>
              <Link to="/jobs" className="btn btn-primary">Start Applying</Link>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map((app) => (
                <div key={app._id} className="application-card">
                  <div className="application-info">
                    <h3>{app.job.title}</h3>
                    <p>{app.job.company}</p>
                    <span className="apply-date">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`badge ${getStatusBadge(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
