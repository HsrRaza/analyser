// routes/uploadRoutes.js
import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadResume} from "../controller/resumeUpload.controller.js";

const router = express.Router();

// Single file upload
router.post("/upload-resume", upload.single("resume"), uploadResume);

export default router;
