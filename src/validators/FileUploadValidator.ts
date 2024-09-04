import fs from 'fs';
import {parse} from 'csv-parse';
import { FileUpload } from '../models/FileUpload';
import { Writable } from 'stream';

export const validateFileUpload = ( file: string)=>{

    const csv = file;
    const headers = ["roleName","description","responsibilities","linkToJobSpec","capability","band","closingDate","status","positionsAvailable","locations"];
    //const fileContent = file.buffer.toString();
    //const fileStream = file.stream;
    const fileStream = fs.createReadStream(file);

    // parse (fileContent, {
    //     delimiter: ',',
    //     columns: headers,
    
    // }, (error, result: FileUpload[])=>{
    //     if (error) {
    //         console.error("Issue parsing the CSV file", error);
    //         return;
    //     }

    //     result.forEach((row, index ) =>{

    //     })
    //     console.log("Result",result)
    // })

    const parser = parse({
        delimiter: ',',
        columns: headers,
        skip_empty_lines: true
    });

    const rowProcessor = new Writable({
        objectMode: true,
        write(row, encoding, callback) {
            // Process each row here
            console.log("Row:", row);

            // After processing the row, call the callback to continue the stream
            callback();
        }
    });

    // Pipe the file stream to the parser, then to the row processor
    fileStream
        .pipe(parser)
        .pipe(rowProcessor)
        .on('finish', () => {
            console.log("File processing complete.");
        })
        .on('error', (error) => {
            console.error("Error processing the file:", error);
        });
}