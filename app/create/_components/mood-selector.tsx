"use client";

import { motion } from "framer-motion";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { emoji: "😊", label: "Hopeful", color: "from-green-400 to-emerald-500" },
  { emoji: "😌", label: "Grateful", color: "from-blue-400 to-cyan-500" },
  { emoji: "🤔", label: "Curious", color: "from-purple-400 to-violet-500" },
  { emoji: "😔", label: "Reflective", color: "from-gray-400 to-slate-500" },
  { emoji: "😄", label: "Excited", color: "from-yellow-400 to-orange-500" },
  { emoji: "😌", label: "Peaceful", color: "from-teal-400 to-cyan-500" },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          How Are You Feeling?
        </h2>
        <p className="text-gray-600">
          Choose the mood that best captures this moment
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            onClick={() => onMoodSelect(mood.label)}
            className={`
              relative p-6 rounded-xl border-2 transition-all
              ${
                selectedMood === mood.label
                  ? "border-purple-500 bg-purple-50 scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:scale-102"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-5xl">{mood.emoji}</span>
              <span className="font-medium text-gray-900">{mood.label}</span>
            </div>
            {selectedMood === mood.label && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${mood.color} opacity-10`}
              />
            )}
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <p className="text-sm text-green-600 font-medium">
          ✓ Mood selected: {selectedMood}
        </p>
      )}
    </div>
  );
}