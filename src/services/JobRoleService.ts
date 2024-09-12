import axios, {type AxiosResponse} from "axios"
import { JobRole } from "../models/JobRole"
import config from "../config";
import { getHeader } from "./AuthUtil";
import { Buffer } from "buffer";
import { Readable } from "stream";

import { JobRoleResponseWrapper } from "../models/JobRoleResponseWrapper";



export const getJobRoles = async (page: number, limit: number, token: string): Promise<JobRoleResponseWrapper> => {
    try{
        const response: AxiosResponse<JobRoleResponseWrapper> = await axios.get(`${config.API_URL}job-roles?page=${String(page)}&limit=${String(limit)}`, getHeader(token));
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

export const getJobRoleById = async (id: string, token: string): Promise<JobRole> => {
    try {
        const response: AxiosResponse<JobRole> = await axios.get(`${config.API_URL}job-roles/` + id, getHeader(token));
        
        return response.data;
    } catch (e) {
        console.log(e as Error);
        throw new Error('Failed to get Job Role')
    }
}

export const getReportOfJobRoles = async (token: string): Promise<Buffer> => {
    try {

        const response: AxiosResponse<Readable> = await axios.get(`${config.API_URL}job-roles/report`, {
            responseType: 'stream',
            timeout: 20000,
            ... getHeader(token)
        });

        const chunks: Uint8Array[] = [];
        for await (const chunk of response.data as unknown as AsyncIterable<Uint8Array>) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        return buffer;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.code === 'ECONNABORTED') {
                throw new Error('You have timed out');
            } else if (e.response?.status === 404) {
                throw new Error('No Job Roles found');
            }
        }
        console.log(e as Error);
        throw new Error('Server Error');
    }
}