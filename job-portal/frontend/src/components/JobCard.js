// frontend/src/components/JobCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

function JobCard({ job }) {
  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax) {
      return `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`;
    }
    return 'Salary not disclosed';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-logo">
          {job.company.charAt(0)}
        </div>
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
      </div>

      <div className="job-details">
        <span className="job-detail">📍 {job.location}</span>
        <span className="job-detail">💰 {formatSalary()}</span>
        <span className="badge badge-primary">{job.jobType}</span>
      </div>

      <p className="job-description">
        {job.description.substring(0, 150)}...
      </p>

      <div className="job-card-footer">
        <span className="post-date">Posted {formatDate(job.createdAt)}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/jobs/${job._id}`} className="btn btn-outline">
            View Details
          </Link>
          <Link to={`/jobs/${job._1d ? job._id : job._id}`} className="btn btn-primary">
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
