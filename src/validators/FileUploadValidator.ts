import fs from 'fs';
import {parse} from 'csv-parse';
import { FileUpload } from '../models/FileUpload';

export const validateFileUpload = ( file: Express.Multer.File)=>{

    const csv = file;
    const headers = ["roleName","description","responsibilities","linkToJobSpec","capability","band","closingDate","status","positionsAvailable","locations"];
    const fileContent = file.buffer.toString();

    parse (fileContent, {
        delimiter: ',',
        columns: headers,
    
    }, (error, result: FileUpload[])=>{
        if (error) {
            console.error(error);
        }
        console.log("Result",result)
    })
}