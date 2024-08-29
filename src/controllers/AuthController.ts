import express from "express";
import { getToken } from "../services/AuthService";

export const getLoginForm = (req: express.Request, res: express.Response) => {
    res.render('loginForm.njk', { token: req.session.token});
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.redirect('/');
    } catch (e) {
        res.locals.errormessage = (e as Error).message;
        res.render('loginForm.njk', req.body);
    }
}

export const getLogout = (req: express.Request, res: express.Response) => {
    if(req.session) {
        req.session.destroy(err => {
            if (err) {
                res.locals.errormessage = "Unable to log out";
                res.render('/login');
            } else {
                res.redirect('/');
            }
        });
    }
    
} 
