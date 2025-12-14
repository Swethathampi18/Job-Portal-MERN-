import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'recruiter') return '/dashboard/recruiter';
    return '/dashboard/job-seeker';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">JobPortal</span>
        </Link>

        <div className="navbar-links">
          <Link to="/jobs" className="nav-link">Browse Jobs</Link>
          
          {user ? (
            <>
              <Link to={getDashboardLink()} className="nav-link">Dashboard</Link>
              <div className="user-info">
                <span className="user-name">{user.fullName}</span>
                <span className="user-role">{user.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="nav-link">Sign In</Link>
              <Link to="/auth?mode=register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
