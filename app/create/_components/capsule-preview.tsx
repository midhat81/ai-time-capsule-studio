"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

interface CapsulePreviewProps {
  photo: File | null;
  mood: string | null;
  intention: string;
}

export function CapsulePreview({ photo, mood, intention }: CapsulePreviewProps) {
  const mockAIMessage = `Based on your ${mood?.toLowerCase()} mood and your heartfelt message, I've crafted a special reflection for your future self. When you open this capsule, you'll discover how far you've come and the growth you've achieved.`;

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Preview Your Capsule
        </h2>
        <p className="text-gray-600">
          Here's what your future self will see
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 space-y-4">
        
        {photo && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={URL.createObjectURL(photo)}
              alt="Capsule photo"
              fill
              className="object-cover"
            />
          </div>
        )}

        {mood && (
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-purple-700 border border-purple-200">
              Feeling: {mood}
            </span>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 border border-purple-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Your Message:
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {intention}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-purple-700">
              AI Reflection (Preview):
            </h3>
          </div>
          <p className="text-purple-600 text-sm leading-relaxed italic">
            {mockAIMessage}
          </p>
        </div>
      </div>

      <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          💡 <strong>Note:</strong> The full AI reflection will be generated when you lock your capsule
        </p>
      </div>
    </div>
  );
}