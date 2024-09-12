/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { downloadJobRolesReport } from "../controllers/JobRoleController";
import { allowRoles } from "../middleware/AuthMiddleware";
import { UserRole } from "../models/JwtToken";

export const adminRouter = express.Router();

adminRouter.get('/jobroles/report', allowRoles([UserRole.Admin]), downloadJobRolesReport);
