import axios, { AxiosResponse } from "axios";

export const getDatabases = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse = await axios.get("${API_URL}");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}