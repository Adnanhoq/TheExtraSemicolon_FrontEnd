import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const multerConfig = {
    storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limits file size 
  },


    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype === "application/pdf" || 
            file.mimetype === "application/msword" || 
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            return cb(null, true); // Accept the file
        }
        // Reject other file types
        cb(null, false); // Reject the file
    }
};
