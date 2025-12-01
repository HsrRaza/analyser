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

    const response = await gemini.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0
    });

    // Get raw AI response
    let raw = response.choices[0].message.content;

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
