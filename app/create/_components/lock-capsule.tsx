"use client";

import { Lock, Calendar } from "lucide-react";
import { useState } from "react";

interface LockCapsuleProps {
  onLock: (unlockDate: Date) => void;
  isLoading: boolean;
}

export function LockCapsule({ onLock, isLoading }: LockCapsuleProps) {
  const [selectedDays, setSelectedDays] = useState<number>(30);

  const presetDays = [7, 30, 90, 365];

  const handleLock = () => {
    const unlockDate = new Date();
    unlockDate.setDate(unlockDate.getDate() + selectedDays);
    onLock(unlockDate);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Lock className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Lock Your Capsule
        </h2>
        <p className="text-gray-600">
          Choose when you'd like to open this time capsule
        </p>
      </div>

      <div className="w-full space-y-4">
        <p className="text-sm font-medium text-gray-700">Quick Select:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presetDays.map((days) => (
            <button
              key={days}
              onClick={() => setSelectedDays(days)}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${
                  selectedDays === days
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              <div className="text-2xl font-bold text-gray-900">{days}</div>
              <div className="text-xs text-gray-500">
                {days === 7 ? "1 Week" : days === 30 ? "1 Month" : days === 90 ? "3 Months" : "1 Year"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Or choose custom days:
        </label>
        <input
          type="number"
          min="1"
          max="3650"
          value={selectedDays}
          onChange={(e) => setSelectedDays(parseInt(e.target.value) || 1)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
      </div>

      <div className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Unlock Date:</span>
          </div>
          <span className="text-sm font-bold text-purple-600">
            {new Date(Date.now() + selectedDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <button
        onClick={handleLock}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Sealing Capsule...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Lock Time Capsule</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Once locked, your capsule cannot be opened until the unlock date
      </p>
    </div>
  );
}