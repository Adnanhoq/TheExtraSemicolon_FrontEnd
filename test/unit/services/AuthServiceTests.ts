import axios from "axios";
import {assert, expect} from 'chai';
import type { LoginRequest } from "../../../src/models/LoginRequest"
import MockAdapter from "axios-mock-adapter";
import { getToken } from "../../../src/services/AuthService";
import { config } from "../../../src/config";

const mock = new MockAdapter(axios);

const URL = config.API_URL + "/api/auth/login";

describe('AuthService', function () {
    describe('getToken', function () {
        const emailTestCases: [string, string,string][] = [
            ['', 'Email is not valid length', 'too short'],
            ['test@kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaainos.com', 'Email is not valid length', 'too long'],
            ['test','Email is not valid format', 'invalid format']
        ];
        const passwordTestCases: [string, string, string][] = [
            ['', 'Password is not valid', 'too short'],
            ['paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasword', 'Password is not valid', 'too long']
        ];
        it('should return token when valid request', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "admin"
            }
            mock.onPost(URL, loginRequest).reply(200, "Correct");

            try {
                await getToken(loginRequest);

            } catch (e) {
                assert.fail("Expected no error message");
            }
        }),

        emailTestCases.forEach(([email, expectedError, description]) => {
            it(`it should return error ${expectedError} when email is ${description}`, async () => {
                const loginRequest: LoginRequest = {
                    email: email,
                    password: ""
                }
                try {
                    await getToken(loginRequest);
                } catch (e) {
                    expect(e.message).to.equal(expectedError);
                    return;
                }
                assert.fail("Expected error message");
            })
        }),

        passwordTestCases.forEach(([password, expectedError, description]) => {
            it(`it should return error ${expectedError} when email is ${description}`, async () => {
                const loginRequest: LoginRequest = {
                    email: "admin@kainos.com",
                    password: password
                }
                try {
                    await getToken(loginRequest);
                } catch (e) {
                    expect(e.message).to.equal(expectedError);
                    return;
                }
                assert.fail("Expected error message");
            })
        }),
        it('should return error when 400 received', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "wlSNgEn5dCBM59jnbeH+txKWn36Vt6QScELcAa5ZBNduqSY16JAl2hqeGsZrmpG0kdb9+ILMoCJVB3er8ZoCJI9o26IM83UfnJtTT3p7cRgOUxsU0iMHgkI9KdQpDim6"
            }
            
            mock.onPost(URL, loginRequest).reply(400, "Invalid Data Format");
            loginRequest.password = "admin";
            try {
                await getToken(loginRequest);

            } catch (e) {
                expect(e.message).to.equal("Invalid Data Format");
                return;
            }
            assert.fail("Expected error message");
        }),

        it('should return error when 500 received', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "wlSNgEn5dCBM59jnbeH+txKWn36Vt6QScELcAa5ZBNduqSY16JAl2hqeGsZrmpG0kdb9+ILMoCJVB3er8ZoCJI9o26IM83UfnJtTT3p7cRgOUxsU0iMHgkI9KdQpDim6"
            }
            console.log(URL);
            
            mock.onPost(URL, loginRequest).reply(500, "Service Failed");
            loginRequest.password = "admin";
            try {
                await getToken(loginRequest);

            } catch (e) {
                expect(e.message).to.equal("Service Failed");
                return;
            }
            assert.fail("Expected error message");
        })
    })
})