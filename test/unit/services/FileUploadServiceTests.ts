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

  it('should return error if no file data is provided', async () => {
    const result = await uploadToS3(new S3());

    expect(result.success).to.be.false;
    expect(result.message).to.equal('No file data provided');
  });

});