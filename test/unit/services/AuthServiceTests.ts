import axios from "axios";
import {assert, expect} from 'chai';
import type { LoginRequest } from "../../../src/models/LoginRequest"
import MockAdapter from "axios-mock-adapter";
import { getToken } from "../../../src/services/AuthService";

const mock = new MockAdapter(axios);

const URL = "http://localhost:8080/api/auth/login";

describe('AuthService', function () {
    describe('getToken', function () {
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
        it('should return error when email invalid format', async () => {
            const loginRequest: LoginRequest = {
                email: "test",
                password: "admin"
            }
            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid format");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('should return error when email too short', async () => {
            const loginRequest: LoginRequest = {
                email: "",
                password: "admin"
            }
            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid length");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('should return error when email too long', async () => {
            const loginRequest: LoginRequest = {
                email: "test@kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaainos.com",
                password: "admin"
            }
            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid length");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('should return error when password too short', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: ""
            }
            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal("Password is not valid");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('should return error when password too long', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaswordpaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaswordpaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaswordaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasword"
            }
            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal("Password is not valid");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('should return error when 400 received', async () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "admin"
            }
            mock.onPost(URL, loginRequest).reply(400);
            try {
                await getToken(loginRequest);

            } catch (e) {
                console.log(e);
                expect(e.message).to.equal("Invalid Data Format");
                return;
            }
            assert.fail("Expected error message");
        })
    })
})