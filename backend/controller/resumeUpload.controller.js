import { getAtsScore } from "../services/ats.service.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const mimeType = req.file.mimetype;

        console.log("Uploaded file:", { fileName, mimeType });
        console.log("Parsing PDF...");

        // Dynamic import for CommonJS module
        const pdfParse = (await import("pdf-parse")).default;
        
        const data = await pdfParse(fileBuffer);

        console.log("Extracted text:", data.text);
        console.log("Total pages:", data.numpages);

        const atsReport = await getAtsScore(data.text);

        return res.status(200).json({
            success: true,
            fileName,
            text: data.text,
            pages: data.numpages,
            aiResponse: atsReport,
        });

    } catch (error) {
        console.error("Error parsing PDF:", error);
        return res.status(500).json({ 
            error: "Error while parsing PDF", 
            message: error.message 
        });
    }
};