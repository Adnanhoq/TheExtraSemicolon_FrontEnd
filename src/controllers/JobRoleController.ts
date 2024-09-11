import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;


    try{
        const response = await getJobRoles(page, limit, req.session.token ?? '');
        const { jobRoles, pagination } = response;
        res.render('jobRoles.njk', {jobRoles: jobRoles, pagination, token: req.session.token, profile: req.session.profilePicture});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token, profile: req.session.profilePicture});
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleById(req.params.id, req.session.token ?? '');
        
        const jobResponsibilitiesSplit = jobRole.responsibilities.split("•").filter(responsibility => responsibility.trim() !== '');
        
        res.render('jobRoleDetail.njk', { jobRole: jobRole, responsibilities: jobResponsibilitiesSplit, token: req.session.token, profile: req.session.profilePicture });
    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token, profile: req.session.profilePicture});
    }
}
