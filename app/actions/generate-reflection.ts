"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateReflection(
  mood: string,
  intention: string,
  daysLocked: number
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a thoughtful AI companion helping someone reflect on their personal growth journey.

A person created a time capsule ${daysLocked} days ago with these details:
- Mood: ${mood}
- Their message: "${intention}"

Now they're opening this capsule. Write a warm, personalized reflection (200-300 words) that:
1. Acknowledges their original mood and intention
2. Celebrates their journey and growth over the past ${daysLocked} days
3. Offers encouraging insights about their progress
4. Ends with an inspiring forward-looking message

Write in a warm, personal tone as if you're a supportive friend. Use "you" to address them directly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reflection = response.text();

    return {
      success: true,
      reflection,
    };
  } catch (error) {
    console.error("Error generating reflection:", error);
    return {
      success: false,
      error: "Failed to generate AI reflection. Please try again.",
    };
  }
}