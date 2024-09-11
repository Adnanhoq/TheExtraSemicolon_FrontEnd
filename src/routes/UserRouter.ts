/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";

import { multerConfig} from "../multerConfig";
import multer from "multer";
import { postCSVUpload } from "../controllers/FileUploadController";

const upload = multer(multerConfig);

export const userRouter = express.Router();

userRouter.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);

userRouter.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);

