import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

function BackgroundWrapper({ children }) {
  const location = useLocation();
  const isHomeOrAbout = location.pathname === '/' || location.pathname === '/about';

  return (
    <div className={`page-wrapper ${isHomeOrAbout ? 'bg-image' : ''}`}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundWrapper>
              <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
              <Footer />
      </BackgroundWrapper>
    </BrowserRouter>
  );
}
