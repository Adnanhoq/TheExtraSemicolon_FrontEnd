import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, uploadToS3 } from '../services/BucketService'
import config from "../config";
import { blob } from 'stream/consumers';
import  multer from 'multer';

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

    export const postUpload = async (req: express.Request, res: express.Response) => {
      try{
        const s3 = new S3({
          accessKeyId: config.AWS_ACCESS_KEY_ID,
          secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        });
    
        // Initialize bucket
        await initBucket(s3);
    
      
        console.log("file string object", req.file);
        console.log(req.file.filename);
        if (req.file == null){
          console.log("File is not defined")
        }

        const upload = multer({dest: 'uploads/'});
        upload.single 

        
        const uploadRes = await uploadToS3(s3, req.file);
        console.log(req.file);
    
        if (uploadRes.success) {
          console.log(uploadRes.message);
          res.redirect('/apply-succesful');
        } else {
          console.log(uploadRes.message)
        }       
      } catch (e){
        console.log(e);
        res.render('/upload');
      }
    }
    