import axios, { AxiosResponse } from "axios";
import multer from "multer";
import express from "express";
import { S3 } from "aws-sdk";
import fs from 'fs';

import config from "../config";



// export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
//     try {
//       //const fileContent = fs.readFileSync(fileData!.path);
//       if (!fileData) {
//         throw new Error('No file data provided');
//       }
//       const fileContent = fileData.buffer;
//      // console.log(fileContent);
//       //console.log(fileContent.toString());
  
//         const params = {
//           Bucket: config.BUCKET_NAME || 'academy-job-portal-cvs',
//           Key: fileData!.originalname,
//           Body: fileContent,
//           ContentType: fileData.mimetype
//         };
  
//         try {
//           const res = await s3.upload(params).promise();
  
//           console.log("File Uploaded Successfully", res.Location);
  
//           return {success: true, message: "File Uploaded with Successful", data: res.Location};
//         } catch (error) {
//           return {success: false, message: "Unable to Upload the file", data: error};
//         }
  
//     } catch (error) {
//     console.log(error);
//     return {success:false, message: "Unable to access this file", data: {}};
//     }
//     }

export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    //const fileContent = fs.readFileSync(fileData!.path);
    if (!fileData) {
      throw new Error('No file data provided');
    }
    const filePath = fileData.path;
    const fileContent = fs.readFileSync(filePath);
    //const fileContent = fileData.buffer;
   // console.log(fileContent);
    //console.log(fileContent.toString());

      const params = {
        Bucket: config.BUCKET_NAME || 'academy-job-portal-cvs',
        Key: fileData!.originalname,
        Body: fileContent,
        ContentType: fileData.mimetype
      };

      try {
        const res = await s3.upload(params).promise();

        console.log("File Uploaded Successfully", res.Location);

        return {success: true, message: "File Uploaded with Successful", data: res.Location};
      } catch (error) {
        return {success: false, message: "Unable to Upload the file", data: error};
      }

  } catch (error) {
  console.log(error);
  return {success:false, message: "Unable to access this file", data: {}};
  }
  }