import axios, { AxiosResponse } from "axios";
import config from "../config";

export const getDatabases = async (): Promise<string[]> => {
    try {
        console.log("shoul;d be here");
        console.log(config.API_URL);
        const response: AxiosResponse = await axios.get(config.API_URL);

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}