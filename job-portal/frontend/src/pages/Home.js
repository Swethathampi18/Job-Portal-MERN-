import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <h1>Find Your Dream Job Today</h1>
          <p className="hero-subtitle">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          
          <div className="hero-buttons">
            {user ? (
              <Link to="/jobs" className="btn btn-primary btn-lg">
                Browse Jobs
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/jobs" className="btn btn-outline btn-lg">
                  Browse Jobs
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Jobs</span>
            </div>
            <div className="stat">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Job Seekers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose JobPortal?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Smart Matching</h3>
              <p>Find jobs that perfectly match your skills and preferences.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Track Applications</h3>
              <p>Monitor your application status in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of professionals finding their dream jobs.</p>
          <Link to="/auth?mode=register" className="btn btn-primary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
