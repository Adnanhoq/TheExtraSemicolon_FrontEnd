import { S3 } from 'aws-sdk';
import express from "express";
import { uploadToS3 } from '../services/FileUploadService'
import config from "../config";


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  const files = req.files as Express.Multer.File[];
  const locations: string[] = [];
  

    const s3 = new S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });


    
      try {
        if (!files || files.length === 0) {
          // return res.status(400).send("No files uploaded");
          throw new Error("No file found");
        }
        for (const file of files) {
          try {
            const location = await uploadToS3(s3, file);
            locations.push(location);
          } catch (error) {
            const typedError = error as {message: string, originalname?: string }
            throw new Error(`Failed to upload file:${file.originalname} due to ${typedError.message}`);
          }
        }
        res.render('uploadSuccess.njk', { locations: locations });

      } catch (error) {
        const typedError = error as { message: string };
        res.render('csvFileUpload.njk', { errormessage: typedError.message });
      }
    
}

