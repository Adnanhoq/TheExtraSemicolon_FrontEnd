import axios, { AxiosResponse } from "axios";
import multer from "multer";
import express from "express";
import { S3 } from "aws-sdk";
import fs from 'fs';
import dotnev from 'dotenv';

import config from "../config";
import { validateFileUpload } from "../validators/FileUploadValidator";
import { error } from "console";
import { randomUUID } from "crypto";


export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    console.log(fileData);

    if (!fileData) {
      throw new Error('No file data provided');
    }
    const fileContent = fileData.buffer;
    const guid = randomUUID();
    const folderData ="the_extra_semicolon/imports/" + guid + fileData!.originalname;
    console.log(folderData);
    console.log(config.FOLDER);

      const params = {
        Bucket: config.BUCKET_NAME || "academy-job-portal-cvs",
        Key: folderData,
        Body: fileContent,
        ContentType: fileData.mimetype
      };
     
        await validateFileUpload(fileContent);
        
        const res = await s3.upload(params).promise();
        return res.Location;

  } catch (error) {
  console.log(error);
  throw new Error(`Unable to process this file: ${error.message}`);
  }
  }