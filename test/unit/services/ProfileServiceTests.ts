import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { config } from "../../../src/config";
import { ProfileRequest } from "../../../src/models/ProfileRequest";
import * as JWTDecode from "jwt-decode";
import sinon from "sinon";
import { getProfilePicture, updateProfilePicture } from "../../../src/services/ProfileService";
import {assert, expect} from 'chai';
import { ProfileResponse } from "../../../src/models/ProfileResponse";

declare module "express-session" {
    interface SessionData {
      token: string;
      profilePicture: string;
    }
  }

let mock: MockAdapter

const URL = config.API_URL + "profile";

describe('ProfileService', function () {
    this.beforeEach(() => {
        mock = new MockAdapter(axios);
        sinon.restore();
    });

    describe('updateProfilePicture', function () {
        it('should not throw error when 204 returned from put request', async () => {
            const profileRequest: ProfileRequest = {
                email: "test@kainos.com",
                profilePicture: "test"
            }
            const token: string = "token";
            mock.onPut(URL).reply(204, "Successful Update");
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: "test@kainos.com"});

            try {
                await updateProfilePicture(profileRequest, token);
            } catch (e) {
                assert.fail("Expected no error message");
            }
        }),
        it('should throw error when 500 returned from put request', async () => {
            const profileRequest: ProfileRequest = {
                email: "test@kainos.com",
                profilePicture: "test"
            }
            const token: string = "token";
            mock.onPut(URL).reply(500, "Failed to update Picture");

            try {
                await updateProfilePicture(profileRequest, token);
            } catch (e) {
                expect((e as Error).message).to.equal('Failed to update Profile Picture');
                return;
            }

            assert.fail("Expected Error Message");
        });
    })
    describe('getProfilePicture', function () {
        it('should return profileResponse when 200 response returned', async () => {
            const profileResponse: ProfileResponse = {
                profilePicture: 'profilePicture'
            }
            const token: string = "token";
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: "test@kainos.com"});
            mock.onPost(URL).reply(200, profileResponse);

            try {
                const results = await getProfilePicture(token);
                expect(results.profilePicture).to.equal(profileResponse.profilePicture);
            } catch (e) {
                assert.fail('Expected no error message');
            }
        }),
        it('should throw error when 500 response returned', async () => {
            const token: string = "token";
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: "test@kainos.com"});

            mock.onPost(URL).reply(500);

            try {
                await getProfilePicture(token);
            } catch(e) {
                expect((e as Error).message).to.equal('Failed to get Profile Picture');
                return;
            }
            assert.fail('Expected error message');
        }),
        it('should throw error when 404 response returned', async () => {
            const token: string = "token";
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: "test@kainos.com"});

            mock.onPost(URL).reply(404);

            try {
                await getProfilePicture(token);
            } catch(e) {
                expect((e as Error).message).to.equal('Failed to get Profile Picture');
                return;
            }
            assert.fail('Expected error message');
        })
    })
})