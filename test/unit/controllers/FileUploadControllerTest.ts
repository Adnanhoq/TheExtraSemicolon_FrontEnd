import { Readable } from "stream";
import * as FileUploadController from "../../../src/controllers/FileUploadController";
import * as FileUploadService from "../../../src/services/FileUploadService";
import express from "express";
import sinon from 'sinon';
import { expect } from "chai";


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


describe('postCSVUpload', function () {

    let uploadToS3Stub: sinon.SinonStub;

    beforeEach(() => {
      uploadToS3Stub = sinon.stub(FileUploadService, 'uploadToS3');
    });
  
    afterEach(() => {
      uploadToS3Stub.restore();
      sinon.restore();
    });

    it('should render view with a succesful message', async ()=> {
        uploadToS3Stub.resolves('Location');

        const req = {files: [mockfile]};
        const res = { render: sinon.spy() };


        await FileUploadController.postCSVUpload(req as any, res as any);
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('uploadSuccess.njk')).to.be.true;
       
    })

    it('should render view with failed to upload file', async ()=> {
        const errorMessage: string = 'Error message';
        const expected: string = `Failed to upload file:${mockfile.originalname} due to ${errorMessage}`
        uploadToS3Stub.rejects(new Error(errorMessage));

        const req = {files: [mockfile]};
        const res = { render: sinon.spy() };


        await FileUploadController.postCSVUpload(req as any, res as any);
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('csvFileUpload.njk', { errormessage: expected })).to.be.true;
       
    })

    it('should render a view with no file found', async ()=> { 
        const expected: string = `No file found`;

        const req = {files:[] };
        const res = { render: sinon.spy() };


        await FileUploadController.postCSVUpload(req as any, res as any);
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('csvFileUpload.njk', { errormessage: expected })).to.be.true;
       
    })

})