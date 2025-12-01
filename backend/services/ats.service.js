import { gemini } from "../config/gemini.js";

export const getAtsScore = async (resumeText) => {
    const prompt = `
Your tasks:
1. Extract the applicant's full name from the resume text.
2. Generate a friendly 1–2 sentence AI intro using the applicant's name.
3. Provide full ATS analysis including:
   - ATS Score (0–100)
   - Key strengths
   - Missing keywords
   - Formatting issues
   - Recommended improvements
   - Whether it passes ATS or not

Return STRICT JSON ONLY.
NO MARKDOWN.
NO CODE BLOCKS.

JSON Schema:
{
  "intro": string,
  "atsScore": number,
  "strengths": [],
  "missingKeywords": [],
  "issues": [],
  "recommendations": [],
  "passes": boolean
}

Resume:
${resumeText}
`;

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    let response;
    try {
        response = await gemini.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0
        });
    } catch (err) {
        console.error("Gemini API call failed:", err);
        throw new Error("Failed to call Gemini API: " + (err.message || err));
    }

    // Get raw AI response (defensively)
    let raw = response?.choices?.[0]?.message?.content || (response?.data && response.data[0]?.text) || "";

    // Clean accidental code fences
    raw = raw.replace(/```json|```/g, "").trim();

    // Parse JSON safely
    let result;
    try {
        result = JSON.parse(raw);

    } catch (err) {
        console.error("JSON Parse Failed. Raw Output:", raw);
        throw new Error("Gemini returned non-JSON response");
    }

    return result;
};
