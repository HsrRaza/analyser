import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let gemini;
if (!process.env.GEMINI_API_KEY) {
  // Provide a stub that will throw a clear error if used without configuration.
  console.warn("GEMINI_API_KEY not set — Gemini client will throw if used");
  gemini = {
    chat: {
      completions: {
        create: async () => {
          throw new Error("GEMINI_API_KEY not set in environment");
        },
      },
    },
  };
} else {
  gemini = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });
}

export { gemini };
