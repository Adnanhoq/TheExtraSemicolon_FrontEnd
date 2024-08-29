import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path"; // For generating unique filenames

type FileNameCallback = (error: Error | null, filename: string) => void;
export const multerConfig = {
    storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },

// export const multerConfig = {
//     storage: multer.diskStorage({
//         destination: 'uploads/', // Directory where files will be saved
//         filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
//             // Generate a unique filename with the original extension
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const ext = path.extname(file.originalname);
//             cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//         }
//     }),

    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        // Accept only PDF, DOC, and DOCX files
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
