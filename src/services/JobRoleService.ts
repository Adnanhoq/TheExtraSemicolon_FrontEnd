import axios, {AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"
import config from "../config";
import { JobRoleResponse } from "../models/JobRoleResponse";

export const JOBROLEURL = "/job-roles/";
const URL = config.API_URL + JOBROLEURL;

export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse<JobRoleResponse[]> = await axios.get(URL);
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