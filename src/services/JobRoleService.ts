import config from "../config";
import axios, { AxiosResponse } from "axios";
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