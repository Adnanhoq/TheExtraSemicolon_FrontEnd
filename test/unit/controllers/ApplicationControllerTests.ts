import { createRequest, createResponse } from 'node-mocks-http';
import * as ApplicationController from "../../../src/controllers/ApplicationController"
import { assert, expect } from 'chai';
import sinon from 'sinon';
import * as ApplicationService from  '../../../src/services/ApplicationService';
import * as JWTDecode from 'jwt-decode';
import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';

declare module "express-session" {
    interface SessionData {
      token: string;
    }
  }


describe('ApplicationController', function() {
    this.afterEach(() => {
        sinon.restore();
    });

    describe('initBucket', function() {

        it('should return false as bucket does not exist', async () => { // Needs token but unsure how to pass it in
            const s3 = undefined;

            sinon.stub(ApplicationService, 'checkBucketExists').resolves(false);
            try {
                const res = await ApplicationController.initBucket(s3 as any);
            } catch (e) {
                console.log("HERE"+e)
                expect(e.message).to.equal("Bucket does not exist");
                return;
            }
            assert.fail("Expected error message");

        })
    }),
    
    describe('getUploadForm', function() {
         it('should render view when retrieved', async () => {
            const req = { session: {token: 'test'}, params: {id: 1}};
            const res = { render: sinon.spy(), locals: {role: 0}};

            await ApplicationController.getUploadForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('apply.njk')).to.be.true;
        })
    }),
    describe('checkApplicationExists', function () {
        it('should return true when application does exist', async () => {
            const id = 1;
            const email = "test@kainos.com";
            const token = "test";

            sinon.stub(ApplicationService, 'getApplicationById').resolves();
            const result = await ApplicationController.checkApplicationExists(id, email, token);

            expect(result).to.be.true;
        }),
        it('should return false when application does not exist', async () => {
            const id = 1;
            const email = "test@kainos.com";
            const token = "test";
            const response: AxiosResponse = {
                data: '',
                headers: {},
                request: {},
                status: 404
            } as AxiosResponse;
            sinon.stub(ApplicationService, 'getApplicationById').throws(new AxiosError('', '', undefined, undefined, response));

            const result = await ApplicationController.checkApplicationExists(id, email, token);

            expect(result).to.be.false;
        })
    }),
    describe('postUpload', async () => {
        it("should throw an invalid file type error if the file type is null", async () => {
            const req = { session: {token: 'test'}, params: {id: 1}};
            const res = { render: sinon.spy(), locals: {role: 0}};

            try {
                await ApplicationController.postUpload(req as any, res as any);
            } catch (e) {
                expect(e.message).to.equal('Invalid File Type Uploaded');
                return;
            }
            assert.fail('Expected error message');
            
        }),

        it("should throw a error if the application already exists", async () => {
            const req = { session: {token: 'test'}, params: {id: 1}, file: ''};
            const res = { render: sinon.spy(), locals: {role: 0}};

            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: 'test@kainos.com'});
            sinon.stub(ApplicationController, 'checkApplicationExists').resolves(true);

            await ApplicationController.postUpload(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('apply.njk')).to.be.true;
        }),
        it("should throw a error if the bucket is undefined", async () => {
            const req = { session: {token: 'test'}, params: {id: 1}, file: ''};
            const res = { render: sinon.spy(), locals: {role: 0}};

            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: 'test@kainos.com'});
            sinon.stub(ApplicationController, 'checkApplicationExists').resolves(false);
            sinon.stub(ApplicationController, 'initBucket').throws(new Error('Error'));

            await ApplicationController.postUpload(req as any, res as any);
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('apply.njk')).to.be.true;
        }),
        it("should render apply-success when successful application", async () => {
            const req = { session: {token: 'test'}, params: {id: 1}, file: ''};
            const res = { render: sinon.spy(), locals: {role: 0}};
            const location = 'testlocation';
 
            sinon.stub(JWTDecode, 'jwtDecode').returns({sub: 'test@kainos.com'});
 
            sinon.stub(ApplicationController, 'checkApplicationExists').resolves(false);
            sinon.stub(ApplicationController, 'initBucket').resolves();
 
            sinon.stub(ApplicationService, 'uploadToS3').resolves(location);
            sinon.stub(ApplicationService, 'createApplication').resolves();
 
            await ApplicationController.postUpload(req as any, res as any);
 
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('apply-success.njk')).to.be.true;
 
        })

    });

})