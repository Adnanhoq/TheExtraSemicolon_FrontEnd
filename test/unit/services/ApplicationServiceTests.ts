import axios from "axios";
import sinon from 'sinon';
import { assert, expect } from 'chai';
import MockAdapter from "axios-mock-adapter";
import * as ApplicationService from  '../../../src/services/ApplicationService';
import { S3 } from "aws-sdk";
import * as Crypto from "crypto";
import { config } from "../../../src/config";
import { checkBucketExists, createApplication, getApplicationById, uploadToS3 } from "../../../src/services/ApplicationService";

let mock : MockAdapter

const URL = config.API_URL + "apply";

describe('ApplicationService', function() {
    this.beforeEach(() => {
        sinon.restore();
        mock = new MockAdapter(axios);
    })
    describe('checkBucket', function() {
        
        it('should return false success if bucket is undefined', async () => {
            const s3 = undefined;
            const bucket = undefined;

            const res = await checkBucketExists(s3 as any, bucket);

            expect(res).to.be.false;
        }),
        it('should return true if bucket already exists', async () => {
            const s3 = {headBucket : sinon.stub().returns({promise: sinon.spy()})};
            const bucket = '';
            
            const res = await checkBucketExists(s3 as any, bucket as any);
            expect(res).to.be.true;
        }),
        it('should return false success if bucket does not exist', async () => {
            const s3 = {headBucket : sinon.spy()}
            const bucket = '';

            const res = await checkBucketExists(s3 as any, bucket as any);

            expect(res).to.be.false;
        });        
    }),
    describe('uploadToS3', function() {
        it('should throw Error when file data undefined', async () => {
            const s3 = {};
            const fileData = null;

            try {
                await ApplicationService.uploadToS3(s3 as any, fileData as any);
            } catch (e) {
                expect(e.message).to.equal('Upload to S3 was unsuccessful: No file data provided');
                return;
            }
            assert.fail('Expected error message');
        }),
        it('should return with successful response when S3 and FileData configured', async () => {
            const testMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            const fileData = {originalname : "testFile", buffer: '', mimetype: testMimetype};
            config.BUCKET_NAME = '';
            const s3 = {upload: sinon.stub().returns({promise: sinon.stub().returns({})})};
            const location = 'testlocation'

            const res = await uploadToS3(s3 as any, fileData as any);
            expect(res).to.be.equal(location);
        }),
        it('should return with failed response when file fails to upload', async () => {
            const testMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            const fileData = {originalname : "testFile", buffer: '', mimetype: testMimetype};
            config.BUCKET_NAME = '';
            const s3 = {upload: sinon.stub().throws(new Error())};
            try {
                const res = await uploadToS3(s3 as any, fileData as any);
            } catch(e) {
                expect(e.message).to.equal('Upload to S3 was unsuccessful: ');
                return;
            }
            assert.fail('Expected error message');

        }),
        it('should return with failed response when Bucket Name undefined', async () => {
            const testMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            const fileData = {originalname : "testFile", buffer: '', mimetype: testMimetype};
            config.BUCKET_NAME = undefined;
            const s3 = {upload: sinon.stub().returns({})};
            
            try {
                const res = await uploadToS3(s3 as any, fileData as any);
            } catch (e) {
                expect(e.message).to.be.equal("Upload to S3 was unsuccessful: Bucket is undefined");
                return;
            }
            assert.fail("Expected an error");
        })
    }),
    describe('getApplicationById', function() {

        it('should not throw error when API returns 200', async () => {
            const token = '';
            const id = 1;
            const email = 'user@kainos.com'
    
            mock.onPost(URL+`/${id}`, email).reply(200, "Correct");
    
            try {
                await getApplicationById(id, email, token);
            } catch(e) {
                assert.fail("Expected no error message");
            }
        }),
        it('should return error when 404 received', async () => {
            const token = '';
            const id = 1;
            const email = 'user@kainos.com'
    
            mock.onPost(URL+`/${id}`, email).reply(404, "Not Found");
    
            try {
                await getApplicationById(id, email, token);
            } catch(e) {
                expect(e.status).to.equal(404);
                return
            }
            assert.fail("Expected error message");
        }),
        it('should return error when 500 received', async () => {
            const token = '';
            const id = 1;
            const email = 'user@kainos.com'
    
            mock.onPost(URL+`/${id}`, email).reply(500);
    
            try {
                await getApplicationById(id, email, token);
            } catch(e) {
                console.log(e);
                expect(e.status).to.equal(500);
                return
            }
            assert.fail("Expected error message");
        })

    }),
    describe('createApplication', function () {
        it('should return response 201 when successful application created', async () => {
            const token = '';
            let application = { 
                email: 'test', 
                roleId: 1,
                s3Link: 'testlink',
              }

            mock.onPost(URL).reply(201, {});

            try {
                await createApplication(application, token);
            } catch(e) {
                assert.fail("Expected no error message");
            }            
        })

        it('should return error of the response data when unsuccessful', async () => {
            const token = '';
            let application = { 
                email: 'test', 
                roleId: 1,
                s3Link: 'testlink',
            }
            mock.onPost(URL).reply(500, "Failed");
            try {
                await createApplication(application, token);
            } catch(e) {
                expect(e.message).to.equal("Failed");
                return
            }
            assert.fail("Expected error message");
        })
    })

})