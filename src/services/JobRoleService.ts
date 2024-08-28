import axios, {AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"
import { JobRoleResponse } from "../models/JobRoleResponse";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/job-roles/";

export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse = await axios.get('http://localhost:8080/api/job-roles/');
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get job roles');
    }
}

export const getJobRoleById = async (id: String): Promise<JobRole> => {
    try {
        const response: AxiosResponse = await axios.get('http://localhost:8080/api/job-roles/' + id);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Role')
    }
}