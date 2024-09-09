import { assert, expect } from "chai";
import { validateApplicationObject } from "../../../src/validators/ApplicationValidator";

describe('Application Validator', function(){
    describe('Testing validateApplicationObject ', function(){
        it("should throw 'RoleID cannot be less than 1' error", () => {
            let ApplicationReq = { 
                email: "testemail", 
                roleId: 0,
                s3Link: "s3link",
            }

            try {
                validateApplicationObject(ApplicationReq);
            } catch (e) {
                expect(e.message).to.equal("RoleID cannot be less than 1");
            }
        
        })

        it("should throw 'Email does not exist' error", () => {
            let ApplicationReq = { 
                email: "",
                roleId: 1,
                s3Link: "s3link",
            }

            try {
                validateApplicationObject(ApplicationReq);
            } catch (e) {
                expect(e.message).to.equal("Email does not exist");
            }

        })

        it("should throw 'S3 Link does not exist' error", () => {
            let ApplicationReq = { 
                email: "testemail",
                roleId: 1,
                s3Link: "",
            }

            try {
                validateApplicationObject(ApplicationReq);
            } catch (e) {
                expect(e.message).to.equal("S3 Link does not exist");
            }
        })
    })
})