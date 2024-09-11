import { S3 } from 'aws-sdk';
import express from "express";
import { uploadToS3 } from '../services/FileUploadService'
import config from "../config";
import multer from 'multer';
import { validateFileUpload } from '../validators/FileUploadValidator';
import axios, { AxiosResponse } from 'axios';


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  const files = req.files as Express.Multer.File[];
  const locations: string[] = [];
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
          try{
            const location = await uploadToS3(s3, file);
            locations.push(location);
            console.log("File uploaded succesfully to: ", location)       
          } catch (error) {
            console.log("Upload failed:", error.message)
            throw new Error
          }
        }
        console.log(locations);
        res.render('uploadSuccess.njk',{locations: locations});

      } catch (error) {
        console.log(error);
        res.render('/csvFileUpload.njk', {errormessage: error.message})
      }
    }

  } catch (e) {
    console.log(e);
    res.render('/upload');
  }
}

