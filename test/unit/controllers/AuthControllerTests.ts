import sinon from 'sinon';
import { expect } from 'chai';
import * as AuthService from "../../../src/services/AuthService"
import * as AuthController from "../../../src/controllers/AuthController"
import * as AxiosRequest from 'axios';

declare module "express-session" {
    interface SessionData {
      token: string;
    }
  }

describe('AuthController', function () {
    this.afterEach(() => {
        sinon.restore();
    });

    describe('getLoginForm', function () {
        it('should render view with login form when retrieved', async () => {
            //sinon.stub(AuthService, 'getToken').resolves('');
            const req = { session: { token: 'test'}};
            const res = { render: sinon.spy(), locals: {role: 0} };

            await AuthController.getLoginForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm.njk')).to.be.true;
        });
    }),
    describe('postLoginForm', function () {
        it('should redirect to home when login successful', async () => {
            const token = '';
            sinon.stub(AuthService, 'getToken').resolves(token);

            const req = { session: {token: ''}};
            const res = { render: sinon.spy(), redirect: sinon.spy() };

            await AuthController.postLoginForm(req as any, res as any);
            expect(res.redirect.calledOnce).to.be.true;        
            expect(res.redirect.calledWith('/')).to.be.true;
        }),
        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = 'Error Message';
            sinon.stub(AuthService, 'getToken').rejects(new Error(errorMessage));

            const req = { };
            const res = { render: sinon.spy(), locals: {errormessage: ' '}};

            await AuthController.postLoginForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm.njk')).to.be.true;
            expect(res.locals.errormessage).to.equal(errorMessage);
        })
    }),
    describe('getLogOut', function () {
        it('should logout successfully when no error thrown', async () => {

            const res = { render: sinon.spy(), redirect: sinon.spy()};
            const req = {session: {destroy: sinon.stub().callsFake(res.redirect('/'))}};

            await AuthController.getLogout(req as any, res as any);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        })
    }),
    describe('getLogOut', function () {
        it('should render login page with error message when logout throws error', async () => {
            const errorMessage: string = 'Error Message';
            const res = { render: sinon.spy(), locals: {errormessage: ' '}};
            const req = {session: {destroy: sinon.stub().callsFake(function errorLogout() {
                res.locals.errormessage = errorMessage;
                res.render('/login');
            })
        }};

            await AuthController.getLogout(req as any, res as any);
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('/login')).to.be.true;
            expect(res.locals.errormessage).to.equal(errorMessage);
        })
    })
})

