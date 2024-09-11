import express from "express";
import { getToken } from "../services/AuthService";
import { LoginRequest } from "../models/LoginRequest";
import { ProfileResponse } from "../models/ProfileResponse";
import { getProfilePicture } from "../services/ProfileService";

export const getLoginForm = (req: express.Request, res: express.Response) => {
    res.render('loginForm.njk', { token: req.session.token});
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body as LoginRequest);
        const profile: ProfileResponse = await getProfilePicture(req.session.token);
        if(profile.profilePicture) {
            req.session.profilePicture = profile.profilePicture;
        }
        
        res.redirect('/');
    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('loginForm.njk', req.body as LoginRequest);
    }
}

export const getLogout = (req: express.Request, res: express.Response) => {
    req.session.destroy(err => {
        if (err) {
            res.locals.errormessage = "Unable to log out";
            res.render('/login');
        } else {
            res.redirect('/');
        }
    });
    
    
} 
