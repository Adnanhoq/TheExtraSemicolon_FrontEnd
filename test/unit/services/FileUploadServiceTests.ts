import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { S3 } from 'aws-sdk';
import { uploadToS3 } from "../../../src/services/FileUploadService";

describe('uploadToS3', () => {
  let s3Stub;
  let readFileSyncStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if no file data is provided', async () => {
    try {
      await uploadToS3(new S3());
    } catch (error) {
      expect(error.message).to.equal('Unable to process this file: No file data provided');
    }
  });

});