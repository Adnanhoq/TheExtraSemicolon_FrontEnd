import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path"; 
import fs from "fs";


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

export const multerConfig = {

 storage: multer.memoryStorage(),
  limits: {
      fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
     if (file.mimetype === "text/csv") {
        cb(null, true); 
    } else {
        cb(null, false); 
    }
  }
};