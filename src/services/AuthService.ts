import axios, {AxiosResponse} from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { pbkdf2Sync } from "crypto";
import { validateLogin } from "../validators/LoginValidator";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        validateLogin(loginRequest.email, loginRequest.password);
        const hashedPwd: Buffer = pbkdf2Sync(loginRequest.password, "", 65536, 6*16, 'sha256');
        loginRequest.password = hashedPwd.toString('base64');
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/auth/login", loginRequest);

        return response.data;
    } catch (e) {
        console.log(e);

        if (axios.isAxiosError(e)) {
            throw new Error(e.response.data);
        }
        throw new Error(e.message);
    }
}