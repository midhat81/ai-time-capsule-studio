"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepProgress } from "@/app/create/_components/step-progress";
import { UploadPhoto } from "@/app/create/_components/upload-photo";
import { MoodSelector } from "@/app/create/_components/mood-selector";
import { IntentionInput } from "@/app/create/_components/intention-input";
import { CapsulePreview } from "@/app/create/_components/capsule-preview";
import { LockCapsule } from "@/app/create/_components/lock-capsule";
import { toast } from "sonner";

type Step = "upload" | "mood" | "intention" | "preview" | "lock";

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [photo, setPhoto] = useState<File | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [intention, setIntention] = useState("");
  const [isLocking, setIsLocking] = useState(false);

  const steps: Step[] = ["upload", "mood", "intention", "preview", "lock"];
  const currentStepIndex = steps.indexOf(currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case "upload":
        return photo !== null;
      case "mood":
        return mood !== null;
      case "intention":
        return intention.length >= 20;
      case "preview":
        return true;
      case "lock":
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      let message = "";
      if (currentStep === "upload") message = "Please upload a photo first";
      if (currentStep === "mood") message = "Please select a mood";
      if (currentStep === "intention") message = "Please write at least 20 characters";
      
      toast.error(message);
      return;
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
      toast.success("Step completed! ✓");
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleLock = async (unlockDate: Date) => {
    setIsLocking(true);
    toast.loading("Sealing your time capsule...", { id: "lock" });
    
    // Simulate sealing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a unique capsule ID
    const capsuleId = `capsule-${Date.now()}`;
    
    // Store data in localStorage
    const capsuleData = {
      id: capsuleId,
      photo: photo ? URL.createObjectURL(photo) : null,
      mood,
      intention,
      unlockDate: unlockDate.toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(capsuleId, JSON.stringify(capsuleData));
    
    setIsLocking(false);
    toast.success("Time capsule sealed! 🔒", { id: "lock" });
    
    // Redirect to capsule page
    setTimeout(() => {
      router.push(`/capsule/${capsuleId}`);
    }, 500);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <StepProgress currentStep={currentStepIndex + 1} totalSteps={steps.length} />

        {/* Step Content */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {currentStep === "upload" && (
                <UploadPhoto onPhotoSelect={setPhoto} selectedPhoto={photo} />
              )}
              {currentStep === "mood" && (
                <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
              )}
              {currentStep === "intention" && (
                <IntentionInput intention={intention} onIntentionChange={setIntention} />
              )}
              {currentStep === "preview" && (
                <CapsulePreview photo={photo} mood={mood} intention={intention} />
              )}
              {currentStep === "lock" && (
                <LockCapsule onLock={handleLock} isLoading={isLocking} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        {currentStep !== "lock" && (
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!canProceed()}
              whileHover={{ scale: canProceed() ? 1.05 : 1 }}
              whileTap={{ scale: canProceed() ? 0.95 : 1 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {canProceed() && <Check className="w-4 h-4" />}
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Step Indicators */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`h-2 rounded-full transition-all ${
                index === currentStepIndex
                  ? "w-8 bg-purple-600"
                  : index < currentStepIndex
                  ? "w-2 bg-green-500"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}