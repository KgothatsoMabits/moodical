import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const loc = useLocation();
  return (
    <nav className="container mx-auto flex items-center gap-4 p-4 rounded-xl glass">
      <div className="font-semibold text-lg text-brand-dark">MOODICAL</div>

      <div className="ml-auto flex gap-4">
        <Link to="/" className={`px-3 py-1 rounded-md ${loc.pathname === '/' ? 'bg-brand text-white' : 'text-slate-700'}`}>Home</Link>
        <Link to="/about" className={`px-3 py-1 rounded-md ${loc.pathname === '/about' ? 'bg-brand text-white' : 'text-slate-700'}`}>About</Link>
      </div>
    </nav>
  );
}
