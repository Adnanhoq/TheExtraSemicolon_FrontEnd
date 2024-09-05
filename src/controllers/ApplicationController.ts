import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, createApplication, uploadToS3 } from '../services/ApplicationService'
import config from "../config";
import  multer from 'multer';
import { JwtToken } from '../models/JwtToken';
import { jwtDecode } from 'jwt-decode';

/**

- @name initBucket
- @returns {void}
*/
  export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, config.BUCKET_NAME);

  if( !bucketStatus.success ) { // Check the bucket's existance
    console.log("Bucket does not exist");
    }
}

  export const getUploadForm = async (req: express.Request, res: express.Response) => {
    res.render('apply.njk', {id: req.params.id});
  }

    export const postUpload = async (req: express.Request, res: express.Response) => {
      try{
        const s3 = new S3({
          accessKeyId: config.AWS_ACCESS_KEY_ID,
          secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        });
    
        // Bucket initilization - I know I spelt it wrong
        await initBucket(s3);


        if (req.file == null){
          throw new Error('File is not defined');
        }

        const upload = multer({dest: 'uploads/'});
        upload.single 
        const uploadResult = await uploadToS3(s3, (req.file as Express.Multer.File));
        
        if (uploadResult.success) {
          const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
          let ApplicationReq = { // Test application object - this works
            email: decodedToken.sub, 
            roleId: Number('req.params.id'),
          }

          await createApplication(ApplicationReq);

          console.log(uploadResult.message);
          res.redirect('/upload-success');
        } else {
          console.log(uploadResult.message)
        }       
      } catch (e){
        console.log(e);
        res.locals.errormessage = e.message;
        res.render('apply.njk', {id: req.params.id});
      }
    }
    