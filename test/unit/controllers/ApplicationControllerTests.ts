import { createRequest, createResponse } from 'node-mocks-http';

describe('Application Controller', function() {
    describe('getUploadForm', function() {
        const httpMocks = require('node-mocks-http');
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/apply.njk',
            params: {
                id: 42
            }
        });
    
        const response = httpMocks.createResponse();

        
    

    }) 
})