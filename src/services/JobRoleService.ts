import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

const JOBROLEURL = "/job-roles/";
export const URL = config.API_URL + JOBROLEURL;


export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse<JobRoleResponse[]> = await axios.get(`${config.API_URL}job-roles`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('No job roles are open');
    }
}