import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path"; // For generating unique filenames
import fs from "fs";

type FileNameCallback = (error: Error | null, filename: string) => void;
// export const multerConfig = {
//     storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // limit file size to 5MB
//   },

//     fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {       
//         if (file.mimetype === "text/csv"){
//             return cb(null, true); // Accept the file
//         }
//         // Reject other file types
//         cb(null, false); // Reject the file
//     }
// };
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

export const multerConfig = {
  storage: multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
          cb(null, uploadsDir); // Save to the uploads directory
      },
      filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
  }),
  limits: {
      fileSize: 100 * 1024 * 1024, // Adjust limit as necessary, e.g., 100MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (file.mimetype === "text/csv") {
          return cb(null, true); // Accept the file
      }
      cb(null, false); // Reject other file types
  }
};