import express from 'express';
import { getAllJobRoles } from '../controllers/JobRoleController';
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";

export const userRouter = express.Router();

/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
userRouter.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);