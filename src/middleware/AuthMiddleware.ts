import express from "express";
import { jwtDecode } from "jwt-decode";
import { UserRole, JwtToken } from "../models/JwtToken";
import "core-js/stable/atob";

export const allowRoles = (allowRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(!req.session.token) {
            res.redirect('/login');
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token ?? '');
        if (!allowRoles.includes(decodedToken.Role)) {
            return res.status(403).send('User role not authorised for this action');
        }

        next();
    }
}