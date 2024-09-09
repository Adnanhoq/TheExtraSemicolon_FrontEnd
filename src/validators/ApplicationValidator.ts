import { Application } from "../models/application";

export const validateApplicationObject = (application : Application) => {
     
    if (application.roleId < 1){
        throw new Error("RoleID cannot be less than 1")
    }

    if (application.email == ""){
        throw new Error("Email does not exist")
    }

    if (application.s3Link == ""){
        throw new Error("S3 Link does not exist")
    }

}