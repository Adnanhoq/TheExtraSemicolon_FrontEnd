
import { S3 } from "aws-sdk";
import config from "../config";
import { validateFileUpload } from "../validators/FileUploadValidator";
import { randomUUID } from "crypto";


export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {

    if (!fileData) {
      throw new Error('No file data provided');
    }
    const fileContent = fileData.buffer;
    const guid = randomUUID();
    const folderData ="the_extra_semicolon/imports/" + guid + fileData.originalname;

      const params = {
        Bucket: config.BUCKET_NAME,
        Key: folderData,
        Body: fileContent,
        ContentType: fileData.mimetype
      };
        console.log(fileContent);
        await validateFileUpload(fileContent);
        
        const res = await s3.upload(params).promise();
        return res.Location;

  } catch (error) {
  const typedError = error as { message: string };
  throw new Error(`Unable to process this file: ${typedError.message }`);
  }
  }