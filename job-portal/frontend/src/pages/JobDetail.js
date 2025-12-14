import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './JobDetail.css';

const API_URL = 'http://localhost:5001/api';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    setApplying(true);
    try {
      await axios.post(`${API_URL}/applications`, {
        jobId: id,
        coverLetter
      });
      setApplied(true);
      setShowApplyForm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!job) return <div className="loading">Job not found</div>;

  return (
    <div className="job-detail-page">
      <div className="container">
        <div className="job-detail-header">
          <div className="company-logo-large">
            {job.company.charAt(0)}
          </div>
          <div>
            <h1>{job.title}</h1>
            <p className="company-info">{job.company} • {job.location}</p>
            <div className="job-meta">
              <span className="badge badge-primary">{job.jobType}</span>
              {job.salaryMin && job.salaryMax && (
                <span className="salary">
                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="job-detail-content">
          <div className="job-description-section">
            <h2>Description</h2>
            <p>{job.description}</p>

            {job.requirements && job.requirements.length > 0 && (
              <>
                <h2>Requirements</h2>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="job-apply-section">
            <div className="card">
              {applied ? (
                <div className="applied-message">
                  <span>✓</span> Application Submitted!
                </div>
              ) : showApplyForm ? (
                <form onSubmit={handleApply}>
                  <h3>Apply for this position</h3>
                  <div className="form-group">
                    <label>Cover Letter (Optional)</label>
                    <textarea
                      className="textarea"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us why you're a great fit..."
                    />
                  </div>
                  <div className="apply-buttons">
                    <button type="submit" className="btn btn-primary" disabled={applying}>
                      {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowApplyForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>Interested in this job?</h3>
                  <p>Apply now and take the next step in your career.</p>
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    onClick={() => user ? setShowApplyForm(true) : navigate('/auth')}
                  >
                    {user ? 'Apply Now' : 'Sign In to Apply'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
