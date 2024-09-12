export type Config = {
    API_URL: string | undefined,
    AWS_ACCESS_KEY_ID: string | undefined,
    AWS_SECRET_ACCESS_KEY: string | undefined,
    BUCKET_NAME: string | undefined
    BUCKET_URL: string
   }
   
   export const config: Config  = {
       API_URL: process.env.API_URL,
       AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
       AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
       BUCKET_NAME: process.env.S3_BUCKET,
       BUCKET_URL: "the_extra_semicolon/"
   }

export default config
// export interface Config {

//     API_URL: string
//    }
   
//    export const config: Config  = {
//        API_URL: process.env.API_URL ?? '',

//    };
   
//    export default config
