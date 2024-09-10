import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { S3 } from "aws-sdk";

let mock : MockAdapter
describe('Application Service', function() {
    this.beforeEach(() => {
        mock = new MockAdapter(axios);
    })


    
    describe('checkBucket Function Testing', function() {
        /**
         * Checks if an S3 bucket exists.
         * 
         - @name checkBucket
        - @param {S3} s3 - An instance of AWS S3 client.
        - @param {string} bucket - The name of the S3 bucket to check.
        - @returns {Promise<{success: boolean; message: string; data: object;}>} The result of the check operation.
        */
        const res = await s3.headBucket({Bucket:bucket}).promise()
    })

})