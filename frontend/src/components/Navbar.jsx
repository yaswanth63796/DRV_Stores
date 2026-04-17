import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          DRV STORES
        </Link>
        <div className="nav-actions">
          <Link to="/login" className="btn" style={{ color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'transparent' }}>
            Sign In
          </Link>
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;