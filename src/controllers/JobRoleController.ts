import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoles.njk', {jobRole: await getJobRoles() });
}

// export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {

//     try {
//         const jobRole = await getJobRoleById(req.params.id);
//         console.log(jobRole.responsibilities);
        
//         const jobResponsibilitiesSplit = jobRole.responsibilities.split("•");
//         console.log(jobResponsibilitiesSplit);
        
        
//         res.render('jobRoleDetail.njk', {jobRole: jobRole, responsibilities: jobResponsibilitiesSplit})
//     } catch (e) {
//         res.locals.errormessage = e.message;
//         res.render('jobRoleDetail.njk', req.body);
//     }

// }

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleById(req.params.id);
        
        const jobResponsibilitiesSplit = jobRole.responsibilities.split("•").filter(responsibility => responsibility.trim() !== '');
        console.log(jobResponsibilitiesSplit);
        
        res.render('jobRoleDetail.njk', { jobRole: jobRole, responsibilities: jobResponsibilitiesSplit });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRoleDetail.njk', req.body);
    }
}
