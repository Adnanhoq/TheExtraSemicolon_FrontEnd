import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;


    try{
        const response = await getJobRoles(page, limit);
        const { jobRoles, pagination } = response;
        res.render('jobRoles.njk', {jobRoles: jobRoles, pagination});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error});
    }
    
}
