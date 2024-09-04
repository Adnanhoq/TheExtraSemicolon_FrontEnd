import axios, {type AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"
import config from "../config";
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

export const getJobRoleById = async (id: string): Promise<JobRole> => {
    try {
        const response: AxiosResponse<JobRole> = await axios.get(`${config.API_URL}job-roles/` + id);
        
        return response.data;
    } catch (e) {
        console.log(e as Error);
        throw new Error('Failed to get Job Role')
    }
}