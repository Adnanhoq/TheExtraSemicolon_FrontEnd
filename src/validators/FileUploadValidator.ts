import { parse } from 'csv-parse';

import { Writable } from 'stream';
import { Capability } from '../enums/Capability';
import { Location } from '../enums/Location';

export const validateFileUpload = (file: Buffer): Promise<string[]> => {

    function isCapability(value: string): value is Capability {
        return Object.values(Capability).includes(value as Capability);
    }
    function isLocation(value: string): value is Location {
        return Object.values(Location).includes(value as Location);
    }
    function isValidDate(dateString: string): boolean {
        console.log(dateString);
        const regex = /^\d{4}\-\d{2}\-\d{2}$/;
        return regex.test(dateString);

    }

    return new Promise((resolve, reject) => {
        const headers = ["roleName", "description", "responsibilities", "linkToJobSpec", "capability", "band", "closingDate", "status", "positionsAvailable", "locations"];

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

                const urlRegex = new RegExp(/^(https:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/) //regex for validating the url

                if (!row.roleName) rowErrors.push(`Row ${rowCount}: 'roleName' is required`);
                if (!row.description) rowErrors.push(`Row ${rowCount}: 'description' is required`);

                if (!row.responsibilities) rowErrors.push(`Row ${rowCount}: 'responsibilities' is required`);
                if (!row.linkToJobSpec) {
                    rowErrors.push(`Row ${rowCount}: 'link to job role' is required`)
                } else if (!urlRegex.test(row.linkToJobSpec)) {
                    rowErrors.push(`Row ${rowCount}: 'link to job role' is not a valid HTTPS URL`);
                }

                if (!row.capability) { rowErrors.push(`Row ${rowCount}: 'capability' is required`) }
                else if (!isCapability(row.capability)) rowErrors.push(`Row ${rowCount}: Invalid 'capability`);

                if (!row.band) {
                    rowErrors.push(`Row ${rowCount}: 'band' is required`);
                } else if (row.band && isNaN(parseInt(row.band))) {
                    rowErrors.push(`Row ${rowCount}: 'band' must be a number`);
                } else if (row.band < 0 || row.band > 7) {
                    rowErrors.push(`Row ${rowCount}: 'band' number out of bounds`);
                }
                if (!row.closingDate) {
                    rowErrors.push(`Row ${rowCount}: 'closing date' is required`);
                }
                else if (!isValidDate(row.closingDate)) {
                    rowErrors.push(`Row ${rowCount}: 'closing date' is an invalid date`);
                }

                if (!row.status) {
                    rowErrors.push(`Row ${rowCount}: 'status' is required`)
                } else if (row.status && isNaN(parseInt(row.status))) {
                    rowErrors.push(`Row ${rowCount}: 'status' must be a number`);
                }

                if (row.positionsAvailable && isNaN(parseInt(row.positionsAvailable))) {
                    rowErrors.push(`Row ${rowCount}: 'positionsAvailable' must be a number`);
                }

                if (!row.locations) {
                    rowErrors.push(`Row ${rowCount}: 'locations' is required`)
                } else if (!isLocation(row.locations)) {
                    rowErrors.push(`Row ${rowCount}: Invalid 'location`)
                };

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
                    reject(new Error(`Validation errors found in your file: ${validationErrors.join(', ')}`))
                } else {
                    resolve([])
                }

                console.log("File processing complete.");
            })
            .on('error', (error) => {
                reject(new Error("Error processing the file"));
            });
    });
}