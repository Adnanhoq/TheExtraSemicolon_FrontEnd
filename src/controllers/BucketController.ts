import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, uploadToS3 } from '../services/BucketService'
import config from "../config";

/**

- @name initBucket
- @returns {void}
*/
  export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, config.BUCKET_NAME);

  if( !bucketStatus.success ) { // check if the bucket don't exist
    console.log("Bucket does not exist");
    }
}

    export const Upload = async (req: express.Request, res: express.Response) => {
      try{
        const s3 = new S3({
          accessKeyId: config.AWS_ACCESS_KEY_ID,
          secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
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
        res.redirect('/apply-successful')
      } catch (e){
        console.log(e);
        res.render('/upload');

      }
    
        
    
    }
    