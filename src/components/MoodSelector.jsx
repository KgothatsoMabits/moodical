import React, { useState } from "react";
import { motion } from "framer-motion"; // animation library

const moods = [
  {
    name: "Happy",
    gradient: "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400",
    emoji: "😊",
  },
  {
    name: "Calm",
    gradient: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400",
    emoji: "🌊",
  },
  {
    name: "Energetic",
    gradient: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    emoji: "⚡",
  },
];

export default function MoodSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Select Your Mood</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {moods.map((mood) => (
          <motion.button
            key={mood.name}
            className={`rounded-2xl p-6 text-center text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ${mood.gradient}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(mood.name)}
          >
            <span className="text-5xl block mb-3">{mood.emoji}</span>
            {mood.name}
          </motion.button>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-2xl"
        >
          You’re feeling <span className="font-bold">{selected}</span> today 🎉
        </motion.div>
      )}
    </div>
  );
}
