import { S3 } from 'aws-sdk';
import express from "express";
import {checkBucketExists, createApplication, getApplicationById, uploadToS3 } from '../services/ApplicationService'
import config from "../config";
import { JwtToken } from '../models/JwtToken';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { Application } from '../models/application';

/**

- @name initBucket
- @returns {void}
*/
  export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucketExists(s3, config.BUCKET_NAME);

    if( !bucketStatus ) {
      throw new Error("Bucket does not exist")
      }
}

  export const getUploadForm = async (req: express.Request, res: express.Response) => {
    await res.render('apply.njk', {id: req.params.id});
  }

  export const checkApplicationExists = async (id: number, email: string, token: string) => {
    // This checks to see if an application for this role from this email exists
    // If this doesn't return a 404 error, an error is thrown
    try {
      await getApplicationById(id, email, token);
      return true;
    } catch(e) {
      if (axios.isAxiosError(e) && e.response && e.response.status == 404)
      {
        return false;
      }
      throw new Error(e.message);
    }
  }

    export const postUpload = async (req: express.Request, res: express.Response) => {

      if (req.file == null){
        throw new Error('Invalid File Type Uploaded');
      }

      try{
        const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
        const applicationExists = await checkApplicationExists(Number(req.params.id),decodedToken.sub, req.session.token ?? '');
        if (applicationExists) {
          throw new Error('Application Exists');
        }
        const s3 = new S3({
          accessKeyId: config.AWS_ACCESS_KEY_ID,
          secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        });
        
        await initBucket(s3);

        const uploadLocation = await uploadToS3(s3, (req.file as Express.Multer.File));        
        if (uploadLocation) {

          const ApplicationReq : Application = { 
            email: decodedToken.sub, 
            roleId: Number(req.params.id),
            s3Link: uploadLocation,
          }
          await createApplication(ApplicationReq, req.session.token ?? '');
          res.render('apply-success.njk');
        }
      } catch (e){
        console.log(e);
        res.render('apply.njk', {id: req.params.id});
      }
    }
    