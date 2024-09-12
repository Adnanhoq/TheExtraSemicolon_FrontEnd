import { Readable } from "stream";
import * as FileUploadController from "../../../src/controllers/FileUploadController";
import * as FileUploadService from "../../../src/services/FileUploadService";
import * as FileUploadValidator from "../../../src/validators/"
import express from "express";
import sinon from 'sinon';
import { expect } from "chai";
import { S3 } from "aws-sdk";
import { validateFileUpload } from "../../../src/validators/FileUploadValidator";


const mockfile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test.csv',
    encoding: '7bit',
    mimetype: 'text/csv',
    size: 1024,
    destination: 'uploads/',
    filename: 'test.csv',
    path: 'uploads/test.csv',
    buffer: Buffer.from('mock file content'),
    stream: new Readable(),

};


describe('uploadToS3', function () {

    let s3: S3;
    let uploadStub: sinon.SinonStub;
    let validateFileUploadStub: sinon.SinonStub;
  
    beforeEach(() => {
      s3 = new S3();
      uploadStub = sinon.stub(s3, 'upload').returns({
        promise: () => Promise.resolve({ Location: 'mock-location' }),
      } as any);
      validateFileUploadStub = sinon.stub(validateFileUpload).resolves(Promise.resolve());
    });
  
    afterEach(() => {
      uploadStub.restore();
    });
  
    it('should upload file to S3 and return the location', async () => {
      const result = await FileUploadService.uploadToS3(s3, mockfile);
      expect(result).to.equal('mock-location');

      expect(uploadStub.calledOnce).to.be.true;
    });
  
    it('should throw an error if no file data is provided', async () => {
      try {
        await FileUploadService.uploadToS3(s3);
      } catch (error) {
        expect(error.message).to.equal('No file data provided');
      }
    });
  
    it('should throw an error if S3 upload fails', async () => {

      uploadStub.returns({
        promise: () => Promise.reject(new Error('S3 upload failed')),
      } as any);
  
      try {
        await FileUploadService.uploadToS3(s3, mockfile);
      } catch (error) {
        expect(error.message).to.equal('Unable to process this file: S3 upload failed');
      }
    });
  });
