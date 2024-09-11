import { S3 } from 'aws-sdk';
import express from "express";
import { uploadToS3 } from '../services/FileUploadService'
import config from "../config";


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
  const files = req.files as Express.Multer.File[];
  const locations: string[] = [];
  try {

    const s3 = new S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });


    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded");
    } else {
      try {
        for (const file of files) {
          try {
            const location = await uploadToS3(s3, file);
            locations.push(location);
          } catch (error) {
            throw new Error(`Failed to upload file:${file.originalname} due to ${error.message}`);
          }
        }
        res.render('uploadSuccess.njk', { locations: locations });

      } catch (error) {
        res.render('csvFileUpload.njk', { errormessage: error.message })
      }
    }

  } catch (e) {
    res.locals.errormessage = (e as Error).message;
    res.render('errorPage.njk', { error: e as Error, token: req.session.token });
  }
}

