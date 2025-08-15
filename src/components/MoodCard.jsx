import React from 'react';
import { motion } from 'framer-motion';
import moods from '../data/moods';
import '../styles/global.css';

export default function MoodCard({ mood, onSelect, selected }) {
  return (
    <motion.button
      onClick={() => onSelect(mood)} // Pass the whole mood object
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`mood-card ${selected === mood.id ? 'selected' : ''}`}
      aria-pressed={selected === mood.id}
      aria-label={`Select mood ${mood.label}`}
    >
      <img src={mood.image} alt={mood.label} className="mood-image" />
      <div className="font-semibold">{mood.label}</div>
      <div className="text-sm">{mood.desc}</div>
    </motion.button>
  );
}