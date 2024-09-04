import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {

    try{
        const jobRole = await getJobRoles(req.session.token ?? '');
        res.render('jobRoles.njk', {jobRole: jobRole, token: req.session.token, role: res.locals.role as string});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token, role: res.locals.role as string});
    }
    
}