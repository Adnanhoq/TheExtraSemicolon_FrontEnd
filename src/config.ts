import dotenv from 'dotenv';
dotenv.config();

export type Config = {
    API_URL: string | undefined,
    AWS_ACCESS_KEY_ID: string | undefined,
    AWS_SECRET_ACCESS_KEY: string | undefined,
    BUCKET_NAME: string| undefined,
    FOLDER: string | undefined
   }
   
   export const config: Config  = {
       API_URL: process.env.API_URL ,
       AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
       AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
       BUCKET_NAME: process.env.S3_BUCKET,
       FOLDER: process.env.FOLDER
   };
   
   export default config;

