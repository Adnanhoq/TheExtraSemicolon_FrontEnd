import { createRequest, createResponse } from 'node-mocks-http';
import { getUploadForm, initBucket } from "../../../src/controllers/ApplicationController"
import { expect } from 'chai';

describe('Application Controller', function() {
    describe('initBucket', function() {
        
        it('should return true as bucket exists', async () => { // Needs token but unsure how to pass it in
            const s3 = undefined;
        
            const res = await initBucket(s3 as any);

            expect(res.success).to.be.true;
            expect(res.message).to.equal("Bucket exists");
        }),

        it('should return false as bucket does not exist', async () => { // Needs token but unsure how to pass it in
            const s3 = undefined;
        
            const res = await initBucket(s3 as any);

            expect(res.success).to.be.false;
            expect(res.message).to.equal("Bucket does not exist");
        })

    }),
    // describe('getUploadForm', function() {
    //     it('should return no error', async () => {
    //         try {
    //             await getUploadForm(placegolder);
    //         } catch (e) {
    //             assert.fail("Expected no error message")
    //         }


    //     })
    

    })

})