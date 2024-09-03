import express from "express";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";


export const requestNavbar = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(!req.session.token){
        res.locals.role = 0;
    }
    else {
        const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
        res.locals.role = decodedToken.Role;
    }
    next();
}