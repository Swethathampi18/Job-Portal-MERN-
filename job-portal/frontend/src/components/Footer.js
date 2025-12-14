import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">💼</span>
            <span className="logo-text">JobPortal</span>
          </div>
          <p className="footer-description">
            Connecting talented professionals with their dream careers.
          </p>
        </div>

        <div className="footer-section">
          <h4>For Job Seekers</h4>
          <Link to="/jobs">Browse Jobs</Link>
          <Link to="/auth">Create Account</Link>
        </div>

        <div className="footer-section">
          <h4>For Employers</h4>
          <Link to="/auth?mode=register">Post a Job</Link>
          <Link to="/dashboard/recruiter">Manage Jobs</Link>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
