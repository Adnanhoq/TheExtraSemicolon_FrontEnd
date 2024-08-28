import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, uploadToS3 } from '../services/BucketService'
import config from "../config";

/**

- @name initBucket
- @returns {void}
*/
  export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, config.bucket_name);

  if( !bucketStatus.success ) { // check if the bucket don't exist
    console.log("Bucket does not exist");
    }
}

    export const Upload = async (req: express.Request, res: express.Request) => {
    
        const s3 = new S3({
          accessKeyId: config.aws_access_key_id,
          secretAccessKey: config.aws_secret_access_key,
        });
    
        // Initialize bucket
        await initBucket(s3);
    
    
        console.log("file string object", req.file)
    
        const uplaodRes = await uploadToS3(s3, req.file);
    
        if (uplaodRes.success) {
          console.log(uplaodRes.message)
        } else {
          console.log(uplaodRes.message)
        }
    
    }
    