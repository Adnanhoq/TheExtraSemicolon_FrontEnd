import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

export const JOBROLEURL = "/job-roles/";

export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse<JobRoleResponse[]> = await axios.get(config.API_URL + JOBROLEURL);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get job roles');
    }
}