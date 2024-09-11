import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucket, createApplication, getApplicationById, uploadToS3 } from '../services/ApplicationService'
import config from "../config";
import  multer from 'multer';
import { JwtToken } from '../models/JwtToken';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

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
    res.render('apply.njk', {id: req.params.id, token: req.session.token});
    console.log(req);
  }

  export const checkApplicationDoesNotExist = async (id: number, email: string, token: string) => {
    // This checks to see if an application for this role from this email exists
    // If this doesn't return a 404 error, an error is thrown
    try {
      await getApplicationById(id, email, token);
      throw new Error('Application Exists');
    } catch(e) {
      if (!(axios.isAxiosError(e) && e.response && e.response.status == 404))
      {
        throw new Error(e.message as string);
      }

    }
  }

    export const postUpload = async (req: express.Request, res: express.Response) => {
      try{
        const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
        await checkApplicationDoesNotExist(Number(req.params.id),decodedToken.sub, req.session.token ?? '');
        const s3 = new S3({
          accessKeyId: config.AWS_ACCESS_KEY_ID,
          secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        });
    
        // Bucket initilization - I know I spelt it wrong
        await initBucket(s3);


        if (req.file == null){
          throw new Error('Invalid File Type Uploaded');
        }

        const upload = multer({dest: 'uploads/'});
        upload.single
        const uploadResult = await uploadToS3(s3, (req.file as Express.Multer.File));        
        if (uploadResult.success) {

          const ApplicationReq = { 
            email: decodedToken.sub, 
            roleId: Number(req.params.id),
            s3Link: uploadResult.data,
          }
          await createApplication(ApplicationReq, req.session.token ?? '');

          console.log(uploadResult.message);
          res.render('apply-success.njk');
        } else {
          console.log(uploadResult.message)
        }       
      } catch (e){
        console.log(e);
        res.locals.errormessage = e.message;
        res.render('apply.njk', {id: req.params.id});
      }
    }
    