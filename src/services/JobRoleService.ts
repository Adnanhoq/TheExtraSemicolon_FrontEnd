import axios, {AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"
import config from "../config";
import { JobRoleResponse } from "../models/JobRoleResponse";

const JOBROLEURL = "job-roles/";
export const URL = config.API_URL + JOBROLEURL;


export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse<JobRoleResponse[]> = await axios.get(`${config.API_URL}job-roles`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('No job roles open');
            }
            throw new Error('Cannot find Server');
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