import fs from 'fs';
import { parse } from 'csv-parse';

import { Writable } from 'stream';

export const validateFileUpload = (file: Buffer): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        //const csv = file;
        const headers = ["roleName", "description", "responsibilities", "linkToJobSpec", "capability", "band", "closingDate", "status", "positionsAvailable", "locations"];

      //  const fileStream = fs.createReadStream(file);

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
                if (!row.responsibilities) rowErrors.push(`Row ${rowCount}: 'responsibilities' is required`);
                if (!row.linkToJobSpec) rowErrors.push(`Row ${rowCount}: 'link to job role' is required`); //validate the link itself
                if (!row.capability) rowErrors.push(`Row ${rowCount}: 'capability' is required`); //validate against list of capabilities in the enum
                if (!row.band) rowErrors.push(`Row ${rowCount}: 'band' is required`);
                if (row.band && isNaN(parseInt(row.band))) {
                    rowErrors.push(`Row ${rowCount}: 'band' must be a number`);

                    //need validation for locations, positios avaible and status
                }
                // if (row.positionsAvailable && isNaN(parseInt(row.positionsAvailable))) {
                //     rowErrors.push(`Row ${rowCount}: 'positionsAvailable' must be a number`);
                // }
                if (!row.closingDate) rowErrors.push(`Row ${rowCount}: 'closing date' is required`);

                if (rowErrors.length > 0) {
                    validationErrors.push(...rowErrors);
                }
                console.log("Row:", row);
                callback();
            }
        });

        parser.write(file);
        parser.end();

        parser
            .pipe(parser)
            .pipe(rowProcessor)
            .on('finish', () => {
                if (validationErrors.length > 0) {
                    // reject(validationErrors); 
                    reject( new Error (`Validation errors found in your file: ${validationErrors.join(', ')}`))
                } else {
                    resolve([])
                }

                console.log("File processing complete.");
            })
            .on('error', (error) => {
                reject( new Error ("Error processing the file"));
                //console.error("Error processing the file:", error);
            });
    });
}