"use client";

interface IntentionInputProps {
  intention: string;
  onIntentionChange: (intention: string) => void;
}

export function IntentionInput({ intention, onIntentionChange }: IntentionInputProps) {
  const maxLength = 500;
  const remaining = maxLength - intention.length;

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Set Your Intention
        </h2>
        <p className="text-gray-600">
          What message or goal do you want to send to your future self?
        </p>
      </div>

      <div className="w-full space-y-2">
        <textarea
          value={intention}
          onChange={(e) => onIntentionChange(e.target.value)}
          placeholder="Dear future me, I hope that by the time you read this..."
          className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
          maxLength={maxLength}
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {intention.length > 0 ? "Looking good!" : "Start writing..."}
          </span>
          <span
            className={`font-medium ${
              remaining < 50 ? "text-orange-500" : "text-gray-500"
            }`}
          >
            {remaining} characters left
          </span>
        </div>
      </div>

      {intention.length >= 20 && (
        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Great! Your intention is ready to be preserved.
          </p>
        </div>
      )}

      {intention.length > 0 && intention.length < 20 && (
        <div className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            Write at least 20 characters to continue
          </p>
        </div>
      )}
    </div>
  );
}