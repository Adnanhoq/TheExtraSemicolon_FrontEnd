import express from 'express';
import { getAllJobRoles } from '../controllers/JobRoleController';

export const userRouter = express.Router();

/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
userRouter.get('/job-roles', getAllJobRoles);
