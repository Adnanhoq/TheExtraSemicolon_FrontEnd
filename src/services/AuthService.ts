import axios, {AxiosResponse} from "axios";
import type { LoginRequest } from "../models/LoginRequest";
import { pbkdf2Sync } from "crypto";
import { validateLogin } from "../validators/LoginValidator";
import { config } from "../config";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        validateLogin(loginRequest.email, loginRequest.password);
        const hashedPwd: Buffer = pbkdf2Sync(loginRequest.password, "", 65536, 6*16, 'sha256');
        loginRequest.password = hashedPwd.toString('base64');
        const response: AxiosResponse = await axios.post(config.API_URL+"//auth/login", loginRequest);

        return response.data;
    } catch (e) {
        console.log(e);

        if (!e.response) {
            throw new Error('Something went wrong during log in');          
        }

        if (e.response && axios.isAxiosError(e)) {
            if (e.response.status == 404 || e.response.status == 500) {
                throw new Error('Something went wrong during log in'); 
            }

            throw new Error(e.response.data);
        }
        throw new Error(e.message);
    }
}