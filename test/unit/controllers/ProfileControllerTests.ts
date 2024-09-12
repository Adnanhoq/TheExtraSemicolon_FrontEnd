import * as ProfileController from "../../../src/controllers/ProfileController";
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
    describe('updateProfilePicture', function () {
        it('should ', async () => {
            
        })
    })

});