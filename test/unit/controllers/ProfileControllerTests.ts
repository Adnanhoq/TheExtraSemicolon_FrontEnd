import * as ProfileController from "../../../src/controllers/ProfileController";
import * as ProfileService from "../../../src/services/ProfileService";
import { ProfileResponse } from "../../../src/models/ProfileResponse";
import * as JWTDecode from "jwt-decode"
import sinon from "sinon";
import {assert, expect} from 'chai';

declare module "express-session" {
    interface SessionData {
      token: string;
      profilePicture: string;
    }
  }

describe('ProfileController', function () {
    this.afterEach(() => {
        sinon.restore();
    });

    describe('getCameraPage', function () {
        it('should render view with Camera Page when retrieved', async () => {
            const req = { session: { token: 'test'}};
            const res = { render: sinon.spy(), locals: {role: 0} };

            await ProfileController.getCameraPage(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('profilePicture.njk')).to.be.true;
        });
    }),
    describe('getProfilePage', function () {
        it('should render view with Profile Page when retrieved', async () => {
            const req = { session: { token: 'test', profilePicture: ''}};
            const res = { render: sinon.spy(), locals: {role: 0} };
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: "test@kainos.com"});
            await ProfileController.getProfilePage(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('profile.njk')).to.be.true;
        });
    }),
    describe('putProfilePicture', function () {
        it('should redirect to profile when profile update successful', async () => {
            const profileResponse: ProfileResponse = {
                profilePicture: 'profilePicture'
            }
            const req = { session: { token: 'test'}};
            const res = { redirect: sinon.spy(), locals: {role:0}};

            sinon.stub(ProfileService, 'updateProfilePicture').resolves();
            sinon.stub(ProfileService, 'getProfilePicture').resolves(profileResponse);

            await ProfileController.putProfilePicture(req as any, res as any);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/profile')).to.be.true;

        }),
        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = 'Error Message';
            sinon.stub(ProfileService, 'updateProfilePicture').rejects(new Error(errorMessage));
            const req = { session: { token: 'test'}};
            const res = { render: sinon.spy(), locals: {errormessage: errorMessage}};

            await ProfileController.putProfilePicture(req as any, res as any);
            
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('profilePicture.njk')).to.be.true;
            expect(res.locals.errormessage).to.equal("Something went wrong when updating your profile");
        })
    })

});