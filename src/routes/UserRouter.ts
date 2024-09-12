/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";
import { getUploadForm, postUpload } from "../controllers/ApplicationController";
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";
import multer from "multer";
import { multerConfig } from "../multerConfig";

const upload = multer(multerConfig);


export const userRouter = express.Router();

userRouter.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);
userRouter.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);

userRouter.get('/apply/:id', allowRoles([UserRole.Admin, UserRole.User]),getUploadForm);
userRouter.post('/apply/:id',allowRoles([UserRole.Admin, UserRole.User]),upload.single('file'), postUpload);

