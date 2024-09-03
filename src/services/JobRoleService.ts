import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";


export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse<JobRoleResponse[]> = await axios.get(`${config.API_URL}job-roles`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('No Job roles open');
            }
            throw new Error('Server Error');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}