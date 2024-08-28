import {assert, expect} from 'chai';
import type { LoginRequest } from "../../../src/models/LoginRequest";
import { validateLogin } from "../../../src/validators/LoginValidator";
import { log } from 'console';

describe('LoginValidator', function () {
    describe('validateLoginRequest', function () {
        const emailTestCases: [string, string,string][] = [
            ['', 'Email is not valid length', 'too short'],
            ['test@kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaainos.com', 'Email is not valid length', 'too long'],
            ['test','Email is not valid format', 'invalid format']
        ];
        const passwordTestCases: [string, string, string][] = [
            ['', 'Password is not valid', 'too short'],
            ['paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasword', 'Password is not valid', 'too long']
        ];
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


        emailTestCases.forEach(([email, expectedError, description]) => {
            it(`it should return error ${expectedError} when email is ${description}`, function() {
                try {
                    validateLogin(email, "");
                } catch (e) {
                    expect(e.message).to.equal(expectedError);
                    return;
                }
                assert.fail("Expected error message");
            })
        }),
        passwordTestCases.forEach(([password, expectedError, description]) => {
            it(`it should return error ${expectedError} when password is ${description}`, function() {
                try {
                    validateLogin("admin@kainos.com", password);
                } catch (e) {
                    expect(e.message).to.equal(expectedError);
                    return;
                }
                assert.fail("Expected error message");
            })
        })
    })
})