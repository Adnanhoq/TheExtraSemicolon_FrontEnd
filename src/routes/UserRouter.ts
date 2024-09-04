/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";

export const userRouter = express.Router();

userRouter.get('/job-roles/:id', getSingleJobRole);

userRouter.get('/job-roles', getAllJobRoles);
