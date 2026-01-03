"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, Unlock, Calendar, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { generateReflection } from "@/app/actions/generate-reflection";
import confetti from "canvas-confetti";

interface CapsuleData {
  id: string;
  photo: string | null;
  mood: string | null;
  intention: string;
  unlockDate: string;
  createdAt: string;
  aiReflection?: string;
  isUnlocked?: boolean;
}

export default function CapsulePage() {
  const params = useParams();
  const router = useRouter();
  const capsuleId = params.id as string;

  const [capsule, setCapsule] = useState<CapsuleData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [canUnlock, setCanUnlock] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  // Load capsule data
  useEffect(() => {
    const data = localStorage.getItem(capsuleId);
    if (data) {
      setCapsule(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [capsuleId, router]);

  // Calculate time remaining
  useEffect(() => {
    if (!capsule) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const unlockTime = new Date(capsule.unlockDate).getTime();
      const distance = unlockTime - now;

      if (distance < 0) {
        setTimeRemaining("Ready to unlock!");
        setCanUnlock(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ['#9333ea', '#ec4899', '#f97316', '#fbbf24']
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#9333ea', '#ec4899', '#f97316', '#fbbf24']
      });
    }, 250);
  };

  const handleUnlock = async () => {
    if (!canUnlock || !capsule) return;

    setIsUnlocking(true);
    setShowUnlockAnimation(true);
    toast.loading("Generating your AI reflection...", { id: "unlock" });

    try {
      // Calculate days locked
      const createdDate = new Date(capsule.createdAt);
      const unlockDate = new Date(capsule.unlockDate);
      const daysLocked = Math.floor((unlockDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

      // Generate real AI reflection
      const result = await generateReflection(
        capsule.mood || "reflective",
        capsule.intention,
        daysLocked
      );

      if (!result.success) {
        toast.error(result.error || "Failed to generate reflection", { id: "unlock" });
        setIsUnlocking(false);
        setShowUnlockAnimation(false);
        return;
      }

      // Delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update capsule with AI reflection
      const updatedCapsule = {
        ...capsule,
        aiReflection: result.reflection,
        isUnlocked: true
      };

      localStorage.setItem(capsuleId, JSON.stringify(updatedCapsule));
      setCapsule(updatedCapsule);
      
      // Trigger confetti
      triggerConfetti();
      
      toast.success("Your time capsule is now unlocked! 🎉", { id: "unlock" });
      setShowUnlockAnimation(false);
    } catch (error) {
      console.error("Unlock error:", error);
      toast.error("Something went wrong. Please try again.", { id: "unlock" });
      setShowUnlockAnimation(false);
    } finally {
      setIsUnlocking(false);
    }
  };

  if (!capsule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Unlock Animation Overlay */}
        <AnimatePresence>
          {showUnlockAnimation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-white rounded-full p-8 shadow-2xl"
              >
                <Unlock className="w-24 h-24 text-purple-600 animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Capsule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={capsule.isUnlocked ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {capsule.isUnlocked ? (
                    <Unlock className="w-8 h-8" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {capsule.isUnlocked ? "Unlocked Time Capsule" : "Locked Time Capsule"}
                  </h1>
                  <p className="text-purple-100 text-sm">
                    Created {new Date(capsule.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            
            {/* Photo Section */}
            {capsule.photo && (
              <motion.div 
                className="relative w-full h-96 rounded-lg overflow-hidden"
                initial={false}
                animate={{ scale: capsule.isUnlocked ? 1 : 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={capsule.photo}
                  alt="Capsule photo"
                  fill
                  className={`object-cover transition-all duration-1000 ${!capsule.isUnlocked ? 'blur-lg' : ''}`}
                />
                {!capsule.isUnlocked && (
                  <motion.div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lock className="w-12 h-12 text-white" />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Countdown or Unlocked Content */}
            {!capsule.isUnlocked ? (
              <div className="space-y-6">
                
                {/* Countdown Timer */}
                <motion.div 
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-gray-700">Time Remaining</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">
                        Unlocks {new Date(capsule.unlockDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.p 
                      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {timeRemaining}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Locked Message */}
                <div className="text-center space-y-2">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lock className="w-12 h-12 text-gray-400 mx-auto" />
                  </motion.div>
                  <p className="text-gray-600">
                    Your capsule is sealed and waiting for the right moment...
                  </p>
                  <p className="text-sm text-gray-500">
                    Come back on {new Date(capsule.unlockDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Unlock Button (appears when ready) */}
                {canUnlock && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnlock}
                    disabled={isUnlocking}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    {isUnlocking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating AI Reflection...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-5 h-5" />
                        <span>Unlock Your Capsule</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            ) : (
              /* Unlocked Content */
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                
                {/* Mood Badge */}
                {capsule.mood && (
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700">
                      Mood: {capsule.mood}
                    </span>
                  </motion.div>
                )}

                {/* Original Intention */}
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Your Original Message:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {capsule.intention}
                  </p>
                </motion.div>

                {/* AI Reflection */}
                {capsule.aiReflection && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                      <h3 className="text-lg font-semibold text-purple-900">
                        AI Reflection for You:
                      </h3>
                    </div>
                    <p className="text-purple-800 leading-relaxed whitespace-pre-line">
                      {capsule.aiReflection}
                    </p>
                  </motion.div>
                )}

                {/* Success Message */}
                <motion.div 
                  className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-green-700 font-medium">
                    🎉 Congratulations! You've unlocked your time capsule!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}