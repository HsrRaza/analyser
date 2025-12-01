import { PDFParse } from "pdf-parse"
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

        // convert Buffer → Uint8Array for pdf-parse v2
        const uint8 = new Uint8Array(fileBuffer);

        const data = new PDFParse({ data: uint8 });

        const result = await data.getText()


        console.log("Extracted text:", result.text);


        const atsReport = await getAtsScore(result.text);

        return res.status(200).json({
            success: true,
            fileName,
            text: result.text,
            aiResponse: atsReport,
        });

    } catch (error) {
        console.error("Error parsing PDF:", error);
        return res.status(500).json({ error: "Error while parsing PDF", message: error.message });
    }
};
