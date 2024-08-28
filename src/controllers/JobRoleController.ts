import express from "express"
import { getJobRoleById } from "../services/JobRoleService";

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoleDetail.njk', {jobRole: await getJobRoleById(req.params.id)})
}