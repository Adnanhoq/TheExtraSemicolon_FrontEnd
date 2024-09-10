import axios, {type AxiosResponse} from "axios";
import { ProfileRequest } from "../models/ProfileRequest";
import { getHeader } from "./AuthUtil";
import { config } from "../config";

export const updateProfilePicture = async (profile : ProfileRequest, token: string): Promise<void> => {
    try{

    
        const response: AxiosResponse<void> = await axios.put(`${config.API_URL}profile`, profile, getHeader(token))
    }
    catch (e) {
        console.log(e as Error);
        throw new Error('Failed to update Profile Picture');
    }
}