import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";


export const getJobRoles = async (page: number, limit: number): Promise<{ jobRoles: JobRoleResponse[], total: number }> => {
    try{
    const response: AxiosResponse<{ jobRoles: JobRoleResponse[], total:number }> = await axios.get(`${config.API_URL}job-roles`, {
        params: { page,limit }
    });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('No job roles open');
            }
            throw new Error('Server Error');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}