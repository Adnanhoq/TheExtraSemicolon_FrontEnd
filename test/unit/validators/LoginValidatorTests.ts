import {assert, expect} from 'chai';
import type { LoginRequest } from "../../../src/models/LoginRequest";
import { validateLogin } from "../../../src/validators/LoginValidator";
import { log } from 'console';

describe('LoginValidator', function () {
    describe('validateLoginRequest', function () {
        it('it should not throw exception when errors', () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "admin"
            }

            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                assert.fail("Expected no error message");
            }
        }),
        it('it should return error when email too short', () => {
            const loginRequest: LoginRequest = {
                email: "",
                password: "admin"
            }
            console.log(loginRequest.email);
            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid length");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('it should return error when email too long', () => {
            const loginRequest: LoginRequest = {
                email: "test@kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaainos.com",
                password: "admin"
            }

            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid length");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('it should return error when email invalid format', () => {
            const loginRequest: LoginRequest = {
                email: "test",
                password: "admin"
            }

            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                expect(e.message).to.equal("Email is not valid format");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('it should return error when password too short', () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: ""
            }

            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                expect(e.message).to.equal("Password is not valid");
                return;
            }
            assert.fail("Expected error message");
        }),
        it('it should return error when password too long', () => {
            const loginRequest: LoginRequest = {
                email: "admin@kainos.com",
                password: "paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasword"
            }

            try {
                validateLogin(loginRequest.email, loginRequest.password);
            } catch (e) {
                expect(e.message).to.equal("Password is not valid");
                return;
            }
            assert.fail("Expected error message");
        })
    })
})