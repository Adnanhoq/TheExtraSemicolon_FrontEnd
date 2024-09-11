import express from "express"
import { getJobRoleById } from "../services/JobRoleService";
import { getJobRoles } from "../services/JobRoleService";
import { getReportOfJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try{
        const response = await getJobRoles(page, limit, req.session.token ?? '');
        const { jobRoles, pagination } = response;
        res.render('jobRoles.njk', {jobRoles: jobRoles, pagination, token: req.session.token});

    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token});
    } 
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleById(req.params.id, req.session.token ?? '');
        
        const jobResponsibilitiesSplit = jobRole.responsibilities.split("*").filter(responsibility => responsibility.trim() !== '');
        
        res.render('jobRoleDetail.njk', { jobRole: jobRole, responsibilities: jobResponsibilitiesSplit, token: req.session.token });
    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('errorPage.njk', {error: e as Error, token: req.session.token});
    }
}

export const downloadJobRolesReport = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRolesReport = await getReportOfJobRoles();

        // Send the CSV data as a downloadable response
        res.setHeader('Content-Disposition', 'attachment; filename=job_roles_report.csv');
        res.setHeader('Content-Type', 'text/csv');
        res.send(jobRolesReport);
        
    } catch (e) {
        console.error('Error generating report:', e);
        res.status(500).send('Failed to generate report');
    }
};
