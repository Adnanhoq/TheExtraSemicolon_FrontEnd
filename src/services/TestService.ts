import axios, {AxiosResponse} from "axios";
import config from "../config";

export const getDatabases = async (): Promise<string[]> => {
    try {
        console.log(config.API_URL);
        const response: AxiosResponse<string[]> = await axios.get((config.API_URL+"test") as string);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get databases');
    }
}