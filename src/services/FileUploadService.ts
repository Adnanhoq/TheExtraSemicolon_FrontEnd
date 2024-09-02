import axios, { AxiosResponse } from "axios";
import multer from "multer";
import express from "express";




export const uploadCSV = async (fileData?: Express.Multer.File) => {
    try{
        if (!fileData) {
            throw new Error('No file data provided');
          }
          console.log(fileData.filename);
          //const response: AxiosResponse = await axios.post("http://localhost:8080/api/csvUpload", fileData) //This url does not exist at the minute - just a placeholder
          //return response.data;

    } catch (error) {
    console.log(error);
    return {success:false, message: "Unable to access this file", data: {}};    
    }
}
