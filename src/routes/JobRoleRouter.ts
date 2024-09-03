import express, { Request, Response } from 'express';
import { Document } from 'mongoose';
import { JobRoleResponse } from '../models/JobRoleResponse';

const JobRoleRouter = express.Router();

interface PaginatedJobRoles {
  jobRoles: JobRoleResponse[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  totalJobRoles: number;
}

JobRoleRouter.get("/job-roles", async (req: Request, res: Response) => {
    try{
        const { roleId, roleName, locations, capability, band, closingDate, formattedLocations, page = 1, limit = 10 } = req.query;

        const options = { skip: (parseInt(page as string, 10) - 1) * 
            parseInt(limit as string, 10),
               limit: parseInt(limit as string, 10)
             };

        const jobRoles = await JobRoleResponse.find(query, null, 
            options).populate("vendor", "userName");
    }
});