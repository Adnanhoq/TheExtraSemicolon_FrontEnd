import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path"; // For generating unique filenames

type FileNameCallback = (error: Error | null, filename: string) => void;
export const multerConfig = {
    storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },

    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        // Accept only PDF, DOC, and DOCX files
        if (file.mimetype === "roles/csv"){
            return cb(null, true); // Accept the file
        }
        // Reject other file types
        cb(null, false); // Reject the file
    }
};