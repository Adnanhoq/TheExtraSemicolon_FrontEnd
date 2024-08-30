import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const jobRole = await getJobRoles();
    console.log(jobRole);
    res.render('jobRoles.njk', {jobRole: await getJobRoles() });
}