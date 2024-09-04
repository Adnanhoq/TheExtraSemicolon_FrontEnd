import fs from 'fs';
import { parse } from 'csv-parse';
import { FileUpload } from '../models/FileUpload';
import { Writable } from 'stream';

export const validateFileUpload = (file: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const csv = file;
        const headers = ["roleName", "description", "responsibilities", "linkToJobSpec", "capability", "band", "closingDate", "status", "positionsAvailable", "locations"];

        const fileStream = fs.createReadStream(file);

        const parser = parse({
            delimiter: ',',
            columns: headers,
            skip_empty_lines: true
        });

        const validationErrors: string[] = [];
        let rowCount = 0;

        const rowProcessor = new Writable({
            objectMode: true,
            write(row, encoding, callback) {
                rowCount++;
                const rowErrors: string[] = [];

                if (!row.roleName) rowErrors.push(`Row ${rowCount}: 'roleName' is required`);
                if (!row.description) rowErrors.push(`Row ${rowCount}: 'description' is required`);
                if (!row.capability) rowErrors.push(`Row ${rowCount}: 'capability' is required`);
                if (row.positionsAvailable && isNaN(parseInt(row.positionsAvailable))) {
                    rowErrors.push(`Row ${rowCount}: 'positionsAvailable' must be a number`);
                }

                if (rowErrors.length > 0) {
                    validationErrors.push(...rowErrors);
                }
                console.log("Row:", row);
                callback();
            }
        });

        fileStream
            .pipe(parser)
            .pipe(rowProcessor)
            .on('finish', () => {
                if (validationErrors.length > 0) {
                    reject(validationErrors); 
                } else {
                    resolve([]); 
                }
                console.log("File processing complete.");
            })
            .on('error', (error) => {
                console.error("Error processing the file:", error);
            });
    });
}