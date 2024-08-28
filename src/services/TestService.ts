import axios, { AxiosResponse } from "axios";
import config from "../config";

export const getDatabases = async (): Promise<string[]> => {
    try {
        console.log(config.API_URL);
        const response: AxiosResponse = await axios.get(config.API_URL+"test");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}