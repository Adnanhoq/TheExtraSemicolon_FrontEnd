import { S3 } from "aws-sdk";
import config from "../config";
import axios, { AxiosResponse } from "axios";
import { Application } from "../models/application";
import { randomUUID } from "crypto";
import { validateApplicationObject } from "../validators/ApplicationValidator";
import { getHeader } from "./AuthUtil";

/**
 * Checks if an S3 bucket exists.
 * 
 - @name checkBucket
 - @param {S3} s3 - An instance of AWS S3 client.
 - @param {string} bucket - The name of the S3 bucket to check.
 - @returns {Promise<{success: boolean; message: string; data: object;}>} The result of the check operation.
 */

export const checkBucket = async (s3: S3, bucket:string | undefined) => { // This may not be needed as bucket will always exist
    try{
      if (bucket == undefined) 
      {
        console.log("Error, bucket is undefined")
        return false;
      }
        const res = await s3.headBucket({Bucket:bucket}).promise()
        return true;
    } catch (error) {
        console.log("Error bucket doesn't exist", error);
        return false;        
    }
};
/**
    @name uploadToS3
    @param {S3} s3
    @param {File} fileData
    @returns {Promise<{success: boolean; message: string; data: object | string;}>} The result of the upload operation.
 */
  export const uploadToS3 = async (s3: S3, fileData: Express.Multer.File) => {
  try {
    if (!fileData) {
      throw new Error('No file data provided');
    }
    if (config.BUCKET_NAME == undefined)
    {
      console.log("Error, bucket is undefined")
      return {success: false, message: "Error, bucket is undefined"}
    }
    const fileContent = fileData.buffer;
    const guid = randomUUID();
    const folderData = "the_extra_semicolon/" + guid + fileData!.originalname
      const params = {
        Bucket: config.BUCKET_NAME ?? '',
        Key: folderData,
        Body: fileContent,
        ContentType: fileData.mimetype
      };
      const res = await s3.upload(params).promise();
      return {success: true, message: "File Uploaded with Successful", data: res.Location};

  } catch (error) {
  console.log(error);
  return {success: false, message: "Unable to Upload the file", data: error};
}
  }

  export const getApplicationById = async (id: number, email: string, token: string) => {
    const response: AxiosResponse = await axios.post(config.API_URL+`apply/${id}`, email, getHeader(token));
    return response.data;

  }

  export const createApplication = async (application: Application, token: string): Promise<void> => {
    try {
        validateApplicationObject(application);
        const response: AxiosResponse = await axios.post(config.API_URL+"apply", application, getHeader(token)); 
        return response.data;
    } catch (e) {
        throw new Error(e.response.data);
    }

    
}




