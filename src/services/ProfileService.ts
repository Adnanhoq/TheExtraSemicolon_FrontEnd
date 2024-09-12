import axios, {type AxiosResponse} from "axios";
import { ProfileRequest } from "../models/ProfileRequest";
import { ProfileResponse } from "../models/ProfileResponse";
import { getHeader } from "./AuthUtil";
import { config } from "../config";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";

export const updateProfilePicture = async (profile : ProfileRequest, token: string): Promise<void> => {
    try{
        const decodedToken: JwtToken = jwtDecode(token);
        profile.email = decodedToken.sub;
        const response: AxiosResponse<void> = await axios.put(`${config.API_URL}profile`, profile, getHeader(token))
        return response.data;
    } catch (e) {
        console.log(e as Error);
        throw new Error('Failed to update Profile Picture');
    }
}

export const getProfilePicture = async (token: string) : Promise<ProfileResponse> => {
    try {
        const decodedToken: JwtToken = jwtDecode(token);
        const response: AxiosResponse<ProfileResponse> = await axios.post(`${config.API_URL}profile`, decodedToken.sub, getHeader(token));
        return response.data;
    } catch (e) {
        console.log(e as Error);
        throw new Error('Failed to get Profile Picture');
    }
}