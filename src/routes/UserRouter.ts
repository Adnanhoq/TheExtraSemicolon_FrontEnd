import express from "express";
import { getSingleJobRole, getAllJobRoles } from "../controllers/JobRoleController";

export const userRouter = express.Router();

/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
userRouter.get('/job-roles/:id', getSingleJobRole);

/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
userRouter.get('/job-roles', getAllJobRoles);