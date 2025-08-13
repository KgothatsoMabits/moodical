import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/global.css';

export default function Navbar() {
  const loc = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">MOODICAL</div>
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${loc.pathname === '/' ? 'active' : ''}`}
          aria-current={loc.pathname === '/' ? 'page' : undefined}
          tabIndex={loc.pathname === '/' ? -1 : 0}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`nav-link ${loc.pathname === '/about' ? 'active' : ''}`}
          aria-current={loc.pathname === '/about' ? 'page' : undefined}
          tabIndex={loc.pathname === '/about' ? -1 : 0}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
