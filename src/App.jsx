import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import MoodSelector from "./components/MoodSelector";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MoodSelector />
      <main style={{ padding: '1.5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
