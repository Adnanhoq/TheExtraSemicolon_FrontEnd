import express from "express";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";


export const setRoleInLocals = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try {
        if (req.session.token) {
            const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
            res.locals.role = decodedToken.Role;
        } else {
            throw new Error('Not logged in');
        }

    } catch (e) {
        res.locals.role = 0;
    }

    next();
}