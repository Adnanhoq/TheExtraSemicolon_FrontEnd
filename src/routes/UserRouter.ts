/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";

export const userRouter = express.Router();

userRouter.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);

userRouter.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);
