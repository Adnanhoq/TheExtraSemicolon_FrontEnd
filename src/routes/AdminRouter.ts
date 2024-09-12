import express from "express";

import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";


import { multerConfig} from "../multerConfig";
import multer from "multer";
import { postCSVUpload } from "../controllers/FileUploadController";

const upload = multer(multerConfig);
export const adminRouter = express.Router();


adminRouter.get('/upload-CSV', allowRoles([UserRole.Admin]), (req: express.Request, res: express.Response): void => {
    res.render('csvFileUpload.njk');
 });

adminRouter.post('/upload-CSV', allowRoles([UserRole.Admin]), upload.array('files'),  (req: express.Request, res: express.Response): void => {
    postCSVUpload(req, res).then(() => {
    }).catch((error) => {
        res.status(500).send(error.message);
    });
 });