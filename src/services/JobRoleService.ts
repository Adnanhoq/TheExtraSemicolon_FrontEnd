import config from "../config";
import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

export const URL: string = "/api/job-roles/";

export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get job roles');
    }
}