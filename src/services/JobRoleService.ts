import axios, {AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"

export const getJobRoleById = async (id: String): Promise<JobRole> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles/" + id);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Role')
    }
}