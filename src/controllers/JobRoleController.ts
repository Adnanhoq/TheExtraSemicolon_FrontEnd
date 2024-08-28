import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoles.njk', {jobRole: await getJobRoles() });
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoleDetail.njk', {jobRole: await getJobRoleById(req.params.id)})

}