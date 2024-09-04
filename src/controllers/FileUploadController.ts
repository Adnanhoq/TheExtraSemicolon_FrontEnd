import { S3 } from 'aws-sdk';
import express from "express";
import {uploadToS3 } from '../services/FileUploadService'
import config from "../config";
import  multer from 'multer';
import { validateFileUpload } from '../validators/FileUploadValidator';


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  try{
    const s3 = new S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });
    console.log(req);
    console.log("Received file:", req.file);

  
    console.log("file string object", req.file);
    if (req.file == null){
      console.log("File is not defined")
    } else {
      console.log(req.file);
      validateFileUpload(req.file);

      const uploadRes = await uploadToS3(s3, req.file);
      

      if (uploadRes.success) {
        console.log(uploadRes.message);
        res.redirect('/upload-success');
      } else {
      console.log(uploadRes.message)
      } 
    }

    // const upload = multer({dest: 'uploads/'});
    // upload.single 
    

    
          
  } catch (e){
    console.log(e);
    res.render('/upload');
  }
}

