/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";
import { getProfilePage, putProfilePicture, getCameraPage } from "../controllers/ProfileController";

export const userRouter = express.Router();

userRouter.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);

userRouter.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);

userRouter.get('/profile', allowRoles([UserRole.Admin, UserRole.User]),getProfilePage);
userRouter.post('/profile/picture', allowRoles([UserRole.Admin, UserRole.User]),putProfilePicture);
userRouter.get('/profile/picture', allowRoles([UserRole.Admin, UserRole.User]),getCameraPage)
