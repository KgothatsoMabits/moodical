import React from 'react';
import { motion } from 'framer-motion';

export default function MoodCard({ mood, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(mood.id)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="card flex flex-col items-center gap-3 p-5 cursor-pointer transition-transform"
    >
      <img src={mood.image} alt={mood.label} className="w-16 h-16 rounded-lg object-cover" />
      <div className="font-semibold text-base">{mood.label}</div>
      <div className="text-sm text-slate-500">{mood.desc}</div>
    </motion.button>
  );
}
