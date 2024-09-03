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
        if (file.mimetype === "text/csv"){
            return cb(null, true); // Accept the file
        }
        // Reject other file types
        cb(null, false); // Reject the file
    }
};