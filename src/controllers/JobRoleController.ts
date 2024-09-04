import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const jobRole = await getJobRoles(req.session.token ?? '');
        res.render('jobRoles.njk', {jobRole: jobRole, token: req.session.token});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token});
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleById(req.params.id, req.session.token ?? '');
        
        const jobResponsibilitiesSplit = jobRole.responsibilities.split("•").filter(responsibility => responsibility.trim() !== '');
        
        res.render('jobRoleDetail.njk', { jobRole: jobRole, responsibilities: jobResponsibilitiesSplit, token: req.session.token });
    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token});
    }
}
