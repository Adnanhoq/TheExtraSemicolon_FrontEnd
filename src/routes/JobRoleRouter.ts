import express from 'express';
import { getAllJobRoles } from '../controllers/JobRoleController';

const JobRoleRouter = express.Router();

JobRoleRouter.get("/job-roles", getAllJobRoles);

export default JobRoleRouter;