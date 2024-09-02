import { uploadCSV } from "../services/FileUploadService";
import express from "express";
import multer from "multer";


export const postCSVUpload = async (req: express.Request, res: express.Response) => {
    try{
     
    
      console.log("file string object", req.file);
      if (req.file == null){
        console.log("File is not defined")
      }

      const upload = multer({dest: 'uploads/'});
      upload.single 

      
      //const uploadRes = await uploadCSV(req.file);
      console.log(req.file);
  
    //   if (uploadRes.success) {
    //     console.log(uploadRes.message);
    //     res.redirect('/upload-success');
    //   } else {
    //     console.log(uploadRes.message)
    //   }       
    } catch (e){
      console.log(e);
      res.render('/uploadCSV');
    }
  }