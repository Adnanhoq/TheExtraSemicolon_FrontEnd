export type Config = {
    API_URL: string,
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    BUCKET_NAME: string
   }
   
   export const config: Config  = {
       API_URL: process.env.API_URL,
       AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
       AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
       BUCKET_NAME: process.env.S3_BUCKET
   };
   
   export default config;

