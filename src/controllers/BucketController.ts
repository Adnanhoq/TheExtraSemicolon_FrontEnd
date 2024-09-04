import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, createApplication, uploadToS3 } from '../services/BucketService'
import config from "../config";
import  multer from 'multer';
import { Application } from 'aws-sdk/clients/workspaces';

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
    
        // Bucket initilization
        await initBucket(s3);

        console.log(req.body.name)

        if (req.file == null){
          console.log("File is not defined")
        }

        const upload = multer({dest: 'uploads/'});
        upload.single 
        //console.log("hereeeeeeeee" + req.session)
        const uploadResult = await uploadToS3(s3, (req.file as Express.Multer.File));
        
        //console.log(req.file);
        if (uploadResult.success) {
          // Create application object here

          let ApplicationReq = { // Test application object - this works
            email: "user@kainos.com", // Need to extract from session jwt token
            roleId: 15, // Needs to come from zohaibs roleId which is currently in testing
            s3Link: uploadResult.data,
          }

          await createApplication(ApplicationReq);

          console.log(uploadResult.message);
          res.redirect('/upload-success');
        } else {
          console.log(uploadResult.message)
        }       
      } catch (e){
        console.log(e);
        res.render('/upload');
      }
    }
    