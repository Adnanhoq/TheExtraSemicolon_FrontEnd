import axios, { AxiosResponse } from "axios";
import { API_URL } from "../config";
import 'dotenv/config';

export const getDatabases = async (): Promise<string[]> => {
    try {
          console.log(API_URL);
        const response: AxiosResponse = await axios.get(API_URL+"/api/test");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}