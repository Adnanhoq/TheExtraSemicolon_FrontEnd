import express from "express";

import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";


import { multerConfig} from "../multerConfig";
import multer from "multer";
import { postCSVUpload } from "../controllers/FileUploadController";

const upload = multer(multerConfig);
export const adminRouter = express.Router();


adminRouter.get('/upload-CSV', allowRoles([UserRole.Admin]),async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('csvFileUpload.njk');
 });

adminRouter.post('/upload-CSV', allowRoles([UserRole.Admin]), upload.array('files'), postCSVUpload);