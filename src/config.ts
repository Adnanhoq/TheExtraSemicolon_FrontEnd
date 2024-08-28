
export type Config = {
    API_URL: string
   }
   
   export const config: Config  = {
       API_URL: process.env.API_URL,
   };
   
   export default config