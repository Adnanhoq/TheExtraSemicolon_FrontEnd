
export type Config = {
    API_URL: string,
    aws_access_key_id: string,
    aws_secret_access_key: string,
    bucket_name: string
   }
   
   export const config: Config  = {
       API_URL: process.env.API_URL,
       aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
       aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
       bucket_name: process.env.S3_BUCKET
   };
   
   export default config
