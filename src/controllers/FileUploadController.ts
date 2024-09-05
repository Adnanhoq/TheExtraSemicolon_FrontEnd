import { S3 } from 'aws-sdk';
import express from "express";
import { uploadToS3 } from '../services/FileUploadService'
import config from "../config";
import multer from 'multer';
import { validateFileUpload } from '../validators/FileUploadValidator';


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  let uploadFileName="";
  
  try {

    const s3 = new S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });

    const file = req.file;
    console.log(file);

    if (file == null) {
      console.log("File is not defined")
    } else {
      const filePath = file.path;
      try {
       
        const uploadRes = await uploadToS3(s3, file);


        if (uploadRes.success) {
          console.log(uploadRes.message);
          uploadFileName = file.fieldname;

          res.redirect('/upload-success');
        } else {
          console.log(uploadRes.message)
        }
      } catch (validationErrors) {
        console.log("Validation failed:", validationErrors);
        return res.status(400).json({ success: false, message: "Validation failed.", errors: validationErrors });
      }


    }

  } catch (e) {
    console.log(e);
    res.render('/upload');
  }
}

