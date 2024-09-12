import { createRequest, createResponse } from 'node-mocks-http';
import * as ApplicationController from "../../../src/controllers/ApplicationController"
import { expect } from 'chai';
import sinon from 'sinon';
import * as ApplicationService from  '../../../src/services/ApplicationService';
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
        
        it('should return true as bucket exists', async () => { // Needs token but unsure how to pass it in
            const s3 = undefined;

            sinon.stub(ApplicationService, 'checkBucketExists').resolves(true);
        
            const res = await ApplicationController.initBucket(s3 as any);

            expect(res.success).to.be.true;
            expect(res.message).to.equal("Bucket exists");
        }),

        it('should return false as bucket does not exist', async () => { // Needs token but unsure how to pass it in
            const s3 = undefined;

            sinon.stub(ApplicationService, 'checkBucketExists').resolves(false);
        
            const res = await ApplicationController.initBucket(s3 as any);

            expect(res.success).to.be.false;
            expect(res.message).to.equal("Bucket does not exist");
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

    });

})