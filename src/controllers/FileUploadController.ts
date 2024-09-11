import { S3 } from 'aws-sdk';
import express from "express";
import { uploadToS3 } from '../services/FileUploadService'
import config from "../config";
import multer from 'multer';
import { validateFileUpload } from '../validators/FileUploadValidator';
import axios, { AxiosResponse } from 'axios';


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  let uploadFileName = "";
  const files = req.files as Express.Multer.File[];
  console.log(files);

  try {

    const s3 = new S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });


    if (!files || files.length === 0) {
      console.log("No files uploaded");
      return res.status(400).send("No files uploaded");
     
    } else {
      try {
        for (const file of files) {

          const uploadRes = await uploadToS3(s3, file);

          if (uploadRes.success) {
            res.render("/upload-success")
            console.log(uploadRes.message);
            
          } else {
            console.log(uploadRes.message)
            res.render('/upload')
          }

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

