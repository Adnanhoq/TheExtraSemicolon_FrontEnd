import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponseWrapper } from "../models/JobRoleResponseWrapper";


export const getJobRoles = async (page: number, limit: number): Promise<JobRoleResponseWrapper> => {
    try{
        const response: AxiosResponse<JobRoleResponseWrapper> = await axios.get(`${config.API_URL}job-roles?page=${String(page)}&limit=${String(limit)}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('No job roles open');
            }
            else if (error.response?.status === 500) {
                throw new Error('Server Error');
            }
            throw new Error('Server Error');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}