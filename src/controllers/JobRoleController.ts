import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const jobRole = await getJobRoles();
        res.render('jobRoles.njk', {jobRole: jobRole});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('jobRoles.njk');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleById(req.params.id);
        
        // This is why I love JavaScript
        const jobResponsibilitiesSplit = jobRole.responsibilities.split("•").filter(responsibility => responsibility.trim() !== '');
        
        res.render('jobRoleDetail.njk', { jobRole: jobRole, responsibilities: jobResponsibilitiesSplit });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRoleDetail.njk');
    }
}
