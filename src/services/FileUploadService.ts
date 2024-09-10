import axios, { AxiosResponse } from "axios";
import multer from "multer";
import express from "express";
import { S3 } from "aws-sdk";
import fs from 'fs';

import config from "../config";
import { validateFileUpload } from "../validators/FileUploadValidator";
import { error } from "console";
import { randomUUID } from "crypto";


export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {

    if (!fileData) {
      throw new Error('No file data provided');
    }
    const filePath = fileData.path;
    const fileContent = fs.readFileSync(filePath);
    const guid = randomUUID();
    const folderData = "the_extra_semicolon/imports/"+ guid + fileData!.originalname;
    console.log(folderData);


      const params = {
        Bucket: config.BUCKET_NAME || 'academy-job-portal-cvs',
        Key: folderData,
        Body: fileContent,
        ContentType: fileData.mimetype
      };
      
      try {
        const validationErrors = await validateFileUpload(filePath);

        if (validationErrors.length > 0) {
          console.log("Validation errors found:", validationErrors);
          return {success: false, message: "Validation failed.", data: error}
        }

        const res = await s3.upload(params).promise();
        

        return {success: true, message: "File Uploaded with Successful", data: res.Location};
      } catch (error) {
        console.log(error);
        return {success: false, message: "Unable to Upload the file", data: error};
      }

  } catch (error) {
  console.log(error);
  return {success:false, message: "Unable to access this file", data: {}};
  }
  }