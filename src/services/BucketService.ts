import { S3 } from "aws-sdk";
import fs from "fs";
import config from "../config";
import multer from "multer";
import aws from "aws-sdk";

/**
 * Checks if an S3 bucket exists.
 * 
 - @name checkBucket
 - @param {S3} s3 - An instance of AWS S3 client.
 - @param {string} bucket - The name of the S3 bucket to check.
 - @returns {Promise<{success: boolean; message: string; data: object;}>} The result of the check operation.
 */

export const checkBucket = async (s3: S3, bucket:string ) => {
    try{
        const res = await s3.headBucket({Bucket:bucket}).promise()

        console.log("Bucket already exists", res.$response.data);

        return {success: true, message: "Bucket already exists", data: {}};
    } catch (error) {
        console.log("Error bucket don't exist", error);

        return {success: false, message: "Error! Bucket does not exist", data: error}
        
    }
};
/**
    @name uploadToS3
    @param {S3} s3
    @param {File} fileData
    @returns {Promise<{success: boolean; message: string; data: object | string;}>} The result of the upload operation.
 */
  export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    //const fileContent = fs.readFileSync(fileData!.path);
    if (!fileData) {
      throw new Error('No file data provided');
    }
    const fileContent = fileData.buffer;

      const params = {
        Bucket: config.BUCKET_NAME,
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




