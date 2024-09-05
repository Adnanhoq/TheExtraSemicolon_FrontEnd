/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";
import { getUploadForm, postUpload } from "../controllers/ApplicationController";
import multer from "multer";
import { multerConfig } from "../multerConfig";

const upload = multer(multerConfig);

export const userRouter = express.Router();

userRouter.get('/job-roles/:id', getSingleJobRole);

userRouter.get('/job-roles', getAllJobRoles);


userRouter.get('/apply/:id', getUploadForm);
userRouter.post('/apply/:id',upload.single('file'), postUpload);

userRouter.get('/upload-success', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('apply-succesful.html');
});