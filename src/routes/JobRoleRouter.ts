import express, { Request, Response } from 'express';
import { Document } from 'mongoose';

const JobRoleRouter = express.Router();

interface PaginatedJobRoles {
  products: Document[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  totalPublished: number;
}

JobRoleRouter.get("/job-roles", async (req: Request, res: Response) => {});